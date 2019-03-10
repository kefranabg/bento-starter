import store from '@/store'

const showPromptForIos =
  ['iPhone', 'iPad', 'iPod'].includes(navigator.platform) &&
  !window.navigator.standalone

if (showPromptForIos) {
  const now = Date.now()
  const addToHomeIosPromptLastDate = localStorage.getItem(
    'addToHomeIosPromptLastDate'
  )
  const limitDate = addToHomeIosPromptLastDate
    ? new Date(parseInt(addToHomeIosPromptLastDate))
    : new Date()
  limitDate.setMonth(addToHomeIosPromptLastDate.getMonth() + 1)
  if (now >= limitDate.getTime()) {
    store.commit('app/setShowAddToHomeScreenModalForApple', true)
  }
}
