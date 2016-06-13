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
};

export default list;
