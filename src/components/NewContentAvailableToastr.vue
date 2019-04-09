<template>
  <div class="wrapper">
    New content available. Please
    <span class="refresh-btn" @click="refresh">REFRESH</span>
  </div>
</template>

<script>
export default {
  methods: {
    refresh() {
      window.location.reload()
    }
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
