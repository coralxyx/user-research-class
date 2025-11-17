import { readDataFile, getPostsFile } from '../utils/data.js'

/**
 * 获取单个帖子
 * GET /api/posts/:id
 */
export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { id } = req.query
    const posts = readDataFile(getPostsFile())
    const post = posts.find(p => p.id === parseInt(id))

    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

