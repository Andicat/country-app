// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChartConfig: any = {
  header: '',
  animationEnable: true,
  colors: [
    '#4572A7',
    '#AA4643',
    '#89A54E',
    '#80699B',
    '#3D96AE',
    '#DB843D',
    '#92A8CD',
    '#A47D7C',
    '#B5CA92',
    '#E3D35D',
  ],
  chart: {
    type: 'column',
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
  },
  title: {
    text: '',
  },
  subtitle: {
    text: '',
  },
  xAxis: {
    type: 'category',
    title: {
      text: '',
    },
    labels: {
      rotation: -45,
      style: {
        fontSize: '13px',
      },
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: '',
    },
  },
  legend: {
    enabled: true,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },
  tooltip: {
    pointFormat: '',
  },
  series: [
    {
      name: '',
      colorByPoint: true,
      data: [],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
          fontSize: '13px',
        },
      },
    },
  ],
};
