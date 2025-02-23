import { ChartConfiguration } from 'chart.js';

export const COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#e81809',
  '#ab26bf',
  '#66c234',
];

export const CHART_OPTIONS: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      fullSize: true,
      maxHeight: 180,
    },
  },
  scales: {
    x: { display: false },
    y: { beginAtZero: true },
  },
};
