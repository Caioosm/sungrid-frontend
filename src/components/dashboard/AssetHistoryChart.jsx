import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
)

function AssetHistoryChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Potência gerada',
        data: data.generatedPowerKw,
        borderColor: '#f5a000',
        backgroundColor: 'rgba(247, 160, 0, 0.08)',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#f5a000',
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        fill: true,
        tension: 0.12,
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
        callbacks: {
          label(context) {
            return ` Potência gerada: ${context.formattedValue} kW`
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
          font: {
            size: 11,
            weight: '500',
          },
          padding: 8,
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
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
          padding: 10,
          callback(value) {
            return `${value} kW`
          },
        },
      },
    },
  }

  return (
    <section className="asset-history-card" aria-labelledby="asset-history-title">
      <div className="asset-history-card__header">
        <div>
          <h2 id="asset-history-title">{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </div>
      <div className="asset-history-canvas">
        <Line
          aria-label="Gráfico de potência gerada pelo ativo nos últimos sete dias"
          data={chartData}
          options={options}
          role="img"
        />
      </div>
      <p className="sr-only">
        {data.labels
          .map(
            (label, index) =>
              `${label}: ${data.generatedPowerKw[index]} kW de potência gerada`,
          )
          .join('; ')}
      </p>
    </section>
  )
}

export default AssetHistoryChart
