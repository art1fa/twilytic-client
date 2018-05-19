import React, { Component } from 'react';

import Switch from 'material-ui/Switch';

import { Options, Option, OptionsText } from '../styles/SearchOptions';

export default class SearchOptions extends Component {
  handleOptionsChange = (name) => (event, checked) => {
    this.props.onOptionsChange({ name, checked });
  };

  render() {
    return (
      <Options>
        <Option>
          <OptionsText>Retweets ausschließen</OptionsText>
          <Switch
            checked={this.props.options.exclude_retweets}
            onChange={this.handleOptionsChange('exclude_retweets')}
            aria-label="exclude_retweets"
            color="primary"
          />
        </Option>
        <Option>
          <OptionsText>Antworten ausschließen</OptionsText>
          <Switch
            checked={this.props.options.exclude_replys}
            onChange={this.handleOptionsChange('exclude_replys')}
            aria-label="exclude_replys"
            color="primary"
          />
        </Option>
      </Options>
    );
  }
}

