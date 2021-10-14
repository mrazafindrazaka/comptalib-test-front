<template>
  <b-container fluid='xl' class='custom-bg'>
    <b-row>
      <b-col sm='12' class='center'>
        <b-button variant='dark' @click='$router.back()'>Back to list</b-button>
      </b-col>
      <b-col class='center'>
        <b-card
          :title='pokemon.name'
          :img-src='img'
          :img-alt='pokemon.name'
          img-top
          class='mb-2 custom-card'
          @click="$router.push('/pokemon/' + pokemon.id)"
        >
          <b-badge v-for='(type, index) in pokemon.types' :key='index' variant="dark">
            {{ type.type.name }}
          </b-badge>
          <b-card-text>
            {{ description }}
          </b-card-text>
          <b-button variant="danger" @click="addToTeam">Add to my team</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      pokemon: [],
      description: [],
      img: '',
    }
  },
  mounted() {
    this.$axios.get('https://pokeapi.co/api/v2/pokemon/' + this.id).then((response) => {
      this.pokemon = response.data
      this.img = this.pokemon.sprites.front_default
      this.$axios.get(response.data.species.url).then((response) => {
        this.description = response.data.flavor_text_entries[0].flavor_text
      })
    })
  },
  methods: {
    addToTeam () {
      if (this.$store.state.team.list.length < 6)
        this.$store.commit('team/add', this.pokemon)
    }
  },
}
</script>

<style scoped>
.custom-bg {
  min-height: 100vh;
  background-image: url("https://www.wallpaperuse.com/wallp/81-813509_m.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.custom-card {
  text-align: center;
  background-color: rgba(255,255,255,1);
  width: 20rem;
}

.custom-card h4 {
  text-transform: capitalize;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
</style>
