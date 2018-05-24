import React, { Component } from 'react';
import _ from 'lodash';

import { blue } from 'material-ui/colors';

import moment from 'moment-timezone';

import { Bar } from 'react-chartjs-2';

import withFade from '../components/withFade';

import WidgetHead from './WidgetHead';
import { Content, StyledPaper } from '../styles/TweetCountWidget';
import { getBarChartOptions } from '../config/chartOptions';

let socket;

const chartOptions = getBarChartOptions();
chartOptions.scales.yAxes[0].scaleLabel.labelString = 'Anzahl der Tweets';

moment.tz.setDefault('Europe/Berlin');

class TweetCountWidget extends Component {
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
      case 0: socket.emit('req_days_count', this.props.search); break;
      case 1: socket.emit('req_hours_count', this.props.search); break;
      default: break;
    }

    socket.on('days_count_recent', (days) => {
      this.setDaysLabels();

      if (days !== null) {
        const data = Array(30).fill(0);
        for (let i = 0; i < 30; i += 1) {
          const day_arr_item = days.find((item) => item.group === moment().subtract(i, 'days').format('YYYY-MM-DDT00:00:00Z'));
          if (day_arr_item !== undefined) {
            data[30 - i - 1] = day_arr_item.reduction;
          } else {
            data[30 - i - 1] = 0;
          }
        }
        this.setState({ data });
      }
      this.setState({ isLoading: false });
    });

    socket.on('hours_count_recent', (hours) => {
      this.setHoursLabels();
      console.log(hours)
      console.log(moment().format('H'));
      if (hours !== null) {
        const data = Array(24).fill(0);
        for (let i = 0; i < 24; i += 1) {
          const hour_arr_item = hours.find((item) => item.group == moment().subtract(i, 'hours').format('H'));
          if (hour_arr_item !== undefined) {
            data[24 - i - 1] = hour_arr_item.reduction;
          } else {
            data[24 - i - 1] = 0;
          }
        }
        this.setState({ data });
      }
      this.setState({ isLoading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.search, this.props.search)) {
      this.setState({ searchChange: true });
    }
    if (this.state.searchChange && nextProps.show && !nextProps.loading) {
      console.log('req_days_count')
      switch (this.state.selectedMenuItem) {
        case 0: socket.emit('req_days_count', nextProps.search); break;
        case 1: socket.emit('req_hours_count', nextProps.search); break;
        default: break;
      }
      this.setState({ isLoading: true, searchChange: false });
    }
  }

  setDaysLabels = () => {
    const labels = Array(30).fill(0);
    for (let i = 0; i < 30; i += 1) {
      labels[30 - i - 1] = moment()
        .subtract(i, 'days')
        .format('DD.MM');
    }
    labels[29] = 'Heute';
    this.setState({ labels });
  }

  setHoursLabels = () => {
    const labels = Array(24).fill(0);
    for (let i = 0; i < 24; i += 1) {
      labels[24 - i - 1] = moment()
        .subtract(i, 'hours')
        .format('H')
    }
    this.setState({ labels });
  }

  handleMenuChange = (index) => {
    this.setState({
      selectedMenuItem: index,
      isLoading: true,
    }, () => {
      switch (this.state.selectedMenuItem) {
        case 0:
          console.log('req_days_count');
          socket.emit('req_days_count', this.props.search);
          this.setState({isLoading: true});
          break;
        case 1:
          console.log('req_hours_count');
          socket.emit('req_hours_count', this.props.search);
          this.setState({isLoading: true});
          break;
      }
    });
  }

  render() {
    switch (this.state.selectedMenuItem) {
      case 0: {
        chartOptions.scales.xAxes[0].scaleLabel.labelString = 'Tag';
        break;
      }
      case 1: {
        chartOptions.scales.xAxes[0].scaleLabel.labelString = 'Stunde';
      }
    }


    const chartdata = {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.data,
          backgroundColor: blue[500],
          hoverBackgroundColor: blue[500],
        },
      ],
    };

    return (
      <StyledPaper>
        <WidgetHead
          title="Tweetvolumen"
          options={['Letzte 30 Tage', 'Letzte 24 Stunden']}
          loading={this.state.isLoading}
          onMenuChange={this.handleMenuChange}
          selectedMenuItem={this.state.selectedMenuItem}
        />
        <Content>
          <Bar data={chartdata} options={chartOptions} />
        </Content>
      </StyledPaper>
    );
  }
}

export default withFade()(TweetCountWidget);
