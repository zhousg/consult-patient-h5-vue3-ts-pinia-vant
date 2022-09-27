import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const rules: MockMethod[] = [
  {
    url: '/patient/message/list',
    method: 'get',
    timeout: 1000,
    response: () => {
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push(
          Mock.mock({
            id: '@id',
            avatar: '@image("100x100")',
            title: '@ctitle(3,10)',
            lastContent: '@ctitle(10,40)',
            sendTime: '@datetime()'
          })
        )
      }
      return {
        code: 10000,
        message: '获取数据成功',
        data
      }
    }
  }
]

export default rules
