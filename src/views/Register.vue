<template>
  <div class="page-wrapper">
    <h1 class="register-page-title">Register page</h1>

    <!-- Offline instruction -->
    <div v-show="!networkOnLine" data-test="offline-instruction">
      Please check your connection, Register feature is not available offline.
    </div>

    <p v-if="registerError">{{ registerError }}</p>
    <!-- Auth UI -->
    <input
      v-model="email"
      type="email"
      class="register-input"
      required
      placeholder="Enter Your Email"
    />
    <input
      v-model="password"
      type="password"
      class="register-input"
      required
      placeholder="Password"
    />
    <input
      v-model="displayName"
      type="text"
      class="register-input"
      placeholder="Display Name"
    />
    <input
      v-model="photoURL"
      type="text"
      class="register-input"
      placeholder="Your Avatar Photo"
    />
    <div
      v-show="networkOnLine"
      data-test="register-btn"
      class="register-btn"
      @click="register"
    >
      Register
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'

export default {
  data: () => ({
    registerError: null,
    email: '',
    password: '',
    displayName: '',
    photoURL: ''
  }),
  head: {
    title: {
      inner: 'register'
    },
    meta: [
      {
        name: 'description',
        content: 'Sign in or sign up to bento-starter',
        id: 'desc'
      }
    ]
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine'])
  },
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
    ...mapMutations('authentication', ['setUser']),
    async register() {
      this.registerError = null
      this.setUser(undefined)
      // set the displayName and photoURL in scope.
      const displayName = this.displayName
      const photoURL = this.photoURL
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(function(newUser) {
          newUser.user.updateProfile({
            displayName: displayName,
            photoURL: photoURL
          })
        })
        .catch(function(error) {
          // Handle Errors here.
          this.registerError(error.message)
          // ...
        })
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

  .register-page-title {
    text-align: center;
  }

  .register-btn {
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
  .register-input {
    margin-top: 10px;
    padding-left: 5px;
    height: 30px;
    width: 225px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
  }
}
</style>
