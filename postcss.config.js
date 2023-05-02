// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    'postcss-mobile-forever': {
      rootSelector: 'body', // 应用根元素，用于设置超过指定宽度的居中样式
      viewportWidth: 375, // 设备宽度375计算vw的值
      maxDisplayWidth: 550, // 通过 css 函数设置视口单位的最大宽度
      disableDesktop: true, // 关闭桌面端媒体查询转换
      disableLandscape: true // 关闭横屏媒体查询转换
    }
  }
}
