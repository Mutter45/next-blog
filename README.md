# 个人博客项目

一个基于 Next.js 15 构建的现代化个人博客，具有炫酷的动画效果、Markdown 博客系统、国际化支持。

## ✨ 功能特性

### 🎨 炫酷的动画效果

- 使用 Framer Motion 实现流畅的页面动画
- 背景粒子动画效果
- 悬停和点击交互动画
- 页面加载时的渐入动画

### 📝 Markdown 博客系统

- 支持 Markdown 格式的博客文章
- 自动解析 frontmatter 元数据
- 支持多种分类：LeetCode、TypeScript、React、Node.js
- 自动计算阅读时间
- 标签系统支持

### 🌍 国际化支持

- 支持简体中文和英语
- 语言切换组件
- 本地存储语言偏好
- 响应式语言切换界面

### 📱 响应式设计

- 完全响应式布局
- 移动端友好设计
- 平板端优化
- 触摸设备支持

## 🚀 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **Markdown**: remark + remark-html
- **图标**: Lucide React
- **字体**: Geist Sans & Geist Mono

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── blog/              # 博客相关页面
│   │   ├── [slug]/        # 博客详情页
│   │   └── BlogListClient.tsx
│   ├── commits/           # GitHub 提交记录页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   └── LanguageSwitcher.tsx
├── lib/                   # 工具函数和配置
│   ├── i18n/             # 国际化配置
│   ├── github.ts         # GitHub 类型定义
│   ├── github-api.ts     # GitHub API 函数
│   ├── posts.ts          # 博客文章处理
│   └── types.ts          # TypeScript 类型定义
content/
└── posts/                # Markdown 博客文章
```

## 🛠️ 安装和运行

### 1. 克隆项目

```bash
git clone <repository-url>
cd next-blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📝 添加博客文章

1. 在 `content/posts/` 目录下创建 `.md` 文件
2. 在文件开头添加 frontmatter：

```markdown
---
title: '文章标题'
date: '2024-01-15'
excerpt: '文章摘要'
category: 'leetcode' # leetcode, typescript, react, nodejs, general
tags: ['算法', '哈希表', '数组']
---

# 文章内容

这里是文章的正文内容...
```

## ⚙️ 配置

### GitHub 集成配置

在 `src/lib/github-api.ts` 中修改 GitHub 用户名：

```typescript
const GITHUB_USERNAME = 'your-username' // 替换为实际的GitHub用户名
```

### 国际化配置

在 `src/lib/i18n/messages.ts` 中添加或修改翻译内容。

## 🎨 自定义样式

项目使用 Tailwind CSS，可以在以下文件中自定义样式：

- `src/app/globals.css` - 全局样式和响应式规则
- 组件文件中的 `className` - 组件特定样式

## 📱 响应式断点

- **移动端**: < 768px
- **平板端**: 768px - 1024px
- **桌面端**: > 1024px

## 🔧 开发工具

- **ESLint**: 代码质量检查
- **TypeScript**: 类型安全
- **Tailwind CSS**: 样式框架
- **Framer Motion**: 动画库

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请通过以下方式联系：

- GitHub Issues
- Email: mutter45@foxmail.com

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
