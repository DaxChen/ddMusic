/* global PUBNUB */

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
};

export default exp;
