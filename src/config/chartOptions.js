import { defaults } from 'react-chartjs-2';
import _ from 'lodash';

function setChartDefaults(theme) {
  _.merge(defaults, {
    global: {
      defaultFontColor: theme.palette.text.secondary,
      defaultFontFamily: theme.typography.fontFamily,
      maintainAspectRatio: false,
      title: {
        fontSize: 14,
        fontStyle: 'normal',
      },
    },
  });
}


function getBarChartOptions() {
  return ({
    legend: {
      display: false,
      //position: 'right',
    },
    scales: {
      xAxes: [{
        ticks: {
        },
        gridLines: {
          display: false,
        },
        scaleLabel: {
          display: true,
        },
      }],
      yAxes: [{
        ticks: {
        },
        gridLines: {
          display: false,
        },
        scaleLabel: {
          display: true,
        },
      }],
    },
  });
}

function getPieChartOptions() {
  return ({
    legend: {
      display: true,
      position: 'bottom',
    },
    //cutoutPercentage: 40,
  });
}

export { setChartDefaults, getBarChartOptions, getPieChartOptions };
