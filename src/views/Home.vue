<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>
    <img src="@/assets/img/bento-starter.svg" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head: {
    title: {
      inner: 'Home'
    },
    meta: [
      {
        name: 'description',
        content: 'The front page of bento-starter.'
      }
    ]
  },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;

  .home-page-title {
    text-align: center;
  }
}
</style>
