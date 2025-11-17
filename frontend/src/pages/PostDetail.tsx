import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, trackUserAction } from '../services/api'
import { Post } from '../types'
import './PostDetail.css'

/**
 * 帖子详情页组件
 */
function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentUserId] = useState(() => {
    let userId = localStorage.getItem('userId')
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('userId', userId)
    }
    return userId
  })

  useEffect(() => {
    if (id) {
      loadPost(parseInt(id))
    }
  }, [id])

  /**
   * 加载帖子详情
   */
  const loadPost = async (postId: number) => {
    try {
      setLoading(true)
      const data = await getPost(postId)
      // 确保数据格式正确，添加默认值
      if (data) {
        setPost({
          ...data,
          images: data.images || [],
          tags: data.tags || [],
          content: data.content || ''
        })
      } else {
        setPost(null)
      }
    } catch (error) {
      console.error('Failed to load post:', error)
      setPost(null)
    } finally {
      setLoading(false)
    }
  }

  /**
   * 处理点赞
   */
  const handleLike = async () => {
    if (post) {
      await trackUserAction('like', post.id, currentUserId)
      setPost({ ...post, likes: post.likes + 1 })
    }
  }

  /**
   * 处理收藏
   */
  const handleCollect = async () => {
    if (post) {
      await trackUserAction('collect', post.id, currentUserId)
      setPost({ ...post, collects: post.collects + 1 })
    }
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (!post) {
    return (
      <div className="post-detail">
        <header className="detail-header">
          <button onClick={() => navigate('/')} className="back-btn">← 返回</button>
          <h1>帖子详情</h1>
          <div></div>
        </header>
        <div className="error-container">
          <div className="error">帖子不存在或加载失败</div>
          <button onClick={() => navigate('/')} className="back-home-btn">返回首页</button>
        </div>
      </div>
    )
  }

  return (
    <div className="post-detail">
      <header className="detail-header">
        <button onClick={() => navigate('/')} className="back-btn">← 返回</button>
        <h1>帖子详情</h1>
        <div></div>
      </header>
      <div className="detail-container">
        <div className="detail-content">
          <div className="detail-images">
            {post.images && post.images.length > 0 ? (
              post.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${post.title} - ${index + 1}`}
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/600x800?text=${encodeURIComponent(post.title)}`
                  }}
                />
              ))
            ) : (
              <div className="no-image">暂无图片</div>
            )}
          </div>
          <div className="detail-info">
            <h2 className="detail-title">{post.title}</h2>
            <div className="detail-author">
              <div className="author-avatar-large">
                {post.authorAvatar ? (
                  <img src={post.authorAvatar} alt={post.author} />
                ) : (
                  <div className="avatar-placeholder-large">{post.author[0]}</div>
                )}
              </div>
              <div>
                <div className="author-name-large">{post.author}</div>
                <div className="post-date">{new Date(post.createdAt).toLocaleDateString('zh-CN')}</div>
              </div>
            </div>
            <div className="detail-text">
              {post.content ? (
                post.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>暂无内容</p>
              )}
            </div>
            <div className="detail-tags">
              {post.tags && post.tags.length > 0 ? (
                post.tags.map(tag => (
                  <span key={tag} className="tag-large">#{tag}</span>
                ))
              ) : (
                <span className="tag-large">#无标签</span>
              )}
            </div>
            <div className="detail-actions">
              <button className="action-btn like-btn" onClick={handleLike}>
                <span className="icon-large">❤️</span>
                <span>{post.likes}</span>
              </button>
              <button className="action-btn collect-btn" onClick={handleCollect}>
                <span className="icon-large">⭐</span>
                <span>{post.collects}</span>
              </button>
              <div className="action-item">
                <span className="icon-large">💬</span>
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail

