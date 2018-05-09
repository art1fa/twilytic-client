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

const barChartOptions = {
  legend: {
    display: false,
    //position: 'right',
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
      },
      scaleLabel: {
        display: true,
      },
    }],
    yAxes: [{
      ticks: {},
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
}

const pieChartOptions = {
  legend: {
    display: true,
    position: 'bottom',
  },
  responsive: true,
  maintainAspectRatio: false,
  //cutoutPercentage: 40,
}

export { getBarChartOptions, barChartOptions, pieChartOptions };
