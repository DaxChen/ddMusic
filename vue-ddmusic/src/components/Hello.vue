<template>
  <div id="flex-wrapper">
    <div id="hello">
      <img class="logo" src="../assets/Music-icon.png">
      <div class="hello">
        <h1>Welcome to ddMusic</h1>
      </div>
      <p>
        Enter a room id to join!
      </p>
      <form class="id-wrapper" @submit.prevent="onSubmitId">
        <div class="input-field">
          <label for="id">Enter a room id, can be anything~</label>
          <input v-model="id" class="validate" id="id" type="text" />
        </div>
        <div>
          <button
            class="btn waves-effect waves-light{{!id ? ' disabled' : ''}}"
            type="submit"
            disabled={{!id.trim()}}
          >
            Submit
            <i class="right material-icons">
              send
            </i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
    };
  },
  methods: {
    onSubmitId() {
      console.log('submit!!!');
      // pubnub.connect(this.id.trim());
      // this.$dispatch('on-connect-success');
      this.$router.go(`/${this.id.trim()}`);
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

.id-wrapper {
  color: #d6d6d7;
}
</style>
