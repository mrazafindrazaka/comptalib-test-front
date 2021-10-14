export const state = () => ({
  list: []
})

export const mutations = {
  add(state, pokemon) {
    state.list.push(pokemon)
  },
}
