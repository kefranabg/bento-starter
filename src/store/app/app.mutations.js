export const SET_NETWORK_ONLINE = 'SET_NETWORK_ONLINE'
export const SET_NEW_CONTENT_AVAILABLE = 'SET_NEW_CONTENT_AVAILABLE'

export default {
  [SET_NEW_CONTENT_AVAILABLE]: (state, value) =>
    (state.newContentAvailable = value),
  [SET_NETWORK_ONLINE]: (state, value) => (state.networkOnLine = value)
}
