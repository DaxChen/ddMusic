/* global PubNub, player */

import list from './list';

const exp = {
  pubnub: null,
  userId: '',
  channel: '',
  connect(channel, cb) {
    this.channel = channel;
    this.pubnub = new PubNub({
      publishKey: 'pub-c-734121f5-e56c-49b3-9ab5-2145cfd3887c',
      subscribeKey: 'sub-c-0afb138a-6ca5-11e9-8724-8269f6864ada',
    });
    this.userId = this.pubnub.getUUID();
    console.log(`My UUID is ${this.userId}`);

    const that = this;

    this.pubnub.addListener({
      status(statusEvent) {
        if (statusEvent.category === 'PNConnectedCategory') {
          console.log(`connected to channel: "${channel}"!!!!`);
          cb();
          that.getList();
        }
      },
      message(message /* , envelope, channelOrGroup, time, channel*/) {
        that.processMsg(message);
      },
    });

    this.pubnub.subscribe({
      channels: [channel],
    });
  },
  processMsg(payload) {
    const msg = payload.message;
    switch (msg.action) {
      case 'getList':
        if (payload.publisher !== this.userId) {
          this.postList();
        }
        break;
      case 'postList':
        if (payload.publisher !== this.userId) {
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
        if (payload.publisher !== this.userId) {
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
        action: 'getList',
      },
    });
  },
  postList() {
    this.pubnub.publish({
      channel: this.channel,
      message: {
        action: 'postList',
        list: list.list,
      },
    });
  },
  sendPlay(songId) {
    this.pubnub.publish({
      channel: this.channel,
      message: {
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
        action: 'pause',
        time: player.getCurrentTime(),
      },
    });
  },
  sendPrevious() {
    this.pubnub.publish({
      channel: this.channel,
      message: {
        action: 'previous',
      },
    });
  },
  sendNext() {
    this.pubnub.publish({
      channel: this.channel,
      message: {
        action: 'next',
      },
    });
  },
};

export default exp;
