---
title: 'TypeScript 高级类型：泛型约束与条件类型'
date: '2024-01-10'
excerpt: '深入学习TypeScript的泛型约束和条件类型，掌握类型系统的高级特性，提升代码的类型安全性。'
category: 'typescript'
tags: ['TypeScript', '泛型', '类型系统', '高级特性']
---

# TypeScript 高级类型：泛型约束与条件类型

## 泛型约束 (Generic Constraints)

泛型约束允许我们限制泛型参数必须满足某些条件。

### 基本语法

```typescript
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) // 现在我们知道 arg 有 length 属性
  return arg
}
```

### 实际应用示例

```typescript
// 确保泛型参数有 length 属性
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person = { name: 'Alice', age: 30 }
const name = getProperty(person, 'name') // string
const age = getProperty(person, 'age') // number
```

## 条件类型 (Conditional Types)

条件类型允许我们根据条件选择不同的类型。

### 基本语法

```typescript
T extends U ? X : Y
```

### 实用示例

```typescript
// 非空类型
type NonNullable<T> = T extends null | undefined ? never : T

// 数组元素类型
type ArrayElement<T> = T extends (infer U)[] ? U : never

// 函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never
```

## 映射类型 (Mapped Types)

映射类型允许我们基于现有类型创建新类型。

```typescript
// 将所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 将所有属性变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// 自定义映射类型
type Stringify<T> = {
  [K in keyof T]: string
}
```

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型，允许我们基于字符串模板创建类型。

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`
type MouseEvent = EventName<'click' | 'hover'> // "onClick" | "onHover"

// API 路径类型
type ApiPath<T extends string> = `/api/${T}`
type UserApi = ApiPath<'users' | 'posts'> // "/api/users" | "/api/posts"
```

## 实用工具类型组合

```typescript
// 深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// 深度可选
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// 提取函数参数类型
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
```

## 实际项目中的应用

### API 响应类型

```typescript
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

type User = {
  id: number
  name: string
  email: string
}

type UserResponse = ApiResponse<User>
```

### 表单验证

```typescript
type ValidationRule<T> = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: T) => boolean
}

type FormField<T> = {
  value: T
  error?: string
  rules?: ValidationRule<T>
}
```

## 总结

TypeScript 的高级类型系统提供了强大的工具来创建类型安全、可维护的代码。通过合理使用泛型约束、条件类型和映射类型，我们可以：

1. 提高代码的类型安全性
2. 减少运行时错误
3. 提供更好的开发体验
4. 创建可复用的类型工具

掌握这些高级特性是成为 TypeScript 专家的关键步骤。
