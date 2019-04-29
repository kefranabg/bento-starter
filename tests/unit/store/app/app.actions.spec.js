import actions from '@/store/app/app.actions'

const commit = jest.fn()

afterEach(() => {
  commit.mockReset()
})

describe('app module action', () => {
  describe('closeAddToHomeScreenModalForApple', () => {
    it('should set the state of the modal as closed', () => {
      actions.closeAddToHomeScreenModalForApple({ commit })
      expect(commit).toHaveBeenCalledWith(
        'setShowAddToHomeScreenModalForApple',
        false
      )
    })
  })

  describe('serviceWorkerSkipWaiting', () => {
    it('should set app refreshing status and call sw postMessage with skipWaiting', () => {
      const state = {
        SWRegistrationForNewContent: {
          waiting: {
            postMessage: jest.fn()
          }
        }
      }

      actions.serviceWorkerSkipWaiting({ commit, state })

      expect(commit).toHaveBeenCalledWith('setRefreshingApp', true)
      expect(
        state.SWRegistrationForNewContent.waiting.postMessage
      ).toHaveBeenCalledWith('skipWaiting')
    })

    it('should not set app refreshing status and call sw postMessage with skipWaiting', () => {
      const state = {
        SWRegistrationForNewContent: null
      }

      actions.serviceWorkerSkipWaiting({ commit, state })

      expect(commit).not.toHaveBeenCalled()
    })
  })
})
