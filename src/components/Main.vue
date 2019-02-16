<template>
  <div class="hello">
    <h1>Hi {{ user.displayName }}.</h1>
    <p>{{ msg }}</p>
    <div v-if="newContentAvailable">
      New content available. Please <a href="/">refresh</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  computed: {
    ...mapState('app', ['newContentAvailable']),
    ...mapState('authentication', ['user'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
