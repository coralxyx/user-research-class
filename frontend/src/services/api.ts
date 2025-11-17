import axios from 'axios'

/**
 * 获取API基础URL
 * 开发环境使用代理，生产环境使用环境变量或默认值
 */
const getBaseURL = () => {
  // 如果设置了环境变量，使用环境变量
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  // 开发环境使用代理
  if (import.meta.env.DEV) {
    return '/api'
  }
  // 生产环境默认使用相对路径（如果后端和前端在同一域名下）
  return '/api'
}

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000
})

/**
 * 记录用户行为数据
 * @param action - 行为类型（click, like, collect）
 * @param postId - 帖子ID
 * @param userId - 用户ID
 */
export const trackUserAction = async (action: 'click' | 'like' | 'collect', postId: number, userId: string) => {
  try {
    await api.post('/track', {
      action,
      postId,
      userId,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Failed to track user action:', error)
  }
}

/**
 * 获取所有帖子
 */
export const getPosts = async () => {
  const response = await api.get('/posts')
  return response.data
}

/**
 * 获取单个帖子详情
 */
export const getPost = async (id: number) => {
  const response = await api.get(`/posts/${id}`)
  return response.data
}

/**
 * 获取用户行为数据
 */
export const getUserData = async () => {
  const response = await api.get('/data')
  return response.data
}

