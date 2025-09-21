---
title: 'Node.js 性能优化：事件循环与内存管理'
date: '2024-01-01'
excerpt: '深入探讨Node.js的事件循环机制和内存管理策略，学习如何优化Node.js应用的性能。'
category: 'nodejs'
tags: ['Node.js', '性能优化', '事件循环', '内存管理']
---

# Node.js 性能优化：事件循环与内存管理

## Node.js 事件循环详解

Node.js 基于事件驱动的非阻塞 I/O 模型，其核心是事件循环机制。

### 事件循环阶段

```typescript
// 事件循环的六个阶段
const phases = [
  'timers', // 执行 setTimeout 和 setInterval 回调
  'pending', // 执行 I/O 回调
  'idle,prepare', // 内部使用
  'poll', // 获取新的 I/O 事件
  'check', // 执行 setImmediate 回调
  'close', // 执行 close 事件回调
]
```

### 实际示例

```typescript
console.log('1. 同步代码')

setTimeout(() => {
  console.log('2. setTimeout')
}, 0)

setImmediate(() => {
  console.log('3. setImmediate')
})

process.nextTick(() => {
  console.log('4. nextTick')
})

console.log('5. 同步代码结束')

// 输出顺序：
// 1. 同步代码
// 5. 同步代码结束
// 4. nextTick
// 2. setTimeout
// 3. setImmediate
```

## 内存管理策略

### 1. 垃圾回收机制

Node.js 使用 V8 引擎的垃圾回收器：

```typescript
// 监控垃圾回收
const v8 = require('v8')

setInterval(() => {
  const heapStats = v8.getHeapStatistics()
  console.log('Heap Used:', heapStats.used_heap_size)
  console.log('Heap Total:', heapStats.total_heap_size)
}, 5000)
```

### 2. 内存泄漏检测

```typescript
// 使用 heapdump 检测内存泄漏
const heapdump = require('heapdump')

// 定期生成堆快照
setInterval(() => {
  heapdump.writeSnapshot((err, filename) => {
    if (err) console.error(err)
    else console.log('Heap dump written to', filename)
  })
}, 30000)
```

### 3. 流式处理大数据

```typescript
const fs = require('fs')
const { Transform } = require('stream')

// 使用流处理大文件
function processLargeFile(inputPath: string, outputPath: string) {
  const readStream = fs.createReadStream(inputPath)
  const writeStream = fs.createWriteStream(outputPath)

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      // 处理数据块
      const processed = processChunk(chunk)
      callback(null, processed)
    },
  })

  readStream
    .pipe(transformStream)
    .pipe(writeStream)
    .on('finish', () => {
      console.log('文件处理完成')
    })
}
```

## 性能优化技巧

### 1. 使用 Cluster 模块

```typescript
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  // 衍生工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`)
    cluster.fork() // 重启工作进程
  })
} else {
  // 工作进程
  require('./app')
  console.log(`工作进程 ${process.pid} 已启动`)
}
```

### 2. 连接池管理

```typescript
const mysql = require('mysql2/promise')

class DatabasePool {
  private pool: mysql.Pool

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'mydb',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      acquireTimeout: 60000,
      timeout: 60000,
    })
  }

  async query(sql: string, params?: any[]) {
    const connection = await this.pool.getConnection()
    try {
      const [rows] = await connection.execute(sql, params)
      return rows
    } finally {
      connection.release()
    }
  }
}
```

### 3. 缓存策略

```typescript
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 600 }) // 10分钟过期

class CacheService {
  static get(key: string) {
    return cache.get(key)
  }

  static set(key: string, value: any, ttl?: number) {
    return cache.set(key, value, ttl)
  }

  static del(key: string) {
    return cache.del(key)
  }
}

// 使用示例
async function getUserData(userId: string) {
  const cacheKey = `user:${userId}`
  let userData = CacheService.get(cacheKey)

  if (!userData) {
    userData = await fetchUserFromDatabase(userId)
    CacheService.set(cacheKey, userData, 300) // 5分钟缓存
  }

  return userData
}
```

## 监控和调试

### 1. 性能监控

```typescript
const perf_hooks = require('perf_hooks')

// 监控函数执行时间
function measurePerformance(fn: Function) {
  return async (...args: any[]) => {
    const start = perf_hooks.performance.now()
    const result = await fn(...args)
    const end = perf_hooks.performance.now()

    console.log(`函数执行时间: ${end - start} 毫秒`)
    return result
  }
}

// 使用示例
const optimizedFunction = measurePerformance(async (data: any) => {
  // 执行一些操作
  return processData(data)
})
```

### 2. 错误处理

```typescript
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err)
  // 优雅关闭
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason)
})

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号，开始优雅关闭...')
  server.close(() => {
    console.log('服务器已关闭')
    process.exit(0)
  })
})
```

## 最佳实践

### 1. 异步操作优化

```typescript
// 使用 Promise.all 并行处理
async function processMultipleRequests(urls: string[]) {
  const promises = urls.map((url) => fetch(url))
  const results = await Promise.all(promises)
  return results
}

// 使用 Promise.allSettled 处理部分失败
async function processWithFallback(urls: string[]) {
  const promises = urls.map((url) => fetch(url))
  const results = await Promise.allSettled(promises)

  return results.map((result) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      return null // 处理失败的情况
    }
  })
}
```

### 2. 资源管理

```typescript
class ResourceManager {
  private resources: Set<any> = new Set()

  add(resource: any) {
    this.resources.add(resource)
  }

  remove(resource: any) {
    this.resources.delete(resource)
  }

  cleanup() {
    this.resources.forEach((resource) => {
      if (resource.close) resource.close()
      if (resource.destroy) resource.destroy()
    })
    this.resources.clear()
  }
}
```

## 总结

Node.js 性能优化的关键在于：

1. **理解事件循环**：合理使用异步操作
2. **内存管理**：避免内存泄漏，合理使用缓存
3. **并发处理**：使用 Cluster 和 Worker Threads
4. **监控调试**：及时发现性能瓶颈
5. **资源管理**：正确管理数据库连接和文件句柄

通过掌握这些技巧，可以显著提升 Node.js 应用的性能和稳定性。
