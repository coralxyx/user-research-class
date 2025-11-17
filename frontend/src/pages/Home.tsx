import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPosts, trackUserAction } from '../services/api'
import { Post } from '../types'
import PostCard from '../components/PostCard'
import './Home.css'

/**
 * 首页组件
 * 显示帖子列表
 */
function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('推荐')
  const [currentUserId] = useState(() => {
    // 从localStorage获取或生成用户ID
    let userId = localStorage.getItem('userId')
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('userId', userId)
    }
    return userId
  })
  const navigate = useNavigate()

  useEffect(() => {
    loadPosts()
  }, [])

  /**
   * 加载帖子列表
   */
  const loadPosts = async () => {
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 处理频道切换
   */
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  /**
   * 根据搜索关键字过滤帖子
   */
  const filteredPosts = useMemo(() => posts, [posts])

  const TABS = ['推荐', '关注', 'AI资讯', '学习充电', '效率工具', '生活方式']

  /**
   * 处理帖子点击
   */
  const handlePostClick = async (postId: number) => {
    await trackUserAction('click', postId, currentUserId)
    navigate(`/post/${postId}`)
  }

  /**
   * 处理点赞
   */
  const handleLike = async (postId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    await trackUserAction('like', postId, currentUserId)
    // 更新本地状态
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div className="home">
      <div className="home__glow" />
      <div className="home__shell">
        <header className="header">
          <div className="header__actions">
            <button className="ghost-btn" onClick={() => navigate('/data')}>
              数据看板
            </button>
          </div>
        </header>

        <div className="toolbar">
          <div className="tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'tab--active' : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="posts-container">
          <div className="posts-grid">
            {filteredPosts.length === 0 && (
              <div className="empty-state">
                <p>暂未找到相关内容，换个关键词试试～</p>
              </div>
            )}
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post.id)}
                onLike={(e) => handleLike(post.id, e)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

