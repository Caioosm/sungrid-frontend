export const dashboardDemoSummary = {
  user: {
    name: 'Carlos Silva',
    role: 'Operador de Rede',
  },
  metrics: [
    {
      id: 'daily-consumption',
      label: 'Consumo Diário',
      value: '42.8 kWh',
      trend: '−4.2% em relação a ontem',
      trendDirection: 'positive',
      icon: 'sun',
      tone: 'green',
    },
    {
      id: 'monthly-consumption',
      label: 'Consumo Mensal',
      value: '1.284 kWh',
      trend: '+2.1% média do período',
      trendDirection: 'negative',
      icon: 'battery',
      tone: 'red',
    },
    {
      id: 'active-alerts',
      label: 'Alertas Ativos',
      value: '3',
      trend: '2 críticos necessitam atenção',
      trendDirection: 'warning',
      icon: 'alert',
      tone: 'yellow',
    },
    {
      id: 'estimated-savings',
      label: 'Economia Estimada',
      value: 'R$ 1.250',
      trend: 'Sustentabilidade em alta',
      trendDirection: 'positive',
      icon: 'currency',
      tone: 'green',
    },
  ],
  weeklyConsumption: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    actualKwh: [120, 140, 95, 160, 180, 220, 210],
    savingsTargetKwh: [100, 110, 105, 130, 145, 165, 170],
  },
  carbonFootprint: {
    reducedKg: 142,
    periodLabel: 'esta semana',
  },
}

export const dashboardDemoDailyConsumption = {
  date: '2026-10-31',
  hourly: {
    labels: ['00h', '04h', '08h', '12h', '14h', '16h', '20h', '23h'],
    generationKw: [5, 3, 12, 45, 42, 28, 8, 4],
    consumptionKw: [4, 5, 8, 11, 14, 15, 12, 7],
  },
  peakSolarTime: '12h30',
  metrics: [
    {
      id: 'peak-consumption',
      label: 'Pico Consumo',
      value: '45.2 kW',
      caption: 'Registrado às 12:45',
    },
    {
      id: 'daily-average',
      label: 'Média Diária',
      value: '18.4 kW',
      caption: 'Dentro da meta de economia',
      tone: 'positive',
    },
    {
      id: 'accumulated-total',
      label: 'Total Acumulado',
      value: '441.6 kWh',
      caption: 'Ciclo de 24h fechado',
    },
    {
      id: 'peak-hours',
      label: 'Horário de Pico',
      value: '12h - 14h',
      caption: 'Janela de maior irradiação',
      tone: 'accent',
    },
  ],
}

export const dashboardDemoMonthlyConsumption = {
  periodLabel: 'Agosto 2026',
  monthlyConsumption: {
    days: Array.from({ length: 30 }, (_, index) => String(index + 1)),
    dailyKwh: [
      37, 37, 34, 33, 43, 46, 44, 40, 38, 41, 45, 47, 49, 51, 44, 40, 41, 44,
      45, 42, 40, 39, 44, 46, 50, 51, 43, 41, 45, 44,
    ],
  },
  metrics: [
    {
      id: 'monthly-accumulated',
      label: 'Total Acumulado',
      value: '1.284 kWh',
      trend: '−8.2% em relação ao período anterior',
      trendDirection: 'positive',
      icon: 'sun',
      tone: 'green',
    },
    {
      id: 'monthly-daily-average',
      label: 'Média Diária',
      value: '42.8 kWh',
      trend: '+2.1% da média de consumo esperada',
      trendDirection: 'warning',
      icon: 'activity',
      tone: 'yellow',
    },
    {
      id: 'previous-period-comparison',
      label: 'Comparação Anterior',
      value: '−8.2%',
      trend: 'Redução significativa vs Julho',
      trendDirection: 'positive',
      icon: 'battery',
      tone: 'green',
    },
    {
      id: 'monthly-projection',
      label: 'Projeção do Mês',
      value: '1.350 kWh',
      trend: 'Estimado dentro do limite contratual',
      trendDirection: 'positive',
      icon: 'activity',
      tone: 'green',
    },
  ],
  comparison: {
    title: 'Agosto vs Julho (Consumo Comparativo)',
    current: {
      label: 'Agosto (Mês Atual)',
      value: '1.284 kWh',
      barPercentage: 76,
    },
    previous: {
      label: 'Julho (Mês Anterior)',
      value: '1.398 kWh',
      barPercentage: 84,
    },
    description:
      'Seu perfil de consumo este mês apresentou uma redução média de 8.2% devido à otimização no pico solar das 12h às 14h.',
  },
  estimatedSavings: {
    title: 'Economia Estimada por Autogeração',
    description:
      'Ao priorizar o funcionamento de máquinas industriais no período de pico solar, você alcançou maior independência da rede.',
    totalReduction: '−114 kWh',
    estimatedFinancial: 'R$ 412,80',
  },
}

export const dashboardDemoNotifications = [
  {
    id: 'demo-inverter-alert',
    severity: 'warning',
    title: 'Atenção ao inversor INV-02',
    message: 'A produção está abaixo do esperado para este período.',
    occurredAt: 'Há 5 min',
  },
]

export const dashboardDemoAssets = [
  { id: 'INV-01', name: 'Inversor INV-01', status: 'Operacional' },
  { id: 'INV-02', name: 'Inversor INV-02', status: 'Atenção' },
  { id: 'BAT-01', name: 'Bateria BAT-01', status: 'Operacional' },
  { id: 'SNS-01', name: 'Sensor SNS-01', status: 'Operacional' },
]
