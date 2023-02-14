<script setup lang="ts"></script>

<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <van-image
        round
        class="avatar"
        src="https://yanxuan-item.nosdn.127.net/9ad83e8d9670b10a19b30596327cfd14.png"
      ></van-image>
      <div class="info">
        <p class="name">张医生</p>
        <p class="dep van-ellipsis">积水潭医院 骨科 主任医师</p>
      </div>
      <van-button class="btn" size="small" round>+ 关注</van-button>
    </div>
    <div class="body">
      <h3 class="title van-ellipsis">
        高血压是目前世界上最常见，发病率最高的慢性病之一
      </h3>
      <p class="tag">
        <span># 肥胖</span>
        <span># 养生</span>
      </p>
      <p class="intro van-multi-ellipsis--l2">
        据估计，全世界有 10
        亿人患有高血压，来自美国全国健康和营养调查的数据（NHANES）显示，高血压的患病率呈逐年上升趋势。
        但是，我国高血压的控制程度非常不乐观，不少朋友担心降压药对肾的影响，有些甚至因为担心伤肾，而不敢吃降压药。
        我们就介绍一下，高血压对肾脏的危害，还有降压药对肾脏影响。
        没有耐心看的朋友，可以直接记住这个结论：高血压比降压药伤肾。千万不要因为担心副作用不敢吃药，那是「丢西瓜捡芝麻」得不偿失的行为
      </p>
      <div class="imgs">
        <van-image
          src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png"
        />
        <van-image
          src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png"
        />
        <van-image
          src="https://yanxuan-item.nosdn.127.net/c1cdf62c5908659a9e4c8c2f9df218fd.png"
        />
      </div>
      <p class="logs">
        <span>10 收藏</span>
        <span>50 评论</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-card {
  padding: 20px 0 16px;
  .head {
    display: flex;
    align-items: center;
    .avatar {
      width: 38px;
      height: 38px;
      margin-right: 10px;
    }
    .info {
      width: 200px;
      padding-right: 10px;
      .name {
        color: var(--cp-text2);
      }
      .dep {
        color: var(--cp-tip);
        font-size: 12px;
      }
    }
    .btn {
      padding: 0 12px;
      border-color: var(--cp-primary);
      color: var(--cp-primary);
      height: 28px;
      width: 72px;
    }
  }
  .body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: normal;
    }
    .tag {
      margin-top: 6px;
      > span {
        color: var(--cp-primary);
        margin-right: 20px;
        font-size: 12px;
      }
    }
    .intro {
      margin-top: 7px;
      line-height: 2;
      color: var(--cp-text3);
    }
    .imgs {
      margin-top: 7px;
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 12px;
        border-radius: 12px;
        overflow: hidden;
        &:last-child {
          margin-right: 0;
        }
      }
      &.large {
        .van-image {
          width: 185px;
          height: 125px;
        }
      }
    }
    .logs {
      margin-top: 10px;
      > span {
        color: var(--cp-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
