import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Icon from 'material-ui/Icon';
import Tabs, { Tab } from 'material-ui/Tabs';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


import SearchInput from './SearchInput';
import SearchOptions from './SearchOptions';
import { SearchBar, Wrapper, Content } from '../styles/SearchContainer';

function AdvancedFilter(props) {
  return (
    <Button
      onClick={props.onClick}
      size="small"
      style={{
        display: 'flex',
        margin: '10px 0 0 auto',
      }}
    >
      <Typography style={{ marginRight: '7px' }} variant="caption" color="textSecondary">Erweiterte Filter</Typography>
      {props.expanded ?
        <Icon color="disabled">expand_less</Icon> :
        <Icon color="disabled">expand_more</Icon>
      }
    </Button>
  );
}

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

  handleExpandClick = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
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
    const { tabItem, expanded } = this.state;
    const { usergroups, keywords, options } = this.props.search;
    return (
      <Wrapper className={usergroups.length > 0 || keywords.length > 0 ? 'active' : null}>
        <Content>
          <Tabs style={{ padding: '20px' }} indicatorColor="primary" value={tabItem} onChange={this.handleTabChange}>
            <Tab label="Nutzergruppen" />
            <Tab label="Schlagwörter" />
          </Tabs>
          <SearchBar elevation="1" className={usergroups.length > 0 || keywords.length > 0 ? 'active' : null}>
            {this.state.tabItem === 0 &&
              <SearchInput
                label={this.getSearchLabel()}
                value={usergroups}
                onInputChange={this.handleUsersInputChange}
              />
            }
            {this.state.tabItem === 1 &&
              <SearchInput
                label={this.getSearchLabel()}
                value={keywords}
                onInputChange={this.handleKeywordsInputChange}
              />
            }
          </SearchBar>
          <AdvancedFilter
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Erweiterte Filter"
            expanded={expanded}
          />
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <SearchOptions
              options={options}
              onOptionsChange={this.handleOptionsChange}
            />
          </Collapse>
        </Content>
      </Wrapper>
    );
  }
}
