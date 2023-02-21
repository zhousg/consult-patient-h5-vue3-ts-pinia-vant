<script setup lang="ts">
import { useFollow } from '@/composables'
import type { Knowledge } from '@/types/consult'

defineProps<{
  item: Knowledge
}>()

const { loading, follow } = useFollow('knowledge')
</script>

<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <van-image round class="avatar" :src="item.creatorAvatar"></van-image>
      <div class="info">
        <p class="name">{{ item.creatorName }}</p>
        <p class="dep van-ellipsis">
          {{ item.creatorHospatalName }}
          {{ item.creatorDep }}
          {{ item.creatorTitles }}
        </p>
      </div>
      <van-button
        class="btn"
        size="small"
        round
        :loading="loading"
        @click="follow(item)"
      >
        {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
      </van-button>
    </div>
    <div class="body">
      <h3 class="title van-ellipsis">
        {{ item.title }}
      </h3>
      <p class="tag">
        <span v-for="(tag, i) in item.topics" :key="i"># {{ tag }}</span>
      </p>
      <p class="intro van-multi-ellipsis--l2">
        {{ item.content.replace(/<[^>]+>/g, '') }}
      </p>
      <div class="imgs" :class="{ large: item.coverUrl.length === 1 }">
        <van-image
          fit="cover"
          v-for="(url, i) in item.coverUrl"
          :key="i"
          :src="url"
        />
      </div>
      <p class="logs">
        <span>{{ item.collectionNumber }} 收藏</span>
        <span>{{ item.commentNumber }} 评论</span>
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
