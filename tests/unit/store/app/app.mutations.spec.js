import mutations from '@/store/app/app.mutations'

describe('app module mutation', () => {
  describe('setNetworkOnline', () => {
    it('should set network online state to the value given in parameter', () => {
      const state = {
        networkOnLine: false,
        newContentAvailable: false,
        showAddToHomeScreenModalForApple: false
      }
      mutations.setNetworkOnline(state, true)
      expect(state).toEqual({
        networkOnLine: true,
        newContentAvailable: false,
        showAddToHomeScreenModalForApple: false
      })
    })
  })

  describe('setNewContentAvailable', () => {
    it('should set new content available state to the value given in parameter', () => {
      const state = {
        networkOnLine: false,
        newContentAvailable: false,
        showAddToHomeScreenModalForApple: false
      }
      mutations.setNewContentAvailable(state, true)
      expect(state).toEqual({
        networkOnLine: false,
        newContentAvailable: true,
        showAddToHomeScreenModalForApple: false
      })
    })
  })

  describe('setShowAddToHomeScreenModalForApple', () => {
    it('should set show add to home screen modal for apple state to the value given in parameter', () => {
      const state = {
        networkOnLine: false,
        newContentAvailable: false,
        showAddToHomeScreenModalForApple: false
      }
      mutations.setShowAddToHomeScreenModalForApple(state, true)
      expect(state).toEqual({
        networkOnLine: false,
        newContentAvailable: false,
        showAddToHomeScreenModalForApple: true
      })
    })
  })
})
