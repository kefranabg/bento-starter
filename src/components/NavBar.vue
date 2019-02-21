<template>
  <div class="navbar">
    <div class="navbar-item">
      <router-link to="/home">Home</router-link>
    </div>
    <div class="navbar-item">
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <div class="spacer"></div>
    <div v-if="!isUserLoggedIn" class="navbar-item">
      <router-link to="/login">Login</router-link>
    </div>
    <template v-if="isUserLoggedIn">
      <img class="user-picture" :src="user.photoURL" alt="Avatar" />
      <div class="navbar-item logout-item" @click="logout">
        Logout
      </div>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user'])
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.navbar {
  width: 100%;
  display: flex;
  align-items: center;
  height: $navbar-height;
  background: $navbar-color;

  .spacer {
    flex: 1;
  }

  .navbar-item {
    padding: 15px;
    cursor: pointer;
    color: $navbar-link-color;

    .router-link-active {
      color: $navbar-link-active-color;
    }

    a {
      text-decoration: none;
      color: $navbar-link-color;
      border-color: #2c3e50;
    }
  }

  .logout-item {
    color: white;
  }

  .user-picture {
    max-height: 40px;
    border-radius: 50%;
  }
}
</style>
