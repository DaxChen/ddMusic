<template>
<div class="main-wrapper">
  <div v-if="!connected" class="loading">
    <i class="material-icons fa fa-spin fa-refresh fa-5x"></i>
  </div>
  <div v-else>
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

    <div v-show="list.list.length" class="dummyclass{{insertYT}}">
      <h1>Youtube Player:</h1>
      <div id="yt-player"></div>
      <div>
        <button @click="previous" class="waves-effect waves-light btn"><i class="fa fa-step-backward"></i></button>
        <button v-if="!playing" @click="play" class="waves-effect waves-light btn"><i class="fa fa-play"></i></button>
        <button v-else @click="pause" class="waves-effect waves-light btn"><i class="fa fa-pause"></i></button>
        <button @click="next" class="waves-effect waves-light btn"><i class="fa fa-step-forward"></i></button>
      </div>
    </div>

    <play-list :list="list.list"></play-list>
  </div>
</div>
</template>

<script>
/* global $, player */

import pubnub from '../pubnub';
import list from '../list';
import PlayList from './PlayList';
import SearchResult from './SearchResult';

const playerState = {
  isPlaying: false,
};
window.playerState = playerState;

function playNext() {
  list.list.push(list.list[0]);
  list.list.shift();
  player.cueVideoById(list.list[0].id, 0, 'small');
}

function onPlayerReady(event) {
  event.target.setPlaybackQuality('small');
  event.target.playVideo();
  event.target.pauseVideo();
  event.target.seekTo(0, true);
}
function onPlayerStateChange(e) {
  /* -1 (unstarted) */
  /* 0 (ended) */
  /* 1 (playing) */
  /* 2 (paused) */
  /* 3 (buffering) */
  /* 5 (video cued) */
  console.log('onPlayerStateChange:', e.data);
  playerState.isPlaying = player.getPlayerState() === 1;
  if (e.data === 5) {
    // play the video after cued
    player.playVideo();
    player.pauseVideo();
    player.seekTo(0, true);
    setTimeout(() => pubnub.sendPlay(), 300);
  }
  if (e.data === 0) {
    console.log('detected video end!');
    playNext();
  }
}

/* window.list = list; */
export default {
  name: 'Main',
  components: {
    'play-list': PlayList,
    'search-result': SearchResult,
  },
  data() {
    return {
      connected: false,
      list,
      playerInserted: false,
      search: '',
      searchItems: [],
      playerState,
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
    playing() {
      return playerState.isPlaying;
    },
  },
  created() {
    pubnub.connect(this.$route.params.id, () => {
      this.connected = true;
    });
  },
  methods: {
    play() {
      pubnub.sendPlay();
    },
    pause() {
      pubnub.sendPause();
    },
    previous() {
      pubnub.sendPrevious();
    },
    next() {
      pubnub.sendNext();
    },
    onSearchSubmit() {
      console.log('searching:', this.search.trim());
      const url = `https://www.googleapis.com/youtube/v3/search\
?key=AIzaSyB68Bce0y54OqqdXhVxB5kp4-u66UZphCo\
&part=snippet\
&type=video\
&q=${this.search.trim()}`;
      $.get(url, data => {
        /* console.log(data); */
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
      onStateChange: onPlayerStateChange,
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
.main-wrapper {
  height: 100%;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
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
