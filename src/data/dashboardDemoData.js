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
