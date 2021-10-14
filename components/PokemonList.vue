<template>
  <b-row>
    <b-col sm='12' id='search'>
      <b-input v-model='search' class='mt-2 mb-2 custom-input' placeholder='Search a pokemon by name' />
    </b-col>
    <b-col v-for='(pokemon, index) in filteredList' :key='index' sm='12' md='4' xl='3'>
      <PokemonCard :pokemon='pokemon' />
    </b-col>
    <b-button href='#search' class='backtotop'>&uarr;</b-button>
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
        return this.search.toLowerCase().split('').every(v => pokemon.name.toLowerCase().includes(v))
      })
    }
  },
  beforeMount() {
    this.getPokemons()
  },
  mounted() {
    this.getPokemonsScroll()
  },
  methods: {
    getPokemonsScroll() {
      window.onscroll = () => {
        console.log(document.documentElement.scrollTop + window.innerHeight)
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 50
        if (bottomOfWindow) {
          this.offset += 20
          this.getPokemons()
        }
      }
    },
    getPokemons() {
      this.$axios.get('https://pokeapi.co/api/v2/pokemon?limit=' +
        this.limit + '&offset=' + this.offset)
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
.custom-input {
  height: 50px;
  text-align: center;
}

.backtotop {
  position: fixed;
  bottom: 100px;
  right: 100px;
  font-size: 3rem;
  background-color: black;
}
</style>
