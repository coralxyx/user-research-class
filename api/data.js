import { readDataFile, getActionsFile, getActionsFileWrite } from './utils/data.js'
import fs from 'fs'

/**
 * 获取用户行为数据
 * GET /api/data
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
    // 优先读取 /tmp 目录中的数据（如果存在），否则读取项目文件
    let actions = []
    const tmpFile = getActionsFileWrite()
    const projectFile = getActionsFile()
    
    if (fs.existsSync(tmpFile)) {
      actions = readDataFile(tmpFile)
    } else {
      actions = readDataFile(projectFile)
    }

    // 按用户分组
    const userMap = new Map()

    actions.forEach(action => {
      if (!userMap.has(action.userId)) {
        userMap.set(action.userId, {
          userId: action.userId,
          actions: [],
          clickCount: 0,
          likeCount: 0,
          collectCount: 0,
          clickSequence: []
        })
      }

      const userData = userMap.get(action.userId)
      userData.actions.push(action)

      if (action.action === 'click') {
        userData.clickCount++
        userData.clickSequence.push(action.postId)
      } else if (action.action === 'like') {
        userData.likeCount++
      } else if (action.action === 'collect') {
        userData.collectCount++
      }
    })

    // 转换为数组并按用户ID排序
    const userDataArray = Array.from(userMap.values())
      .map(user => ({
        ...user,
        actions: user.actions.sort((a, b) => a.sequence - b.sequence)
      }))
      .sort((a, b) => a.userId.localeCompare(b.userId))

    res.status(200).json(userDataArray)
  } catch (error) {
    console.error('Error fetching user data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

