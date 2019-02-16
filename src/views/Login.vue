<template>
  <div class="wrapper">
    <!-- Loader -->
    <div v-if="userInfos === undefined">
      loading ...
    </div>

    <!-- Auth UI -->
    <div
      v-show="userInfos !== undefined && !userInfos"
      id="firebaseui-auth-container"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import firebaseui from 'firebaseui'

export default {
  computed: mapState('authentication', ['userInfos']),
  mounted() {
    this.initFirebaseUI()
  },
  methods: {
    initFirebaseUI() {
      const uiInstance = firebaseui.auth.AuthUI.getInstance()
      const ui = uiInstance
        ? uiInstance
        : new firebaseui.auth.AuthUI(firebase.auth())

      ui.start('#firebaseui-auth-container', {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~firebaseui/dist/firebaseui.css';

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .logo-img {
    max-height: 250px;
  }

  #firebaseui-auth-container /deep/ {
    padding-top: 30px;
    height: 100%;
    width: 100%;
  }
}
</style>
