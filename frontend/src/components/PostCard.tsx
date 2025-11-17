import { Post } from '../types'
import './PostCard.css'

interface PostCardProps {
  post: Post
  onClick: () => void
  onLike: (e: React.MouseEvent) => void
}

/**
 * 帖子卡片组件
 * 显示帖子的预览信息
 */
function PostCard({ post, onClick, onLike }: PostCardProps) {
  const cover = post.images && post.images.length > 0 ? post.images[0] : ''

  return (
    <article className="post-card">
      <div
        className="post-card__image-wrapper"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onClick()
          }
        }}
      >
        {cover && (
          <img
            src={cover}
            alt={post.title}
            className="post-card__image"
            onError={(e) => {
              // 如果图片加载失败，使用占位符
              e.currentTarget.src = `https://via.placeholder.com/400x520/FFE6EF/333333?text=${encodeURIComponent(post.title)}`
            }}
          />
        )}
      </div>
      <div className="post-card__body" onClick={onClick} role="button" tabIndex={0}>
        <h3 className="post-card__title">{post.title}</h3>
        <div className="post-card__footer">
          <div className="post-card__author">
            <div className="post-card__avatar">
              {post.authorAvatar ? (
                <img src={post.authorAvatar} alt={post.author} />
              ) : (
                <span>{post.author[0]}</span>
              )}
            </div>
            <div>
              <p className="author-name">{post.author}</p>
              <p className="author-date">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <button className="like-chip" onClick={onLike}>
            <span>❤️</span>
            <span>{post.likes}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default PostCard

