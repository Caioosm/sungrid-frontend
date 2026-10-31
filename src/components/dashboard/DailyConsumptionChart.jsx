import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  Legend,
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
  Legend,
)

const generationValueLabels = {
  id: 'dailyGenerationValueLabels',
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
    ctx.font = '600 12px Roboto, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    meta.data.forEach((point, index) => {
      ctx.fillText(`${values[index]} kW`, point.x, point.y - 9)
    })

    ctx.restore()
  },
}

function DailyConsumptionChart({ data }) {
  const chartData = {
    labels: data.hourly.labels,
    datasets: [
      {
        label: 'Geração Solar',
        data: data.hourly.generationKw,
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
        tension: 0.08,
      },
      {
        label: 'Consumo',
        data: data.hourly.consumptionKw,
        borderColor: '#18b783',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 2.5,
        pointHoverRadius: 5,
        pointBackgroundColor: '#18b783',
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        borderDash: [5, 4],
        fill: false,
        tension: 0.08,
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
        top: 28,
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
        titleFont: {
          size: 13,
          weight: '700',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label(context) {
            return ` ${context.dataset.label}: ${context.formattedValue} kW`
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
            size: 12,
            weight: '500',
          },
          padding: 8,
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: 50,
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
            size: 12,
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
    <section className="daily-chart-card" aria-labelledby="daily-chart-title">
      <div className="daily-chart-card__header">
        <div>
          <h2 id="daily-chart-title">
            Monitoramento por Hora (Geração vs Consumo)
          </h2>
          <p>
            Visualização do comportamento de carga com pico solar no horário de
            almoço
          </p>
        </div>
        <span className="solar-peak-badge">
          Pico Solar Detectado: {data.peakSolarTime}
        </span>
      </div>
      <div className="daily-chart-legend" aria-hidden="true">
        <span>
          <i className="daily-chart-legend__dot daily-chart-legend__dot--orange" />
          Geração Solar
        </span>
        <span>
          <i className="daily-chart-legend__dot daily-chart-legend__dot--green" />
          Consumo
        </span>
      </div>
      <div className="daily-chart-canvas">
        <Line
          aria-label="Gráfico horário da geração solar e do consumo diário"
          data={chartData}
          options={options}
          plugins={[generationValueLabels]}
          role="img"
        />
      </div>
      <p className="sr-only">
        {data.hourly.labels
          .map(
            (label, index) =>
              `${label}: geração ${data.hourly.generationKw[index]} kW, consumo ${data.hourly.consumptionKw[index]} kW`,
          )
          .join('; ')}
      </p>
    </section>
  )
}

export default DailyConsumptionChart
