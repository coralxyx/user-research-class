import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 获取数据文件路径
 * 在 Vercel 环境中：
 * - 读取：优先使用项目中的文件
 * - 写入：使用 /tmp 目录（Vercel 唯一可写目录）
 */
const getDataPath = (filename, forWrite = false) => {
  if (forWrite) {
    // 写入操作使用 /tmp 目录
    return path.join('/tmp', filename)
  }
  
  // 读取操作：尝试多个可能的路径
  const possiblePaths = [
    path.join(__dirname, '../../backend/data', filename),
    path.join(process.cwd(), 'backend/data', filename),
    path.join('/tmp', filename) // 如果 /tmp 中有文件，也尝试读取
  ]
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath
    }
  }
  
  // 如果文件不存在，返回项目路径（用于初始化）
  return possiblePaths[0]
}

const POSTS_FILE_READ = getDataPath('posts.json', false)
const ACTIONS_FILE_READ = getDataPath('actions.json', false)
const POSTS_FILE_WRITE = getDataPath('posts.json', true)
const ACTIONS_FILE_WRITE = getDataPath('actions.json', true)

/**
 * 确保数据目录存在
 */
function ensureDataDir(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

/**
 * 读取数据文件
 * @param {string} filePath - 文件路径
 * @returns {Array} 数据数组
 */
export function readDataFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return []
    }
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return []
  }
}

/**
 * 写入数据文件
 * @param {string} filePath - 文件路径（应该使用写入路径）
 * @param {any} data - 要写入的数据
 * @returns {boolean} 是否成功
 */
export function writeDataFile(filePath, data) {
  try {
    ensureDataDir(filePath)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error)
    return false
  }
}

/**
 * 获取帖子数据文件路径（读取）
 */
export function getPostsFile() {
  return POSTS_FILE_READ
}

/**
 * 获取行为数据文件路径（读取）
 */
export function getActionsFile() {
  return ACTIONS_FILE_READ
}

/**
 * 获取帖子数据文件路径（写入）
 */
export function getPostsFileWrite() {
  return POSTS_FILE_WRITE
}

/**
 * 获取行为数据文件路径（写入）
 */
export function getActionsFileWrite() {
  return ACTIONS_FILE_WRITE
}

