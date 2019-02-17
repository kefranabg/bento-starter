<template>
  <div class="wrapper">
    <h1>Login</h1>
    <!-- Loader -->
    <div v-if="user === undefined">
      loading ...
    </div>

    <!-- Auth UI -->
    <div
      v-show="user !== undefined && !user"
      id="firebaseui-auth-container"
      @click="login"
    >
      login
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'

export default {
  computed: mapState('authentication', ['user']),
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/dashboard'
            : this.$route.query.redirectUrl
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    }
  }
}
</script>

<style lang="scss" scoped></style>
