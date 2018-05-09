import React, {Component} from 'react';
import _ from 'lodash';

import Typography from 'material-ui/Typography';

import withFade from '../components/withFade';

import WidgetHead from './WidgetHead';
import { StyledPaper, Content, Tags, Tag } from '../styles/UserStructureWidget';

let socket;

function TagCloud(props) {
  const getTagClassName = (value) => {
    if (value >= 95) return 'tag-1';
    else if (value >= 90) return 'tag-2';
    else if (value >= 70) return 'tag-3';
    else if (value >= 50) return 'tag-4';
    return 'tag-5';
  };

  return (
    <Tags>
      {/* <Typography color='textSecondary' type='subheading' style={{ 'marginBottom': '8px' }}>Mehr als 95% der Nutzer sind kategorisiert als</Typography>
      {sorted_tags.filter(tag => tag.reduction >= 95).map(tag => (
        <Tag
          key={tag.group}
          title={`Zu ${tag.reduction}% getaggt`}
          onClick={() => props.clickHandler(tag.group)}
          className='tag-1'
        >
          {tag.group}
        </Tag>
      ))} */}
      <Typography color='textSecondary' type='subheading' style={{ 'marginBottom': '8px' }}>Nutzer wurden kategorisiert als</Typography>
      {props.tags.map((tag) => (
        <Tag
          key={tag.group}
          title={`Zu ${tag.reduction}% getaggt`}
          onClick={() => props.clickHandler(tag.group)}
          className={getTagClassName(tag.reduction)}
        >
          {tag.group}
        </Tag>
      ))}
    </Tags>
  );
}

class UserStructureWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchChange: false,
      selectedMenuItem: 0,
      data: [],
      isLoading: true,
    };
    socket = this.props.socket;
  }

  componentDidMount() {
    socket.emit('req_usergroup_structure');

    socket.on('usergroup_structure', (data) => {
      if (data !== null) {
        this.setState({ data });
      } else {
        this.setState({ data: [] });
      }
      this.setState({ isLoading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.search, this.props.search)) {
      this.setState({ searchChange: true });
    }
    if (this.state.searchChange && nextProps.show && !nextProps.loading) {
      console.log('req_tags');
      socket.emit('req_usergroup_structure');
      this.setState({ isLoading: true, searchChange: false });
    }
  }

  handleMenuChange(index) {
    this.setState({ selectedMenuItem: index });
  }

  handleTagClick = (tag) => {
    this.props.onTagClick([tag]);
  }

  render() {
    return (
      <StyledPaper>
        <WidgetHead title="Nutzerstruktur" loading={this.state.isLoading} />
        <Content>
          <TagCloud
            tags={this.state.data}
            clickHandler={this.handleTagClick}
          />
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(UserStructureWidget);
