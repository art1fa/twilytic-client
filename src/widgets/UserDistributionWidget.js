import React, { Component } from 'react';
import _ from 'lodash';

import { blue } from 'material-ui/colors';

import { Bar } from 'react-chartjs-2';

import withFade from '../components/withFade';

import WidgetHead from './WidgetHead';
import { StyledPaper, AverageCount, Content } from '../styles/UserDistributionWidget';
import { getBarChartOptions } from '../config/chartOptions';

import { simpleFormat } from '../utils/utils';

let socket;

const chartOptions = getBarChartOptions();
chartOptions.scales.yAxes[0].scaleLabel.labelString = 'Anzahl der Nutzer';

const followerDistribGroups = [100, 1000, 5000, 10000, 25000, 50000, 100000];
const tweetCountDistribGroups = [5, 10, 25, 50, 75, 100, 150, 200];


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

      chartOptions.scales.xAxes[0].scaleLabel.labelString = 'Anzahl der Follower';
      this.setState({
        data: follower.groups,
        dataAverage: follower.average,
        labels,
        isLoading: false,
      });
    });

    socket.on('users_tweet_count_distrib', (tweetCount) => {
      const labels = this.getLabels(tweetCountDistribGroups);

      chartOptions.scales.xAxes[0].scaleLabel.labelString = 'Anzahl der Tweets';
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
    const prettyGroups = groups.map((i) => simpleFormat(i));
    const labels = Array(prettyGroups.length + 1);
    for (let i = 0; i < prettyGroups.length; i += 1) {
      if (i === 0) labels[i] = `< ${prettyGroups[i]}`;
      if (i === prettyGroups.length - 1) {
        labels[i + 1] = `> ${prettyGroups[i]}`;
      } else {
        labels[i + 1] = `${prettyGroups[i]} - ${prettyGroups[i + 1]}`;
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
          title="Nutzereinflussverteilung"
          options={['Nach Follower', 'Nach Anzahl der Tweets']}
          loading={this.state.isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={this.state.selectedMenuItem}
        />
        <Content>
          {dataAverage && <AverageCount variant="display3" color="default">ø {simpleFormat(dataAverage)}</AverageCount>}
          <div>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(UserDistributionWidget);
