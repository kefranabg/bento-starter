<template>
  <div class="hello">
    <h1 v-if="isUserLoggedIn">Hi {{ user.displayName }}.</h1>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
