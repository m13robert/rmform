<script setup>
import ButtonComponent from './components/ButtonComponent.vue';
import { useCounterStore } from '@/stores/counter';
import CheckboxComponent from './components/CheckboxComponent.vue';
import NumberInputComponent from './components/NumberInputComponent.vue';
import TextInput from './components/TextInput.vue';
import { ref } from 'vue';

const age = ref(25)
const ageError = ref('')


const counter = useCounterStore()
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>

  <ButtonComponent variant="danger" @click="counter.increment">Clicked {{ counter.count }}</ButtonComponent>
  <CheckboxComponent id="terms" label="my checkbox" isIndeterminate readonly></CheckboxComponent>
  <NumberInputComponent id="nums" v-model="age" label="Age" :min="18" :max="120" :step="1" required :error="ageError" />
  <TextInput label=" My input" error="invalid" />
</template>

<style scoped></style>
