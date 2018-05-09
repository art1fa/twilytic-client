import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { LinearProgress } from 'material-ui/Progress';

import { Wrapper, Content, Title, Options } from '../styles/WidgetHead';


export default class WidgetHead extends Component {
  state = {
    open: false,
  };

  handleChange = (event) => {
    this.props.onMenuChange(this.props.options.findIndex(
      (option) => option === event.target.value)
    );
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Wrapper>
        <Content>
          <Title>
            <Typography variant="title">
              {this.props.title}
            </Typography>
          </Title>
          {this.props.options
            ? (
              <Options>
                <Select
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={this.props.options[this.props.selectedMenuItem]}
                  onChange={this.handleChange}
                  name="option"
                >
                  {this.props.options.map((option, index) => (
                    <MenuItem value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Options>
            )
            : null}
        </Content>
        {this.props.loading
          ? (<LinearProgress style={{ height: '3px' }} />)
          : null}
        <Divider />
      </Wrapper>
    );
  }
}
