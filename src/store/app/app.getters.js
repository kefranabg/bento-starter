import { isNil } from 'lodash'

export default {
  newContentAvailable: state => !isNil(state.SWRegistrationForNewContent)
}
