<template>
  <div id="app">
    <NormalForm />
    <XStateForm />
  </div>
</template>

<script>
import NormalForm from './components/NormalForm';
import XStateForm from './components/XStateForm';

export default {
  name: 'App',
  components: {
    NormalForm,
    XStateForm,
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: space-around;
}
</style>
