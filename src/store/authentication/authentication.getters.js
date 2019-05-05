import isNil from 'lodash/isNil'

export default {
  isUserLoggedIn: state => !isNil(state.user)
}
