import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';

import SearchInput from './SearchInput';
import SearchOptions from './SearchOptions';
import { SearchMain, StyledPaper, Content } from '../styles/SearchContainer';

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      tabItem: 0,
    };
  }

  getSearchLabel = () => {
    switch (this.state.tabItem) {
      case 0: return 'Durchsuche Twitter nach Gruppen von Nutzern';
      case 1: return 'Durchsuche Twitter nach Schlagwörtern';
      default: return 'SUCHE';
    }
  }

  getSearchMode = (tab) => {
    let mode;
    switch (tab) {
      case 0: mode = 'usergroups'; break;
      case 1: mode = 'keywords'; break;
      default: mode = 'undefined';
    }
    return mode;
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleUsersInputChange = (input) => {
    let { usergroups, keywords, options } = _.cloneDeep(this.props.search);
    usergroups = input;
    this.props.onSearchChange({ usergroups, keywords, options });
  }

  handleKeywordsInputChange = (input) => {
    let { usergroups, keywords, options } = _.cloneDeep(this.props.search);
    keywords = input;
    this.props.onSearchChange({ usergroups, keywords, options });
  }

  handleOptionsChange = ({ name, checked }) => {
    let { usergroups, keywords, options } = _.cloneDeep(this.props.search);
    options[name] = checked;
    this.props.onSearchChange({ usergroups, keywords, options });
  };

  handleTabChange = (event, value) => {
    this.setState({ tabItem: value });
  };

  render() {
    const { usergroups, keywords, options } = this.props.search;
    return (
      <StyledPaper elevation="1" className={usergroups.length > 0 || keywords.length > 0 ? 'active' : null}>
        <Content>
          <Tabs indicatorColor="primary" value={this.state.tabItem} onChange={this.handleTabChange}>
            <Tab label="Nutzergruppen" />
            <Tab label="Schlagwörter" />
          </Tabs>
          <SearchMain>
            {this.state.tabItem === 0 &&
              <SearchInput
                label={this.getSearchLabel()}
                value={this.props.search.usergroups}
                options={this.props.search.options}
                onInputChange={this.handleUsersInputChange}
                onOptionsChange={this.handleOptionsChange}
              />
            }
            {this.state.tabItem === 1 &&
              <SearchInput
                label={this.getSearchLabel()}
                value={this.props.search.keywords}
                options={this.props.search.options}
                onInputChange={this.handleKeywordsInputChange}
                onOptionsChange={this.handleOptionsChange}
              />
            }
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
              style={{ alignSelf: 'end', marginLeft: '-48px' }}
            >
              {this.state.expanded ?
                <Icon color="disabled">expand_less</Icon> :
                <Icon color="disabled">expand_more</Icon>
              }
            </IconButton>
          </SearchMain>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <SearchOptions
              options={this.props.search.options}
              onOptionsChange={this.handleOptionsChange}
            />
          </Collapse>
        </Content>
      </StyledPaper>
    );
  }
}