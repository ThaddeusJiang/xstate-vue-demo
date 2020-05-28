<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <NormalForm />


  </div>
</template>

<script>
import NormalForm from "./components/NormalForm";

export default {
  name: 'App',
  components: {
    NormalForm,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
