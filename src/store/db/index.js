import state from './db.state'
import mutations from './db.mutations'
import actions from './db.actions'

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
