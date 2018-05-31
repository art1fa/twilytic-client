import React, { Component } from 'react';
import _ from 'lodash';
import Tweet from 'react-tweet';

import { Content, StyledPaper } from '../styles/TweetStreamWidget';

import withFade from '../components/withFade';
import LoadMore from '../components/LoadMore';


import WidgetHead from './WidgetHead';


let socket;

class TweetStreamWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuItem: 0,
      pageNumber: 1,
      tweets: [],
      isLoading: true,
    };
    socket = this.props.socket;
  }

  componentDidMount() {
    this.requestData();

    socket.on('stream_recent', (data) => {
      console.log('receiving recent')
      let tweets;
      if (this.state.pageNumber > 1) {
        tweets = [...this.state.tweets, ...data];
      } else {
        tweets = data;
      }
      this.setState({
        tweets,
        searchChange: false,
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
      this.setState({ pageNumber: 1, isLoading: true, searchChange: false }, () => {
        this.requestData();
      });
    }
  }

  requestData = () => {
    socket.emit('req_stream', {
      mode: this.state.selectedMenuItem,
      pageNumber: this.state.pageNumber,
    });
  }

  handleMenuChange = (index) => {
    this.setState({
      selectedMenuItem: index,
      pageNumber: 1,
      isLoading: true,
    }, () => {
      this.requestData();
    });
  }

  nextPage = () => {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber + 1,
    }), () => this.requestData());
  }

  render() {
    const { isLoading, selectedMenuItem } = this.state;
    return (
      <StyledPaper>
        <WidgetHead
          title="Tweetstream"
          options={['Neueste', 'Meist geliked', 'Meist geretweeted']}
          loading={isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={selectedMenuItem}
        />
        <Content>
          {this.state.tweets.map((tweet) => (
            <Tweet
              data={tweet}
              key={tweet.id}
              linkProps={{ target: '_blank' }}
            />)) }
          {!isLoading && <LoadMore onClick={this.nextPage} entities="Tweets" /> }
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(TweetStreamWidget);
