<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>
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
.home-page-title {
  text-align: center;
}
</style>
