import { readDataFile, writeDataFile, getActionsFile, getActionsFileWrite } from './utils/data.js'

/**
 * 记录用户行为
 * POST /api/track
 */
export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { action, postId, userId, timestamp } = req.body

    if (!action || !postId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const actions = readDataFile(getActionsFile())
    const sequence = actions.length + 1

    const newAction = {
      id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      action,
      postId: parseInt(postId),
      timestamp: timestamp || new Date().toISOString(),
      sequence
    }

    actions.push(newAction)
    // 写入到 /tmp 目录（Vercel 唯一可写目录）
    writeDataFile(getActionsFileWrite(), actions)

    res.status(200).json({ success: true, action: newAction })
  } catch (error) {
    console.error('Error tracking action:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

