import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'

declare module 'vue' {
  interface GlobalComponents {
    // 添加组件类型
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
  }
}
