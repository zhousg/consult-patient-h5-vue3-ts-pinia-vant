<script lang="ts" setup></script>
<template>
  <div class="doctor-card">
    <van-image
      round
      src="https://yanxuan-item.nosdn.127.net/3cb61b3fd4761555e56c4a5f19d1b4b1.png"
    />
    <p class="name">周医生</p>
    <p class="van-ellipsis">积水潭医院 神经内科</p>
    <p>副主任医师</p>
    <van-button round size="small" type="primary">+ 关注</van-button>
  </div>
</template>
<style scoped lang="scss">
.doctor-card {
  width: 135px;
  height: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  display: inline-block;
  box-sizing: border-box;
  > .van-image {
    width: 58px;
    height: 58px;
    vertical-align: top;
    border-radius: 50%;
    margin: 0 auto 8px;
  }
  > p {
    margin-bottom: 0;
    font-size: 11px;
    color: var(--cp-tip);
    &.name {
      font-size: 13px;
      color: var(--cp-text1);
      margin-bottom: 5px;
    }
  }
  > .van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
