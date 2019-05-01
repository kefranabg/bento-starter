import isNil from 'lodash/isNil'

export default {
  newContentAvailable: state => !isNil(state.SWRegistrationForNewContent)
}
