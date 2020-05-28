<template>
  <form @submit.prevent="onSubmit">
    <h2 v-if="loading">loading...</h2>
    <h3 v-if="error">{{ error }}</h3>

    <div>name:<input name="name" v-model="name" /></div>
    <div>age: <input name="age" v-model="age" /></div>
    <div>address: <input name="address" v-model="address" /></div>

    <button type="submit">submit</button>
  </form>
</template>

<script>
const api_url = '/api/users/1';

export default {
  data() {
    return {
      loading: false,
      error: '',
      name: '',
      age: '',
      address: '',
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const res = await fetch(api_url).then(response => response.json());
        this.name = res.name;
        this.age = res.age;
        this.address = res.address;
      } catch (error) {
        this.error = error.message;
      }

      this.loading = false;
    },

    async onSubmit() {
      this.loading = true;

      const data = {
        name: this.name,
        age: this.age,
        address: this.address,
      };

      try {
        const res = await fetch(api_url, {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          // FIXME:
          .catch(error => error.json());

        this.name = res.name;
        this.age = res.age;
        this.address = res.address;
      } catch (error) {
        console.log(error);
        this.error = error;
      }

      this.loading = false;
    },
  },
};
</script>
