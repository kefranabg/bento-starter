import mutations from '@/store/app/app.mutations'

describe('app module mutation', () => {
  describe('setNetworkOnline', () => {
    it('should set network online state to the value given in parameter', () => {
      const state = {
        networkOnLine: false,
        SWRegistrationForNewContent: null,
        showAddToHomeScreenModalForApple: false,
        refreshingApp: false
      }

      mutations.setNetworkOnline(state, true)

      expect(state).toEqual({
        networkOnLine: true,
        SWRegistrationForNewContent: null,
        showAddToHomeScreenModalForApple: false,
        refreshingApp: false
      })
    })
  })

  describe('setSWRegistrationForNewContent', () => {
    it('should set new content available state to the value given in parameter', () => {
      const state = {
        networkOnLine: false,
        SWRegistrationForNewContent: null,
        showAddToHomeScreenModalForApple: false,
        refreshingApp: false
      }
      const newSW = { id: 'sw' }

      mutations.setSWRegistrationForNewContent(state, newSW)

      expect(state).toEqual({
        networkOnLine: false,
        SWRegistrationForNewContent: newSW,
        showAddToHomeScreenModalForApple: false,
        refreshingApp: false
      })
    })
  })

  describe('setShowAddToHomeScreenModalForApple', () => {
    it('should set show add to home screen modal for apple state to the value given in parameter', () => {
      const state = {
        networkOnLine: false,
        SWRegistrationForNewContent: null,
        showAddToHomeScreenModalForApple: false,
        refreshingApp: false
      }

      mutations.setShowAddToHomeScreenModalForApple(state, true)

      expect(state).toEqual({
        networkOnLine: false,
        SWRegistrationForNewContent: null,
        showAddToHomeScreenModalForApple: true,
        refreshingApp: false
      })
    })
  })

  describe('refreshingApp', () => {
    it('should set refreshingApp state to the value given in parameter', () => {
      const state = {
        networkOnLine: false,
        SWRegistrationForNewContent: null,
        showAddToHomeScreenModalForApple: false,
        refreshingApp: false
      }

      mutations.setRefreshingApp(state, true)

      expect(state).toEqual({
        networkOnLine: false,
        SWRegistrationForNewContent: null,
        showAddToHomeScreenModalForApple: false,
        refreshingApp: true
      })
    })
  })
})
