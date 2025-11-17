import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../services/api'
import { UserData } from '../types'
import './DataView.css'

/**
 * 数据查看页面组件
 * 显示用户行为数据统计
 */
function DataView() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  /**
   * 加载用户数据
   */
  const loadData = async () => {
    try {
      const data = await getUserData()
      setUserData(data)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 导出数据为JSON
   */
  const exportData = () => {
    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `user-data-${new Date().toISOString()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  /**
   * 导出数据为CSV
   */
  const exportCSV = () => {
    const headers = ['用户ID', '行为类型', '帖子ID', '时间戳', '顺序']
    const rows = userData.flatMap(user => 
      user.actions.map(action => [
        action.userId,
        action.action,
        action.postId,
        action.timestamp,
        action.sequence
      ])
    )
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const dataBlob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `user-data-${new Date().toISOString()}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  /**
   * 获取用户详细数据
   */
  const getUserDetails = (userId: string): UserData | undefined => {
    return userData.find(user => user.userId === userId)
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  const selectedUserData = selectedUser ? getUserDetails(selectedUser) : null

  return (
    <div className="data-view">
      <header className="data-header">
        <button onClick={() => navigate('/')} className="back-btn">← 返回首页</button>
        <h1>用户行为数据</h1>
        <div className="export-buttons">
          <button onClick={exportData} className="export-btn">导出JSON</button>
          <button onClick={exportCSV} className="export-btn">导出CSV</button>
        </div>
      </header>
      <div className="data-container">
        <div className="data-sidebar">
          <h2>用户列表 ({userData.length})</h2>
          <div className="user-list">
            {userData.map(user => (
              <div
                key={user.userId}
                className={`user-item ${selectedUser === user.userId ? 'active' : ''}`}
                onClick={() => setSelectedUser(user.userId)}
              >
                <div className="user-id">{user.userId}</div>
                <div className="user-stats">
                  <span>点击: {user.clickCount}</span>
                  <span>点赞: {user.likeCount}</span>
                  <span>收藏: {user.collectCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="data-content">
          {selectedUserData ? (
            <>
              <div className="user-summary">
                <h2>用户: {selectedUserData.userId}</h2>
                <div className="summary-stats">
                  <div className="stat-card">
                    <div className="stat-value">{selectedUserData.clickCount}</div>
                    <div className="stat-label">点击次数</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{selectedUserData.likeCount}</div>
                    <div className="stat-label">点赞次数</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{selectedUserData.collectCount}</div>
                    <div className="stat-label">收藏次数</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{selectedUserData.actions.length}</div>
                    <div className="stat-label">总操作数</div>
                  </div>
                </div>
              </div>
              <div className="action-sequence">
                <h3>点击顺序</h3>
                <div className="sequence-display">
                  {selectedUserData.clickSequence.length > 0 ? (
                    selectedUserData.clickSequence.map((postId, index) => (
                      <span key={index} className="sequence-item">
                        {index + 1}. 帖子#{postId}
                      </span>
                    ))
                  ) : (
                    <p className="no-data">暂无点击记录</p>
                  )}
                </div>
              </div>
              <div className="action-list">
                <h3>详细操作记录</h3>
                <table className="action-table">
                  <thead>
                    <tr>
                      <th>顺序</th>
                      <th>行为类型</th>
                      <th>帖子ID</th>
                      <th>时间戳</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUserData.actions.map(action => (
                      <tr key={action.id}>
                        <td>{action.sequence}</td>
                        <td>
                          <span className={`action-badge ${action.action}`}>
                            {action.action === 'click' ? '点击' : 
                             action.action === 'like' ? '点赞' : '收藏'}
                          </span>
                        </td>
                        <td>{action.postId}</td>
                        <td>{new Date(action.timestamp).toLocaleString('zh-CN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>请从左侧选择一个用户查看详细信息</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataView

