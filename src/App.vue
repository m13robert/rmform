<script setup>
import ButtonComponent from './components/ButtonComponent.vue';
import { useCounterStore } from '@/stores/counter';
import CheckboxComponent from './components/CheckboxComponent.vue';
import NumberInputComponent from './components/NumberInputComponent.vue';


const counter = useCounterStore()
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>

  <ButtonComponent variant="danger" @click="counter.increment">Clicked {{ counter.count }}</ButtonComponent>
  <CheckboxComponent id="terms" label="my checkbox" isIndeterminate></CheckboxComponent>
  <NumberInputComponent id="nums" label="my input" />
</template>

<style scoped></style>
