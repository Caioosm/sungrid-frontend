import { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'

const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const DailyConsumptionPage = lazy(
  () => import('./pages/DailyConsumptionPage.jsx'),
)
const MonthlyConsumptionPage = lazy(
  () => import('./pages/MonthlyConsumptionPage.jsx'),
)
const AlertsPage = lazy(() => import('./pages/AlertsPage.jsx'))
const AssetTrackingPage = lazy(
  () => import('./pages/AssetTrackingPage.jsx'),
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <Suspense
                fallback={
                  <div className="dashboard-loading" role="status">
                    Carregando dados do dashboard...
                  </div>
                }
              >
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/consumo-diario"
            element={
              <Suspense
                fallback={
                  <div className="dashboard-loading" role="status">
                    Carregando consumo diário...
                  </div>
                }
              >
                <DailyConsumptionPage />
              </Suspense>
            }
          />
          <Route
            path="/consumo-mensal"
            element={
              <Suspense
                fallback={
                  <div className="dashboard-loading" role="status">
                    Carregando consumo mensal...
                  </div>
                }
              >
                <MonthlyConsumptionPage />
              </Suspense>
            }
          />
          <Route
            path="/alertas"
            element={
              <Suspense
                fallback={
                  <div className="dashboard-loading" role="status">
                    Carregando alertas...
                  </div>
                }
              >
                <AlertsPage />
              </Suspense>
            }
          />
          <Route
            path="/ativos"
            element={
              <Suspense
                fallback={
                  <div className="dashboard-loading" role="status">
                    Carregando acompanhamento do ativo...
                  </div>
                }
              >
                <AssetTrackingPage />
              </Suspense>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
