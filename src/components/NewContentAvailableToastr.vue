<template>
  <div class="wrapper">
    <template v-if="refreshingApp">
      Loading new content...
    </template>
    <template v-else>
      New content available. Please
      <span class="refresh-btn" @click="$emit('refresh')">REFRESH</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    refreshingApp: Boolean
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  display: inline-block;
  border-radius: 4px;

  .refresh-btn {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
