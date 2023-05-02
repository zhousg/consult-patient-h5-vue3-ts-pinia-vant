// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    'postcss-mobile-to-multi-displays': {
      // 设备宽度375计算vw的值
      viewportWidth: 375,
      // 打开移动端的 vw 转换
      enableMobile: true,
      // 桌面端或横屏时居中的根元素
      rootClass: 'root'
    }
  }
}
