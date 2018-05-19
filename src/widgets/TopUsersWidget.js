import React, { Component } from 'react';
import _ from 'lodash';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
//  TableFooter,
//  TablePagination,
} from 'material-ui/Table';
import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import withFade from '../components/withFade';

import WidgetHead from './WidgetHead';
import { StyledPaper, Content } from '../styles/TopUsersWidget';

import { simpleFormat } from '../utils/utils';

let socket;

function TopUsers(props) {
  return (
    <Table>
      <TableHead>
        <TableCell padding="dense">#</TableCell>
        <TableCell>Nutzer</TableCell>
        <TableCell>{props.mode === 0 ? '# Follower' : '# Tweets'}</TableCell>
      </TableHead>
      <TableBody>
        {props.data.map((user, i) => (
          <TableRow hover key={i}>
            <TableCell padding="dense">
              {i + 1}
            </TableCell>
            <TableCell padding="none">
              <ListItem>
                <Avatar
                  alt="user_avatar"
                  src={user.profile_image_url_https}
                />
                <ListItemText
                  primary={user.name}
                  secondary={`@${user.screen_name}`}
                />
              </ListItem>
            </TableCell>
            <TableCell>
              <ListItemText
                primary={props.mode === 0 ?
                  simpleFormat(user.followers_count) :
                  simpleFormat(user.tweets_count)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}


class TopUsersWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchChange: false,
      selectedMenuItem: 0,
      isLoading: true,
      data: [],
    };
    socket = this.props.socket;
  }

  componentDidMount() {
    switch(this.state.selectedMenuItem) {
      case 0: socket.emit('req_users_follower', this.props.search); break;
      case 1: socket.emit('req_users_tweet_count', this.props.search); break;
    }

    socket.on('users_follower', (data) => {
      if (data !== null) {
        this.setState({ data })
      }
      this.setState({ isLoading: false });
    });

    socket.on('users_tweet_count', (data) => {
      if (data !== null) {
        this.setState({ data })
      }
      this.setState({ isLoading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.search, this.props.search)) {
      this.setState({ searchChange: true });
    }
    if (this.state.searchChange && nextProps.show && !nextProps.loading) {
      switch(this.state.selectedMenuItem) {
        case 0: socket.emit('req_users_follower', nextProps.search); break;
        case 1: socket.emit('req_users_tweet_count', nextProps.search); break;
      }
      this.setState({ isLoading: true, searchChange: false });
    }
  }

  handleMenuChange = (index) => {
    this.setState({ selectedMenuItem: index, isLoading: true }, () => {
      switch(this.state.selectedMenuItem) {
        case 0: socket.emit('req_users_follower', this.props.search); break;
        case 1: socket.emit('req_users_tweet_count', this.props.search); break;
      }
    });
  }

  render() {
    return (
      <StyledPaper>
        <WidgetHead
          title="Top-Nutzer"
          options={['Nach Follower', 'Nach Anzahl der Tweets']}
          loading={this.state.isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={this.state.selectedMenuItem}
        />
        <Content>
          <TopUsers
            data={this.state.data} 
            mode={this.state.selectedMenuItem}
          />
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(TopUsersWidget);
