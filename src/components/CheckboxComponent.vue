<template>
  <div class="inline-flex items-center">
    <label class="flex items-center cursor-pointer relative">
      <input :class="checkboxClasses" type="checkbox" :id="id" @change="cycleState" ref="checkbox" />

      <span
        class="absolute text-white opacity-0 peer-indeterminate:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 6C2 3.79086 3.79086 2 6 2H14C16.2091 2 18 3.79086 18 6V14C18 16.2091 16.2091 18 14 18H6C3.79086 18 2 16.2091 2 14V6Z"
            fill="#5F36BC" />
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M15.1499 10C15.1499 10.359 14.8589 10.65 14.4999 10.65L5.4999 10.65C5.14092 10.65 4.8499 10.359 4.8499 10C4.8499 9.64102 5.14092 9.35 5.4999 9.35L14.4999 9.35C14.8589 9.35 15.1499 9.64102 15.1499 10Z"
            fill="white" />
        </svg>
      </span>
      <span
        class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 6C2 3.79086 3.79086 2 6 2H14C16.2091 2 18 3.79086 18 6V14C18 16.2091 16.2091 18 14 18H6C3.79086 18 2 16.2091 2 14V6Z"
            fill="#5F36BC" />
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M14.4742 7.05543C14.7197 7.31732 14.7064 7.72866 14.4445 7.97419L9.11141 12.9742C8.86138 13.2086 8.47232 13.2086 8.22229 12.9742L5.55543 10.4742C5.29353 10.2287 5.28025 9.81736 5.52576 9.55546C5.77128 9.29355 6.18262 9.28027 6.44452 9.52579L8.66681 11.609L13.5554 7.02581C13.8173 6.78028 14.2286 6.79354 14.4742 7.05543Z"
            fill="white" />
        </svg>
      </span>
    </label>
    <label :class="labelClasses" :for="id">{{ label }} {{ displayState }} {{ id }}</label>
  </div>

</template>
<script setup>
import { computed, nextTick, ref } from 'vue'
const props = defineProps({
  id: String,
  label: String,
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'text', 'danger'].includes(val)
  },
  isIndeterminate: Boolean
})



const checkbox = ref(null)
const state = ref(false)

const cycleMap = { null: true, true: false, false: null }

function cycleState(event) {
  event.preventDefault()

  if (!props.isIndeterminate && state.value === false) {
    state.value = true
  } else {
    state.value = cycleMap[state.value]
  }

  nextTick(() => {
    if (checkbox.value) {
      checkbox.value.checked = state.value === true
      checkbox.value.indeterminate = state.value === null
    }
  })
}


const displayState = computed(() => {

  if (state.value === true) return 'checked'
  if (state.value === null) return 'indeterminate'
  return 'unchecked'
})

const checkboxClasses = computed(() => [
  'peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-red-600 checked:border-red-600',
  // 'mx-1 my-1 w-4 h-4 accent-orange-500 checked:bg-red-500 text-white',
  {
    'primary': '',
    'secondary': ''
  }
])

const labelClasses = computed(() => [
  'mx-1 '
])
</script>
