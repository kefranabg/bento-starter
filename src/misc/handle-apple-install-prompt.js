import store from '@/store'

const showPromptForIos =
  ['iPhone', 'iPad', 'iPod'].includes(navigator.platform) &&
  !window.navigator.standalone

if (showPromptForIos) {
  store.commit('app/setShowAddToHomeScreenModalForApple', true)
}
