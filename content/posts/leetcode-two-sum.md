---
title: 'LeetCode 1. 两数之和 - 哈希表解法详解'
date: '2024-01-15'
excerpt: '深入分析LeetCode第一题两数之和的多种解法，重点介绍哈希表解法的时间复杂度优化思路。'
category: 'leetcode'
tags: ['算法', '哈希表', '数组', '双指针']
---

# LeetCode 1. 两数之和 - 哈希表解法详解

## 题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出和为目标值 `target` 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

## 示例

```javascript
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

## 解法一：暴力枚举

最直观的解法是使用双重循环遍历所有可能的组合：

```typescript
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
  return []
}
```

**时间复杂度：** O(n²)
**空间复杂度：** O(1)

## 解法二：哈希表（推荐）

使用哈希表可以将查找时间从 O(n) 降低到 O(1)：

```typescript
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>()

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]

    if (map.has(complement)) {
      return [map.get(complement)!, i]
    }

    map.set(nums[i], i)
  }

  return []
}
```

**时间复杂度：** O(n)
**空间复杂度：** O(n)

## 算法思路

1. 创建一个哈希表 `map` 来存储数组元素和其索引的映射关系
2. 遍历数组，对于每个元素 `nums[i]`：
   - 计算目标值与当前元素的差值 `complement = target - nums[i]`
   - 检查 `complement` 是否在哈希表中
   - 如果存在，返回对应的索引和当前索引
   - 如果不存在，将当前元素和索引存入哈希表

## 关键点分析

- **哈希表的优势**：将查找操作从 O(n) 优化到 O(1)
- **一次遍历**：不需要预先构建哈希表，边遍历边查找
- **避免重复**：通过先查找再存储的方式，避免了元素重复使用的问题

## 总结

哈希表解法是解决两数之和问题的最优解，体现了"空间换时间"的经典思想。在实际开发中，这种思路经常用于优化查找操作。

## 相关题目

- LeetCode 15. 三数之和
- LeetCode 18. 四数之和
- LeetCode 167. 两数之和 II - 输入有序数组
