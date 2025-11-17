import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import DataView from './pages/DataView'
import './App.css'

/**
 * 主应用组件
 * 配置路由和页面导航
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/data" element={<DataView />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

