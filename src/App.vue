<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div class="main-wrapper">
      <router-view />
    </div>

    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
      class="apple-add-to-home-screen-modal"
      @close="setShowAddToHomeScreenModalForApple(false)"
      v-if="showAddToHomeScreenModalForApple"
    >
    </apple-add-to-home-screen-modal>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { NavBar, NewContentAvailableToastr, AppleAddToHomeScreenModal },
  computed: mapState('app', [
    'newContentAvailable',
    'showAddToHomeScreenModalForApple'
  ]),
  methods: mapMutations('app', ['setShowAddToHomeScreenModalForApple'])
}
</script>

<style lang="scss">
body {
  margin: 0;

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    .new-content-available-toastr {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .apple-add-to-home-screen-modal {
      position: absolute;
      bottom: 0;
      right: 0;
      top: 0;
      left: 0;
      height: fit-content;
      width: fit-content;
      margin: auto;
      z-index: 1000;
    }

    .main-wrapper {
      padding: 20px;

      .page-wrapper {
        width: 60%;
        margin: auto;

        @media screen and (max-width: 1000px) {
          width: 100%;
        }
      }
    }
  }
}
</style>
