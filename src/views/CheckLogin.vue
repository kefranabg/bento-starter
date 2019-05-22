<template>
  <h1 class="loading-title">
    Loading...
  </h1>
</template>

<script>
import { mapState } from 'vuex'
import { isNil } from 'lodash'

export default {
  computed: mapState('authentication', ['user']),
  watch: {
    user: {
      handler(user) {
        if (user === undefined) return

        if (this.$route.query.redirectUrl === this.$route.path) {
          this.$router.push('/')
        }

        const redirectUrl = isNil(user)
          ? `/login?redirectUrl=${this.$route.query.redirectUrl}`
          : this.$route.query.redirectUrl

        this.$router.push(redirectUrl)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-title {
  text-align: center;
}
</style>
