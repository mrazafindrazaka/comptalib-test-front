<template>
  <b-row>
    <b-col sm='12'>
      <b-input v-model='search' class='mt-2 mb-2' placeholder='Search a pokemon by name'/>
    </b-col>
    <b-col v-for='(pokemon, index) in filteredList' :key='index' sm='12' md='4' xl='3'>
      <PokemonCard :pokemon='pokemon'/>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data: () => {
    return {
      limit: 20,
      offset: 0,
      search: '',
      pokemons: []
    }
  },
  computed: {
    filteredList() {
      return this.pokemons.filter((pokemon) => {
        return this.search.toLowerCase().split('').every(v => pokemon.name.toLowerCase().includes(v));
      });
    }
  },
  mounted() {
    this.getPokemons()
  },
  methods: {
    getPokemons() {
      this.$axios.get('https://pokeapi.co/api/v2/pokemon?limit=' +
        this.limit.toString() + '&offset=' + this.offset.toString())
        .then((response) => {
          const calls = []
          for (const call of response.data.results) {
            calls.push(this.$axios.get(call.url))
          }
          Promise.all(calls).then((...response) => {
            for (const element of response[0]) {
              this.pokemons.push(element.data)
            }
          })
        })
    }
  }
}
</script>

<style scoped>
</style>
