import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import TrainListPage from './pages/TrainListPage'
import OrderFillPage from './pages/OrderFillPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 首页路由 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          
          {/* 登录和注册路由 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          
          {/* 车次列表页路由 */}
          <Route path="/trains" element={<TrainListPage />} />
          
          {/* 订单填写页路由 */}
          <Route path="/order" element={<OrderFillPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


