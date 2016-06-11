<template>
  <div id="flex-wrapper">
    <div id="hello">
      <img class="logo" src="../assets/Music-icon.png">
      <div class="hello">
        <h1>Welcome to ddMusic</h1>
      </div>
      <p>
        Make sure you have LAN server running for the best performance.
      </p>
      <form class="ip-wrapper" @submit.prevent="onSubmitIp">
        <div class="input-field">
          <label for="ip">Enter the LAN server IP</label>
          <input v-model="ip" class="validate" id="ip" type="text" />
        </div>
        <div>
          <button
            class="btn waves-effect waves-light{{(ipValid && !connecting) ? '' : ' disabled'}}"
            type="submit"
            disabled={{(!ipValid||connecting)}}
          >
            {{ connecting ? 'Connecting...' : 'Submit' }}
            <i class="right {{connecting ? 'fa fa-spin fa-refresh':'material-icons'}}">
              {{connecting ? '' : 'send'}}
            </i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import sock from '../socket-client';
// eslint-disable-next-line
const pattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;

export default {
  props: ['connected'],
  data() {
    return {
      ip: '',
      connecting: false,
    };
  },
  computed: {
    ipValid() {
      return pattern.test(this.ip);
    },
  },
  methods: {
    onSubmitIp() {
      this.connecting = true;

      sock.connect(this.ip, success => {
        this.connecting = false;
        if (success) {
          this.$dispatch('on-connect-success');
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#flex-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#hello {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#hello a {
  color: #42b983;
  text-decoration: none;
}

#hello p {
  color: #d6d6d7;
}

.hello {
  color: #dfe0e6;
}

.logo {
  width: 100px;
  height: 100px;
}

.ip-wrapper {
  color: #d6d6d7;
}
</style>
