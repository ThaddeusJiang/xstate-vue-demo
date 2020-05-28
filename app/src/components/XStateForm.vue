<template>
  <div>
    <h1>XState Form</h1>
    <form @submit.prevent="send('onSubmit')">
      <!-- TODO: how to use Vue API? isolate from XState -->
      <div>name:<input name="name" v-model="state.context.data.name" /></div>
      <div>
        age: <input name="age" v-model.number="state.context.data.age" />
      </div>
      <div>
        address: <input name="address" v-model="state.context.data.address" />
      </div>
      <p v-if="state.matches('fetching') || state.matches('updating')">
        loading...
      </p>
      <p v-if="state.matches('fetchFailed') || state.matches('updateFailure')">
        {{ state.context.error }}
      </p>
      <!-- TODO: how to use computed? -->
      <button
        type="submit"
        :disabled="
          state.matches('fetching') ||
            state.matches('updating') ||
            state.matches('fetchFailed') ||
            state.matches('updateFailed')
        "
      >
        submit
      </button>
    </form>
  </div>
</template>

<script>
const api_url = '/api/users/1';

import { useMachine } from '@xstate/vue';
import { Machine, assign } from 'xstate';
import { onMounted } from '@vue/composition-api';

const fetchData = () => fetch(api_url).then(response => response.json());
const updateData = context =>
  fetch(api_url, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(context.data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json());

const fetchMachine = Machine({
  initial: 'idle',
  context: {
    data: {
      name: '',
      age: '',
      address: '',
    },
    error: '',
  },
  states: {
    idle: {
      on: {
        fetch: 'fetching',
      },
    },
    fetching: {
      invoke: {
        id: 'fetchData',
        src: 'fetchData',
        onDone: {
          target: 'normal',
          actions: assign({
            // TODO: Can I directly set response to Vue date?
            data: (context, event) => event.data,
          }),
        },
        onError: {
          target: 'fetchFailed',
          actions: assign({
            error: (context, event) => event.data,
          }),
        },
      },
    },
    fetchFailed: {},
    normal: {
      on: {
        onSubmit: 'updating',
      },
    },
    updating: {
      invoke: {
        id: 'updateData',
        src: 'updateData',
        onDone: {
          target: 'normal',
        },
        onError: {
          target: 'updateFailed',
          actions: assign({
            error: (context, event) => event.data,
          }),
        },
      },
    },
    updateFailed: {
      on: {
        ok: 'normal',
      },
    },
  },
});

export default {
  // https://github.com/vuejs/composition-api
  setup() {
    const { state, send } = useMachine(fetchMachine, {
      services: {
        fetchData,
        updateData,
      },
    });

    onMounted(() => {
      send('fetch');
    });

    return {
      state,
      send,
    };
  },
};
</script>
