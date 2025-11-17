import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

// 中间件
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

// 数据文件路径
const DATA_DIR = path.join(__dirname, 'data')
const POSTS_FILE = path.join(DATA_DIR, 'posts.json')
const ACTIONS_FILE = path.join(DATA_DIR, 'actions.json')

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// 初始化数据文件
if (!fs.existsSync(POSTS_FILE)) {
  const initialPosts = generateSamplePosts()
  fs.writeFileSync(POSTS_FILE, JSON.stringify(initialPosts, null, 2))
}

if (!fs.existsSync(ACTIONS_FILE)) {
  fs.writeFileSync(ACTIONS_FILE, JSON.stringify([], null, 2))
}

/**
 * 生成示例帖子数据
 */
function generateSamplePosts() {
  const titles = [
    '春日穿搭分享 | 温柔系穿搭指南',
    '超好用的护肤好物推荐',
    '周末探店 | 这家咖啡店太绝了',
    '旅行vlog | 三天两夜厦门之旅',
    '美食分享 | 自制草莓蛋糕教程',
    '健身打卡 | 30天减脂计划',
    '好物推荐 | 提升幸福感的小物件',
    '妆容教程 | 日常通勤妆',
    '读书笔记 | 最近在读的几本书',
    '生活记录 | 我的周末日常',
    '穿搭分享 | 秋冬必备单品',
    '美食探店 | 新开的日料店',
    '护肤心得 | 敏感肌护理指南',
    '旅行攻略 | 云南大理自由行',
    '好物分享 | 平价好用的化妆品'
  ]

  const contents = [
    '今天来分享一套超级温柔的春日穿搭！这套搭配非常适合日常通勤，既舒适又时尚。上衣选择了浅色系的针织衫，搭配高腰阔腿裤，显瘦又显高。配饰方面选择了简约的耳环和包包，整体风格非常统一。',
    '最近用了几款超级好用的护肤品，忍不住来分享给大家！首先是这款精华，质地清爽不油腻，吸收很快。面霜也很滋润，适合干性肌肤。用了两周后，皮肤状态明显改善了很多。',
    '周末和朋友去了一家新开的咖啡店，环境超级棒！装修风格很ins风，拍照特别好看。咖啡味道也不错，推荐他们家的拿铁。价格也很合理，人均50左右。',
    '刚刚从厦门回来，这次旅行真的太棒了！去了鼓浪屿、曾厝垵、沙坡尾等地方，每个地方都很有特色。厦门的海鲜也超级新鲜，推荐大家一定要去试试。',
    '今天做了草莓蛋糕，超级成功！分享一下制作过程：首先准备蛋糕胚，然后打发奶油，最后装饰上新鲜的草莓。整个过程大概需要2小时，但是做出来的蛋糕真的很好吃！',
    '坚持健身30天了，体重下降了5斤！主要是通过有氧运动和力量训练相结合的方式。每天运动1小时，饮食方面也控制得比较好。继续加油！',
    '分享几个提升幸福感的小物件：香薰蜡烛、好看的杯子、舒适的抱枕、好听的音乐。这些小东西虽然不起眼，但是能让生活变得更加美好。',
    '今天来教大家画一个日常通勤妆，步骤很简单：底妆-眉毛-眼影-眼线-睫毛-腮红-口红。整个妆容大概需要15分钟，非常适合上班族。',
    '最近在读几本很有意思的书，推荐给大家：《活着》、《百年孤独》、《追风筝的人》。每本书都有不同的感悟，读书真的能让人成长。',
    '周末的日常就是睡到自然醒，然后做一顿丰盛的早餐，看看书，听听音乐，或者出去走走。这样的生活节奏真的很舒服，让人感到放松。'
  ]

  const authors = ['小美', '时尚达人', '美食家', '旅行者', '生活家', '健身教练', '美妆博主', '读书人', '摄影师', '设计师']
  const tags = ['穿搭', '护肤', '探店', '旅行', '美食', '健身', '好物', '妆容', '读书', '生活']

  return titles.map((title, index) => ({
    id: index + 1,
    title,
    content: contents[index % contents.length],
    author: authors[index % authors.length],
    authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authors[index % authors.length]}`,
    images: [
      `https://picsum.photos/seed/${title}/600/800`,
      `https://picsum.photos/seed/${title}2/600/800`
    ],
    likes: Math.floor(Math.random() * 1000) + 100,
    collects: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 200) + 20,
    tags: [tags[index % tags.length], tags[(index + 1) % tags.length]],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }))
}

/**
 * 读取数据文件
 */
function readDataFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return []
  }
}

/**
 * 写入数据文件
 */
function writeDataFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error)
    return false
  }
}

// API路由

/**
 * 获取所有帖子
 */
app.get('/api/posts', (req, res) => {
  const posts = readDataFile(POSTS_FILE)
  res.json(posts)
})

/**
 * 获取单个帖子
 */
app.get('/api/posts/:id', (req, res) => {
  const posts = readDataFile(POSTS_FILE)
  const post = posts.find(p => p.id === parseInt(req.params.id))
  if (post) {
    res.json(post)
  } else {
    res.status(404).json({ error: 'Post not found' })
  }
})

/**
 * 记录用户行为
 */
app.post('/api/track', (req, res) => {
  const { action, postId, userId, timestamp } = req.body

  if (!action || !postId || !userId) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const actions = readDataFile(ACTIONS_FILE)
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
  writeDataFile(ACTIONS_FILE, actions)

  res.json({ success: true, action: newAction })
})

/**
 * 获取用户行为数据
 */
app.get('/api/data', (req, res) => {
  const actions = readDataFile(ACTIONS_FILE)

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

  res.json(userDataArray)
})

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})

