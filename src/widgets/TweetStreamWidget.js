import React, { Component } from 'react';
import _ from 'lodash';
import Tweet from 'react-tweet';
import { Content, StyledPaper } from '../styles/TweetStreamWidget';

import withFade from '../components/withFade';


import WidgetHead from './WidgetHead';


let socket;

class TweetStreamWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuItem: 0,
      tweets: [],
      isLoading: true,
    };
    socket = this.props.socket;
  }

  componentDidMount() {
    socket.emit('req_stream', this.state.selectedMenuItem);

    socket.on('stream_recent', (data) => {
      console.log('receiving recent')
      this.setState({
        searchChange: false,
        tweets: data,
        isLoading: false,
      });
    });

    socket.on('update', (data) => {
      console.log('receiving update')
      this.setState({
        tweets: [data, ...this.state.tweets],
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.search, this.props.search)) {
      this.setState({ searchChange: true });
    }
    if (this.state.searchChange && nextProps.show && !nextProps.loading) {
      console.log('req_stream')
      socket.emit('req_stream', this.state.selectedMenuItem);
      this.setState({ isLoading: true, searchChange: false });
    }
  }

  handleMenuChange = (index) => {
    this.setState({ selectedMenuItem: index, isLoading: true }, () => {
      socket.emit('req_stream', this.state.selectedMenuItem);
      console.log('req_stream from handlemenuchange')
    });
  }

  render() {
    return (
      <StyledPaper>
        <WidgetHead
          title="Tweets"
          options={['Neueste', 'Meist geliked', 'Meist geretweeted']}
          loading={this.state.isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={this.state.selectedMenuItem}
        />
        <Content>
          {this.state.tweets.map((tweet) => (
            <Tweet
              data={tweet}
              key={tweet.id}
              linkProps={{ target: '_blank' }}
            />)) }
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(TweetStreamWidget);
