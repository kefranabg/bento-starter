<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">Home page</h1>
  </div>
</template>

<script>
export default {
  head: {
    title: {
      inner: 'Home'
    },
    meta: [
      {
        name: 'description',
        content: 'The front page of vuejs-firebase-starter-kit.'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.home-page-title {
  text-align: center;
}
</style>
