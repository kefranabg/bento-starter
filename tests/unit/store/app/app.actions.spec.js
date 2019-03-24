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
})
