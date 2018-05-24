import React, { Component } from 'react';
import _ from 'lodash';

import { blue } from 'material-ui/colors';

import { Pie } from 'react-chartjs-2';

import withFade from '../components/withFade';

import WidgetHead from './WidgetHead';
import { Content, StyledPaper } from '../styles/TweetStructureWidget';
import { getPieChartOptions } from '../config/chartOptions';

let socket;

const chartOptions = getPieChartOptions();

class TweetStructureWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchChange: false,
      selectedMenuItem: 0,
      labels: [],
      data: [],
      isLoading: true,
    };
    socket = this.props.socket;
  }

  componentDidMount() {
    switch (this.state.selectedMenuItem) {
      case 0: socket.emit('req_tweet_structure_media'); break;
      case 1: socket.emit('req_tweet_structure_tweettype'); break;
      default: break;
    }

    socket.on('tweet_structure_tweettype', (data) => {
      chartOptions.title = { text: 'Anteil der Tweets, die Replys oder Retweets sind', display: true };

      this.setState({
        data: [data.tweet, data.retweet, data.reply],
        labels: ['Tweet', 'Retweet', 'Reply'],
        isLoading: false,
      });
    });

    socket.on('tweet_structure_media', (data) => {
      chartOptions.title = { text: 'Anteil der Tweets mit/ohne Medieninhalte', display: true };

      this.setState({
        data: [data.text, data.photo, data.video_or_gif],
        labels: ['Text', 'Bild', 'Video / GIF'],
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
        case 0: socket.emit('req_tweet_structure_media'); break;
        case 1: socket.emit('req_tweet_structure_tweettype'); break;
        default: break;
      }
      this.setState({ isLoading: true, searchChange: false });
    }
  }

  handleMenuChange = (index) => {
    this.setState({
      selectedMenuItem: index
    }, () => {
      switch (this.state.selectedMenuItem) {
        case 0:
          console.log('req_tweet_structure_media');
          socket.emit('req_tweet_structure_media');
          this.setState({isLoading: true});
          break;
        case 1:
          console.log('req_tweet_structure_tweettype');
          socket.emit('req_tweet_structure_tweettype');
          this.setState({isLoading: true});
          break;
      }
    });
  }

  render() {
    const chartData = {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.data,
          backgroundColor: [blue[500], blue[300], blue[200], blue[100]],
          hoverBackgroundColor: [blue[500], blue[300], blue[200], blue[100]],
        },
      ],
    };

    return (
      <StyledPaper>
        <WidgetHead
          title="Tweetstruktur"
          options={['Medieninhalte', 'Tweettyp']}
          loading={this.state.isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={this.state.selectedMenuItem}
        />
        <Content>
          <Pie data={chartData} options={chartOptions} />
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(TweetStructureWidget);
