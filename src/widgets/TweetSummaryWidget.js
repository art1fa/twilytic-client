import React, { Component } from 'react';
import Typography from 'material-ui/Typography';


import WidgetHead from './WidgetHead';
import { StyledPaper, Content, Row } from '../styles/TweetSummaryWidget';

let socket;


export default class TweetSummaryWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuItem: 0,
      isLoading: false,
      data: [],
    };
    socket = this.props.socket;
  }

  componentDidMount() {
    // socket.emit('req_users_follower', this.props.search)
    // this.setState({ isLoading: true });

    socket.on('tweet_interaction', (data) => {
      if (data !== null) {
        this.setState({ data })
      }
      this.setState({ isLoading: false });
    });

    socket.on('sdfsdf', (data) => {
      if (data !== null) {
        this.setState({ data })
      }
      this.setState({ isLoading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded) {
      switch(this.state.selectedMenuItem) {
        case 0: socket.emit('req_tweet_interaction', nextProps.search); break;
        case 1: socket.emit('sdfsdf', nextProps.search); break;
      }
      this.setState({ isLoading: true });
    }
  }

  handleMenuChange = (index) => {
    this.setState({ selectedMenuItem: index }, () => {
      switch(this.state.selectedMenuItem) {
        case 0: socket.emit('req_tweet_interaction', this.props.search); break;
        case 1: socket.emit('sdfsd', this.props.search); break;
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <StyledPaper>
        <WidgetHead
          title="Tweet Überblick"
          //options={['Nach Follower', 'Nach Anzahl der Tweets']}
          loading={this.state.isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={this.state.selectedMenuItem}
        />
        <Content>
          <Row>
            <Typography color="textSecondary" variant="display1">Anzahl Tweets</Typography>
            <Typography variant="display3" color="primary">{data.total_tweet_count}</Typography>
          </Row>
          <Row>
            <Typography color="textSecondary" variant="display1">&#8960; Likes</Typography>
            <Typography variant="display3" color="primary">{data.favorite_count}</Typography>
          </Row>
          <Row>
            <Typography color="textSecondary" variant="display1">&#8960; Retweets</Typography>
            <Typography variant="display3" color="primary">{data.retweet_count}</Typography>
          </Row>
        </Content>
      </StyledPaper>
    );
  }
}
