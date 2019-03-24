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
    it('should save the close modal date into the localstorage', () => {
      const now = Date.now()
      Date.now = jest.genMockFunction().mockReturnValue(now)
      actions.closeAddToHomeScreenModalForApple({ commit })
      expect(localStorage.getItem('addToHomeIosPromptLastDate')).toEqual(
        now.toString()
      )
    })
  })
})
