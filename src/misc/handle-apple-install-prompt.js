import store from '@/store'
import { isNil } from 'lodash'

const isIosOnBrowser =
  ['iPhone', 'iPad', 'iPod'].includes(navigator.platform) &&
  !window.navigator.standalone

if (isIosOnBrowser) {
  const now = Date.now()
  let limitDate = null
  const addToHomeIosPromptLastDate = localStorage.getItem(
    'addToHomeIosPromptLastDate'
  )

  if (!isNil(addToHomeIosPromptLastDate)) {
    limitDate = new Date(parseInt(addToHomeIosPromptLastDate))
    limitDate.setMonth(limitDate.getMonth() + 1)
  }

  if (isNil(limitDate) || now >= limitDate.getTime()) {
    store.commit('app/setShowAddToHomeScreenModalForApple', true)
  }
}
