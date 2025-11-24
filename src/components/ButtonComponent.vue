<template>
  <button @click="$emit('click', $event)" :disabled="disabled" :class="buttonClasses">
    <slot />
  </button>

</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'text', 'danger'].includes(val)
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String
  }
})

defineEmits(['click']);

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 px-8 py-2 m-2',
  {
    'opacity-50 cursor-not-allowed': props.disabled || props.loading,
    'space-x-2': props.icon && !props.loading,
  },
  {
    'primary': `${props.disabled ? 'bg-gray-500' : 'bg-blue-500 active:bg-blue-800 hover:bg-blue-600 hover:ring-blue-500'} text-white  hover:ring-1  hover:border-1 hover:border-solid hover:border-white active:bg-blue-300`,
    'secondary': 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    'danger': `${props.disabled ? 'bg-gray-500' : 'bg-red-700 hover:bg-red-600 active:bg-red-800'} text-white  focus:ring-red-400`,
  }[props.variant],
  props.className,
]);

</script>
