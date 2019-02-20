<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/account">Account</router-link> |
      <router-link to="/login">Login</router-link> |
    </div>
    <router-view />
    <div v-if="newContentAvailable">
      New content available. Please <button @click="refresh">refresh</button>
    </div>
    <logout v-if="isUserLoggedIn"></logout>
  </div>
</template>
<script>
import Logout from '@/components/Logout'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { Logout },
  computed: {
    ...mapState('app', ['newContentAvailable']),
    ...mapState('authentication', ['user']),
    ...mapGetters('authentication', ['isUserLoggedIn'])
  },
  methods: {
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: black;
  }
}
</style>
