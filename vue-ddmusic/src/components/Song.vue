<template>
  <li class="song card-panel">
    <img
      :src="item.thumbnail"
      width="320"
      height="180"
      class="song-img"
    />
    <div class="song-right-area">
      <div class="song-title">{{ item.title }}</div>
      <button
        v-if="addToPlaylistBtn"
        class="waves-effect waves-light btn"
        @click="addToPlayList(item)"
      >Add to playlist</button>
      <button
        v-if="removeBtn"
        class="waves-effect waves-light btn"
        @click="removeFromPlayList(index)"
      >Remove</button>
      <div>
        <a href="https://www.youtube.com/channel/{{item.channelId}}" target="_blank">
          {{ item.channelTitle }}
        </a>
        <small class="song-time">{{ fromNow(item.publishedAt) }}</small>
      </div>
      <div>{{ item.description }}</div>
    </div>
  </li>
</template>

<script>
import moment from 'moment';
import list from '../list';
export default {
  props: ['item', 'addToPlaylistBtn', 'removeBtn', 'index'],
  data() {
    return {
    };
  },
  methods: {
    fromNow(a) {
      return moment(a).fromNow();
    },
    addToPlayList(item) {
      list.push(item);
    },
    removeFromPlayList(idx) {
      list.remove(idx);
    },
  },
};
</script>

<style>
.song {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.song-img {
  position: absolute;
  left: 10px;
  top: 10px;
}

.song-right-area {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 340px;
}

.song-title {
  font-size: 1.4em;
  color: #000;
}

.song-time {
  padding-left: 10px;
  color: #bbb;
}
</style>
