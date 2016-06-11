<template>
  <div>
    <hello
      v-if="!connected"
      :connected="connected"
    ></hello>
    <main v-else></main>
  </div>
</template>

<script>
import Hello from './components/Hello';
import Main from './components/Main';

export default {
  components: {
    hello: Hello,
    main: Main,
  },
  data() {
    return {
      connected: false,
    };
  },
  events: {
    'on-connect-success'() {
      this.connected = true;
    },
  },
};
</script>

<style>
html {
  height: 100%;
  color: #88898c;
  background: #121314;
}

body {
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  height: 100%;
}
#vue-root {
  height: 100%;
}
</style>
