<template>
  <div @click="logout">Logout</div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  methods: {
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
</script>
