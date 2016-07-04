/* global PUBNUB, player */

import list from './list';

const exp = {
  pubnub: null,
  userId: '',
  channel: '',
  connect(channel) {
    this.userId = Math.random();
    this.channel = channel;
    const pubnub = this.pubnub = PUBNUB({ // eslint-disable-line
      subscribe_key: 'sub-c-bcab543a-2d49-11e6-8bc8-0619f8945a4f',
      publish_key: 'pub-c-62d4e7c4-4eaf-46f6-95c6-d7701b8a97c3',
    });

    const that = this;

    pubnub.subscribe({
      channel,
      message(message/* , envelope, channelOrGroup, time, channel*/) {
        that.processMsg(message);
      },
      connect() {
        console.log(`connected to channel: "${channel}"!!!!`);
        that.getList();
      },
    });
  },
  processMsg(msg) {
    switch (msg.action) {
      case 'getList':
        if (msg.userId !== this.userId) {
          this.postList();
        }
        break;
      case 'postList':
        if (msg.userId !== this.userId) {
          console.log('got list!', msg.list);
          list.list = msg.list;
        }
        break;
      case 'play':
        console.log('got play!', msg.time);
        player.playVideo();
        player.seekTo(msg.time);
        break;
      case 'pause':
        console.log('got pause!', msg.time);
        if (msg.userId !== this.userId) {
          player.pauseVideo();
        }
        player.seekTo(msg.time);
        break;
      case 'previous':
        console.log('got previous!');
        // player.playVideo();
        // player.seekTo(0, true);
        list.list.unshift(list.list.pop());
        player.cueVideoById(list.list[0].id, 0, 'small');
        break;
      case 'next':
        console.log('got next!');
        // player.playVideo();
        // player.seekTo(0, true);
        list.list.push(list.list[0]);
        list.list.shift();
        player.cueVideoById(list.list[0].id, 0, 'small');
        break;
      default:
        console.warn('unkown action!!', msg);
    }
  },
  getList() {
    this.pubnub.publish({
      channel: this.channel,
      message: {
        userId: this.userId,
        action: 'getList',
      },
    });
  },
  postList() {
    this.pubnub.publish({
      channel: this.channel,
      message: {
        userId: this.userId,
        action: 'postList',
        list: list.list,
      },
    });
  },
  sendPlay(songId) {
    this.pubnub.publish({
      channel: this.channel,
      message: {
        userId: this.userId,
        action: 'play',
        songId,
        time: player.getCurrentTime(),
      },
    });
  },
  sendPause() {
    player.pauseVideo();
    this.pubnub.publish({
      channel: this.channel,
      message: {
        userId: this.userId,
        action: 'pause',
        time: player.getCurrentTime(),
      },
    });
  },
  sendPrevious() {
    this.pubnub.publish({
      channel: this.channel,
      message: {
        userId: this.userId,
        action: 'previous',
      },
    });
  },
  sendNext() {
    this.pubnub.publish({
      channel: this.channel,
      message: {
        userId: this.userId,
        action: 'next',
      },
    });
  },
};

export default exp;
