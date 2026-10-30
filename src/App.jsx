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
import DashboardPlaceholderPage from './pages/DashboardPlaceholderPage.jsx'

const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))

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
            element={<DashboardPlaceholderPage />}
          />
          <Route
            path="/consumo-mensal"
            element={<DashboardPlaceholderPage />}
          />
          <Route path="/alertas" element={<DashboardPlaceholderPage />} />
          <Route path="/ativos" element={<DashboardPlaceholderPage />} />
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
