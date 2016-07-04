import pubnub from './pubnub';

const list = {
  list: [],
  push(item) {
    this.list.push(item);
    pubnub.postList(); // TODO
  },
  update(newList) {
    this.list = newList;
    pubnub.postList();
  },
  remove(idx) {
    this.list.splice(idx, 1);
    pubnub.postList();
  },
};

export default list;
