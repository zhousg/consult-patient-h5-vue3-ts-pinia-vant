import { IllnessTime } from '@/enums'
import { test, expect } from 'vitest'
import { getConsultFlagText, getIllnessTimeText } from '../filter'

// 测试 getIllnessTimeText 函数
test('测试 getIllnessTimeText 函数', () => {
  // 进行测试，函数：输入是否可以达到预期的输出
  const text = getIllnessTimeText(IllnessTime.Month)
  expect(text).toBe('一月内')
  const text2 = getIllnessTimeText(IllnessTime.Week)
  expect(text2).toBe('一周内')
})

// 测试 getConsultFlagText 函数
test('测试 getConsultFlagText 函数', () => {
  const text = getConsultFlagText(0)
  expect(text).toBe('没就诊过')
})
