import React, { Component } from 'react';
import _ from 'lodash';

import { blue } from 'material-ui/colors';

import { Bar } from 'react-chartjs-2';

import withFade from '../components/withFade';

import WidgetHead from './WidgetHead';
import { StyledPaper, AverageCount, Content } from '../styles/UserDistributionWidget';
import { barChartOptions as options } from '../config/chartOptions';

let socket;

const followerDistribGroups = [100, 1000, 5000, 10000, 50000, 100000, 500000];
const tweetCountDistribGroups = [5, 10, 25, 50, 75, 100, 150, 200];

options.scales.yAxes[0].scaleLabel.labelString = 'Anzahl der Nutzer';

class UserDistributionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchChange: false,
      selectedMenuItem: 0,
      isLoading: true,
      data: [],
      dataAverage: null,
      labels: [],
    };
    socket = this.props.socket;
  }

  componentDidMount() {
    switch(this.state.selectedMenuItem) {
      case 0: socket.emit('req_users_follower_distrib', followerDistribGroups); break;
      case 1: socket.emit('req_users_tweet_count_distrib', tweetCountDistribGroups); break;
    }

    socket.on('users_follower_distrib', (follower) => {
      const labels = this.getLabels(followerDistribGroups);

      options.scales.xAxes[0].scaleLabel.labelString = 'Anzahl der Follower';
      this.setState({
        data: follower.groups,
        dataAverage: follower.average,
        labels,
        isLoading: false,
      });
    });

    socket.on('users_tweet_count_distrib', (tweetCount) => {
      const labels = this.getLabels(tweetCountDistribGroups);

      options.scales.xAxes[0].scaleLabel.labelString = 'Anzahl der Tweets';
      this.setState({
        data: tweetCount.groups,
        dataAverage: tweetCount.average,
        labels,
        isLoading: false,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.search, this.props.search)) {
      this.setState({ searchChange: true });
    }
    if (this.state.searchChange && nextProps.show && !nextProps.loading) {
      switch(this.state.selectedMenuItem) {
        case 0: socket.emit('req_users_follower_distrib', followerDistribGroups); break;
        case 1: socket.emit('req_users_tweet_count_distrib', tweetCountDistribGroups); break;
      }
      this.setState({ isLoading: true, searchChange: false });
    }
  }

  getLabels = (groups) => {
    const labels = Array(groups.length + 1);
    for (let i = 0; i < groups.length; i += 1) {
      if (i === 0) labels[i] = `< ${groups[i]}`;
      if (i === groups.length - 1) {
        labels[i + 1] = `> ${groups[i]}`;
      } else {
        labels[i + 1] = `${groups[i]} - ${groups[i + 1]}`;
      }
    }
    return labels;
  }

  handleMenuChange = (index) => {
    this.setState({ selectedMenuItem: index, isLoading: true }, () => {
      switch(this.state.selectedMenuItem) {
        case 0: socket.emit('req_users_follower_distrib', followerDistribGroups); break;
        case 1: socket.emit('req_users_tweet_count_distrib', tweetCountDistribGroups); break;
      }
    });
  }

  render() {
    const { data, dataAverage, labels } = this.state;
    const chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: blue[500],
          hoverBackgroundColor: blue[500],
        },
      ],
    };

    return (
      <StyledPaper>
        <WidgetHead
          title="Nutzer Verteilung"
          options={['Nach Follower', 'Nach Anzahl der Tweets']}
          loading={this.state.isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={this.state.selectedMenuItem}
        />
        <Content>
          {dataAverage && <AverageCount variant="display3" color="default">ø {dataAverage}</AverageCount>}
          <div>
            <Bar data={chartData} options={options} />
          </div>
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(UserDistributionWidget);
