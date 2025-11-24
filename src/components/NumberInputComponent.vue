<template>
  <div class="m-2">
    <label :for="id">{{ label }}</label>
    <div>
      <button @click.prevent="decrement">-</button>
      <input type="number" :id="id" :min="minValue" :class="inputClasses" :value="counter" />
      <button @click.prevent="increment">+</button>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue';


const props = defineProps({
  id: String,
  label: String,
  minValue: {
    type: Number,
    default: 18
  },
})

const inputClasses = [
  'w-24 text-center outline-none'
]


const counter = ref(props.minValue)

function increment() {

  counter.value++
}


function decrement() {
  if (counter.value === props.minValue) return;
  counter.value--
}



</script>
