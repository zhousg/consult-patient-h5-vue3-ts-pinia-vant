import { test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import CpRadioBtn from '../CpRadioBtn.vue'

test('CpRadioBtn', async () => {
  // 1.  单独挂着组件
  const wrapper = render(CpRadioBtn, {
    props: {
      options: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 }
      ],
      modelValue: 1
    }
  })

  // 2. 测试组件渲染
  wrapper.getByText('选项一')
  wrapper.getByText('选项二')

  // 3. 测试props
  expect(wrapper.queryByText('选项一')?.classList.contains('active')).toBe(true)

  // 4. 自定义事件（update:modelValue）
  wrapper.queryByText('选项二')?.click()
  expect(wrapper.emitted()['update:modelValue'][0]).toEqual([2])
  // 更新props
  await wrapper.rerender({
    modelValue: 2
  })
  expect(wrapper.queryByText('选项二')?.classList.contains('active')).toBe(true)
})
