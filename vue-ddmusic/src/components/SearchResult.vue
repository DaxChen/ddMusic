<template>
  <div v-if="searchItems.length" id="search-result">
    <span class="close-search-result" @click="closeSearchResult">&times;</span>
    <ul class="container">
      <song
        v-for="item in searchItems"
        :item="item"
        :add-to-playlist-btn="true"
      ></song>
    </ul>
  </div>
</template>

<script>
import Song from './Song';
export default {
  components: {
    song: Song,
  },
  props: ['searchItems'],
  data() {
    return {
    };
  },
  methods: {
    closeSearchResult() {
      this.$dispatch('on-close-search-result');
    },
  },
};
</script>

<style>
#search-result {
  position: relative;
}

.close-search-result {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 10px;
  font-size: 40px;
  cursor: pointer;
}
</style>
