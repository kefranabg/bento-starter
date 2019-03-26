<template>
  <div class="page-wrapper">
    <h1 class="login-page-title">Login page</h1>
    <!-- Loader -->
    <div v-if="user === undefined">loading ...</div>

    <!-- Auth UI -->
    <div class="login-btn" v-show="user !== undefined && !user" @click="login">
      Login with google
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'

export default {
  head: {
    title: {
      inner: 'Login'
    },
    meta: [
      {
        name: 'description',
        content: 'Sign in or sign up to bento-starter.'
      }
    ]
  },
  computed: mapState('authentication', ['user']),
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/products'
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

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .login-page-title {
    text-align: center;
  }

  .login-btn {
    margin-top: 20px;
    cursor: pointer;
    padding: 5px 20px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #2c3e50;

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
