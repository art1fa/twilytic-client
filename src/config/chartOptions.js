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
    responsive: true,
    maintainAspectRatio: false,
  });
}

function getPieChartOptions() {
  return ({
    legend: {
      display: true,
      position: 'bottom',
    },
    responsive: true,
    maintainAspectRatio: false,
    //cutoutPercentage: 40,
  });
}

export { getBarChartOptions, getPieChartOptions };
