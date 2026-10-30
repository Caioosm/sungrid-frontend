import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  Tooltip,
  LinearScale,
  CategoryScale,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

const valueLabelsPlugin = {
  id: 'consumptionValueLabels',
  afterDatasetsDraw(chart) {
    const datasetIndex = chart.data.datasets.findIndex(
      (dataset) => dataset.showValueLabels,
    )
    if (datasetIndex < 0) return

    const { ctx } = chart
    const meta = chart.getDatasetMeta(datasetIndex)
    const values = chart.data.datasets[datasetIndex].data

    ctx.save()
    ctx.fillStyle = '#253044'
    ctx.font = '600 10px Roboto, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    meta.data.forEach((point, index) => {
      const value = Number(values[index])
      const formattedValue = new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 1,
      }).format(value)
      ctx.fillText(`${formattedValue} kWh`, point.x, point.y - 9)
    })

    ctx.restore()
  },
}

function WeeklyConsumptionChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Consumo Real',
        data: data.actualKwh,
        showValueLabels: true,
        borderColor: '#f5a000',
        backgroundColor: 'rgba(247, 160, 0, 0.075)',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#f5a000',
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        fill: true,
        tension: 0.12,
      },
      {
        label: 'Meta de Economia',
        data: data.savingsTargetKwh,
        borderColor: '#18b783',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: false,
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
    layout: {
      padding: {
        top: 24,
        right: 6,
        left: 0,
      },
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
            return ` ${context.dataset.label}: ${context.formattedValue} kWh`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#8391a7',
          font: {
            size: 10,
          },
          padding: 8,
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 250,
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
            size: 10,
          },
          padding: 10,
          callback(value) {
            return `${value} kWh`
          },
        },
      },
    },
  }

  return (
    <section className="chart-card" aria-labelledby="weekly-chart-title">
      <div className="chart-card__header">
        <div>
          <h2 id="weekly-chart-title">Desempenho Semanal de Consumo (7 dias)</h2>
          <p>Dados agregados em tempo real de todas as placas integradas</p>
        </div>
        <div className="chart-legend" aria-hidden="true">
          <span>
            <i className="chart-legend__dot chart-legend__dot--orange" />
            Consumo Real
          </span>
          <span>
            <i className="chart-legend__dot chart-legend__dot--green" />
            Meta de Economia
          </span>
        </div>
      </div>
      <div className="chart-canvas">
        <Line
          aria-label="Gráfico do consumo real e da meta de economia nos últimos sete dias"
          data={chartData}
          options={options}
          plugins={[valueLabelsPlugin]}
          role="img"
        />
      </div>
      <p className="sr-only">
        {data.labels
          .map((label, index) => `${label}: ${data.actualKwh[index]} kWh`)
          .join('; ')}
      </p>
    </section>
  )
}

export default WeeklyConsumptionChart
