<template>
  <div class="contributor-item">
    <img class="contributor-avatar" :src="data.avatar_url" />
    <span class="contributor-login">{{ data.login }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.contributor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  .contributor-avatar {
    margin-bottom: 20px;
    width: 100px;
    width: 100px;
    border-radius: 50%;
  }
}
</style>
