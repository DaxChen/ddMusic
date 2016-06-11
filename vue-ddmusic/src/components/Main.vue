<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Logo</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="#">Sass</a></li>
          <li><a href="#">Components</a></li>
          <li><a href="#">JavaScript</a></li>
        </ul>
      </div>
    </nav>
  </div>

  <div>
    <h1>YOYOYO</h1>
    <div id="yt-player"></div>
    <h2>after yt</h2>
    <button @click="play">Play!!!!</button>
  </div>
</template>

<script>
import sock from '../socket-client';
function onPlayerReady(event) {
  event.target.setPlaybackQuality('small');
  event.target.playVideo();
  event.target.pauseVideo();
  event.target.seekTo(0, true);
}

export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    play() {
      sock.sendPlay();
    },
  },
  ready() {
    // 2. This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    console.log('ready!!!');
  },
};

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() { // eslint-disable-line
  /* global YT */
  console.log('onYTReady');
  window.player = new YT.Player('yt-player', {
    height: '390',
    width: '640',
    videoId: '35NlP39bW28',
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
</style>
