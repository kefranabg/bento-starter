import mutations from '@/store/app/app.mutations'

describe('app module mutation', () => {
  describe('setNetworkOnline', () => {
    it('should set network online state to the value given in parameter', () => {
      const state = { networkOnLine: false, newContentAvailable: false }
      mutations.setNetworkOnline(state, true)
      expect(state).toEqual({ networkOnLine: true, newContentAvailable: false })
    })
  })
  describe('setNewContentAvailable', () => {
    it('should set new content available state to the value given in parameter', () => {
      const state = { networkOnLine: false, newContentAvailable: false }
      mutations.setNewContentAvailable(state, true)
      expect(state).toEqual({ networkOnLine: false, newContentAvailable: true })
    })
  })
})
