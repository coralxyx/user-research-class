/**
 * 帖子数据类型
 */
export interface Post {
  id: number
  title: string
  content: string
  author: string
  authorAvatar: string
  images: string[]
  likes: number
  collects: number
  comments: number
  tags: string[]
  createdAt: string
}

/**
 * 用户行为数据类型
 */
export interface UserAction {
  id: string
  userId: string
  action: 'click' | 'like' | 'collect'
  postId: number
  timestamp: string
  sequence: number
}

/**
 * 用户数据统计类型
 */
export interface UserData {
  userId: string
  actions: UserAction[]
  clickCount: number
  likeCount: number
  collectCount: number
  clickSequence: number[]
}

