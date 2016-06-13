<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">ddMusic</a>
        <div class="search-wrapper">
          <form @submit.prevent="onSearchSubmit">
            <div class="input-field">
              <input v-model="search" type="search" required>
              <label for="search"><i class="material-icons">search</i></label>
            </div>
          </form>
        </div>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="#">Home</a></li>
        </ul>
      </div>
    </nav>
  </div>

  <search-result :search-items="searchItems"></search-result>

  <div v-show="list.list.length">
    <h1>Youtube Player:</h1>
    <div id="yt-player"></div>
    <div>
      <button @click="play" class="waves-effect waves-light btn">Play!!!!</button>
    </div>
  </div>
  <pre>{{ insertYT | json }}</pre>
  <pre>{{ list | json }}</pre>

  <play-list :list="list.list"></play-list>
</template>

<script>
/* global $ */

import list from '../list';
import PlayList from './PlayList';
import SearchResult from './SearchResult';
function onPlayerReady(event) {
  event.target.setPlaybackQuality('small');
  event.target.playVideo();
  event.target.pauseVideo();
  event.target.seekTo(0, true);
}

window.list = list;
export default {
  components: {
    'play-list': PlayList,
    'search-result': SearchResult,
  },
  data() {
    return {
      list,
      playerInserted: false,
      search: '',
      searchItems: [],
    };
  },
  computed: {
    insertYT() {
      if (this.playerInserted) return;

      if (this.list.list.length > 0) {
        this.playerInserted = true;

        const tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    },
  },
  methods: {
    play() {
      /* sock.sendPlay(); */
    },
    onSearchSubmit() {
      console.log('searching:', this.search.trim());
      const url = `https://www.googleapis.com/youtube/v3/search\
?key=AIzaSyD6RKnO7af7wC63s_C89BoIvqo7K8O8sSM\
&part=snippet\
&type=video\
&q=${this.search.trim()}`;
      $.get(url, data => {
        console.log(data);
        this.searchItems = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url, // medium: 320x180
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
        }));
      });
    },
  },
  events: {
    'on-close-search-result'() {
      this.searchItems = [];
      this.search = '';
    },
  },
};

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() { // eslint-disable-line
  /* global YT */
  console.log('onYTReady, first list id:', list.list[0]);
  window.player = new YT.Player('yt-player', {
    height: '390',
    width: '640',
    videoId: list.list[0].id,
    events: {
      onReady: onPlayerReady,
      // onStateChange: onPlayerStateChange
    },
  });

  // 2
  /* window.player[2] = player[2] = new YT.Player('player2', { */
  /*   height: '390', */
  /*   width: '640', */
  /*   videoId: 'KUFgjTuvAvs', */
  /*   events: { */
  /*     onReady: onPlayerReady, */
  /*   } */
  /* }); */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.input-field input[type=search] {
  height: inherit;
}

nav .brand-logo {
  padding-left: 10px;
}

.search-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 140px;
  right: 140px;
}
</style>
