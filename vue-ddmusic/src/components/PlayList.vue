<template>
  <div id="list-wrapper">
    <h2> PlayList: </h2>
    <ul class="container">
      <song v-for="item in list" :item="item"></song>
    </ul>
  </div>
</template>

<script>
import Song from './Song';
export default {
  components: {
    song: Song,
  },
  props: ['list'],
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style>
</style>
