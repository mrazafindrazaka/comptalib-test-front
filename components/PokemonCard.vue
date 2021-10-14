<template>
  <b-card
    :title='pokemon.name'
    :img-src='pokemon.sprites.front_default'
    :img-alt='pokemon.name'
    img-top
    class='mb-2 custom-card'
    @click="$router.push('/pokemon/' + pokemon.id)"
  >
  </b-card>
</template>

<script>
export default {
  props: { 'pokemon': Object }
}
</script>

<style scoped>
.custom-card {
  text-align: center;
  text-transform: capitalize;
  background-color: rgba(255,255,255,0.8);
}

.custom-card:hover {
  cursor: pointer;
  background-color: rgba(255,255,255,1);
}
</style>
