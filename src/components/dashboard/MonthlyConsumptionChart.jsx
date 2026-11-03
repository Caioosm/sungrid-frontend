import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

function MonthlyConsumptionChart({ data }) {
  const chartData = {
    labels: data.monthlyConsumption.days,
    datasets: [
      {
        label: 'Consumo Real',
        data: data.monthlyConsumption.dailyKwh,
        backgroundColor: '#f5a000',
        hoverBackgroundColor: '#e58d00',
        borderRadius: 3,
        borderSkipped: false,
        maxBarThickness: 12,
        categoryPercentage: 0.82,
        barPercentage: 0.78,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#17233c',
        padding: 11,
        displayColors: true,
        usePointStyle: true,
        titleFont: {
          size: 13,
          weight: '700',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label(context) {
            return ` Consumo Real: ${context.formattedValue} kWh`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#8391a7',
          autoSkip: true,
          maxTicksLimit: 20,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 10,
            weight: '500',
          },
          padding: 5,
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
          dash: [3, 5],
        },
        grid: {
          color: '#e8edf4',
          drawTicks: false,
        },
        ticks: {
          color: '#8391a7',
          font: {
            size: 11,
          },
          padding: 9,
          callback(value) {
            return `${value} kWh`
          },
        },
      },
    },
  }

  const accessibleValues = data.monthlyConsumption.days
    .map(
      (day, index) =>
        `Dia ${day}: ${data.monthlyConsumption.dailyKwh[index]} kWh`,
    )
    .join('; ')

  return (
    <section
      className="monthly-chart-card"
      aria-labelledby="monthly-chart-title"
    >
      <div className="monthly-chart-card__header">
        <div>
          <h2 id="monthly-chart-title">
            Distribuição Diária de Consumo - {data.periodLabel}
          </h2>
          <p>Análise granular dos dados do ciclo atual em tempo real</p>
        </div>
        <span className="monthly-chart-legend">
          <i className="monthly-chart-legend__dot" />
          Consumo Real
        </span>
      </div>
      <div className="monthly-chart-canvas">
        <Bar
          aria-label={`Gráfico do consumo diário durante ${data.periodLabel}`}
          data={chartData}
          options={options}
          role="img"
        />
      </div>
      <p className="sr-only">{accessibleValues}</p>
    </section>
  )
}

export default MonthlyConsumptionChart
