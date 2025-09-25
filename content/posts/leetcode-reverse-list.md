---
title: 'LeetCode 206. 反转链表'
date: '2025-09-25'
excerpt: '系统整理 LeetCode 206 反转链表的迭代与递归两种写法，配思路与复杂度分析。'
category: 'leetcode'
tags: ['算法', '递归', '链表', '迭代']
---

# LeetCode 206. 反转链表 - 迭代与递归详解

## 题目描述

给定单链表的头结点 `head`，请将其反转，并返回反转后的头结点。

## 示例

```text
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

## 解法一：迭代（推荐）

思路：使用三个指针 `prev`、`curr`、`next` 原地改写指针方向，逐步把 `curr.next` 指向 `prev`。

```typescript
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return head
  let prev: ListNode | null = null
  let curr: ListNode | null = head
  while (curr) {
    const next: ListNode | null = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}
```

**时间复杂度：** O(n)
**空间复杂度：** O(1)

## 解法二：递归

思路：设函数语义为“反转以 `cur` 为头的链表并返回新头结点”。每层将 `cur.next` 指向上一层的 `prev`，再递归处理剩余链表。

```typescript
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function reverseList(cur: ListNode | null, prev: ListNode | null = null): ListNode | null {
  if (!cur) return prev
  const next = cur.next
  cur.next = prev
  return reverseList(next, cur)
}
```

**时间复杂度：** O(n)
**空间复杂度：** O(n)（递归调用栈）

## 算法思路

1. 迭代：一次遍历，原地重连指针，尾部收束后 `prev` 为新头结点。
2. 递归：以“当前结点指向前驱 + 递归剩余”为基本步，直到 `cur` 为空返回 `prev`。

## 关键点分析

- **原地修改指针**：先保存 `next` 再改写 `curr.next`，避免丢失后续链表。
- **边界情况**：空链表或单结点无需处理，直接返回原头结点或自身。
- **工程实践**：迭代占用常数空间，更稳健；递归更易读但受栈深度限制。

## 总结

反转链表是指针操作的入门题。迭代法简单高效、空间 O(1)，是首选；递归法代码紧凑、语义清晰，可作为补充掌握。

## 相关题目

- LeetCode 92. 反转链表 II（区间反转）
- LeetCode 24. 两两交换链表中的结点
- LeetCode 234. 回文链表
