export default {
  /**
   * Fetch products of current loggedin user
   */
  fetchContributors: async ({ commit }) => {
    const response = await fetch(
      'https://api.github.com/repos/kefranabg/bento-starter/contributors'
    )
    const contributors = await response.json()
    commit('setList', contributors)
  }
}
