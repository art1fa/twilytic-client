import React, { Component } from 'react';
import _ from 'lodash';

import { blue } from 'material-ui/colors';

import { Bar } from 'react-chartjs-2';

import withFade from '../components/withFade';

import WidgetHead from './WidgetHead';
import { StyledPaper, Content } from '../styles/TweetInteractionDistributionWidget';
import { barChartOptions as options } from '../config/chartOptions';

let socket;

options.scales.yAxes[0].scaleLabel.labelString = 'Anzahl der Tweets';

const likeDistribGroups = [5, 20, 50, 100, 200, 500, 1000];
const retweetDistribGroups = [5, 20, 50, 100, 200, 500, 1000];

class TweetInteractionDistributionWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchChange: false,
      selectedMenuItem: 0,
      isLoading: true,
      data: [],
      dataAverage: [],
      labels: [],
    };
    socket = this.props.socket;
  }

  componentDidMount() {
    switch (this.state.selectedMenuItem) {
      case 0: socket.emit('req_tweets_like_distrib', likeDistribGroups); break;
      case 1: socket.emit('req_tweets_retweet_distrib', retweetDistribGroups); break;
    }

    socket.on('tweets_like_distrib', (favorites) => {
      console.log(favorites)
      const labels = this.getLabels(likeDistribGroups);

      options.scales.xAxes[0].scaleLabel.labelString = 'Anzahl der Likes';

      this.setState({
        data: favorites.groups,
        dataAverage: favorites.average,
        labels,
        isLoading: false,
      });
    });

    socket.on('tweets_retweet_distrib', (retweets) => {
      const labels = this.getLabels(retweetDistribGroups);

      options.scales.xAxes[0].scaleLabel.labelString = 'Anzahl der Retweets';
      
      this.setState({
        data: retweets.groups,
        dataAverage: retweets.average,
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
      switch (this.state.selectedMenuItem) {
        case 0: socket.emit('req_tweets_like_distrib', likeDistribGroups); break;
        case 1: socket.emit('req_tweets_retweet_distrib', retweetDistribGroups); break;
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
    this.setState({ selectedMenuItem: index }, () => {
      switch(this.state.selectedMenuItem) {
        case 0: socket.emit('req_tweets_like_distrib', likeDistribGroups); break;
        case 1: socket.emit('req_tweets_retweet_distrib', retweetDistribGroups); break;
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
          label: 'bars',
          backgroundColor: blue[500],
          hoverBackgroundColor: blue[500],
        },
      ],
    };

    return (
      <StyledPaper>
        <WidgetHead
          title="Tweet Interaktionsverteilung"
          options={['Likes', 'Retweets']}
          loading={this.state.isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={this.state.selectedMenuItem}
        />
        <Content>
          <Bar data={chartData} options={options} />
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(TweetInteractionDistributionWidget);
