<template>
  <div class='bottom'>
    <h4 @click='show = !show'>
      <span v-if='show === false'>Show</span>
      <span v-if='show === true'>Hide</span>
      my team</h4>
    <b-row v-if='pokemons.length > 0 && show'>
      <b-col v-for='(pokemon, index) in pokemons' :key='index' md='2' class='pokemon' @click='removePokemon(index)'>
        <img :src='pokemon.sprites.front_default' :alt='pokemon.name'/><br/>
        <span>{{ pokemon.name }}</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemons: [],
      show: false,
    }
  },
  mounted() {
    this.pokemons = this.$store.state.team.list
  },
  methods: {
    removePokemon(index) {
      this.$store.commit('team/remove', index)
    }
  }
}
</script>

<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: black;
  width: 100%;
  color: white;
  text-align: center;
  padding: 10px;
}
h4 {
  color: white;
  text-align: center;
  cursor: pointer;
}

img {
  width: 100px;
  aspect-ratio: 1;
}
.pokemon:hover {
  cursor: pointer;
  background-color: red;
}
</style>
