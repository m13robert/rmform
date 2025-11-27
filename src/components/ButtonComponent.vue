<template>
  <button :disabled="disabled || loading" :class="buttonClasses" @click="handleClick">
    <span v-if="loading" class="animate-spin mr-2">⟳</span>
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'text', 'danger'].includes(val)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (val) => ['small', 'medium', 'large'].includes(val)
  },
  className: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const sizeClasses = computed(() => {
  const sizes = {
    small: 'px-4 py-1 text-sm',
    medium: 'px-8 py-2',
    large: 'px-12 py-3 text-lg'
  }
  return sizes[props.size]
})

const variantClasses = computed(() => {
  const variants = {
    primary: props.disabled
      ? 'bg-gray-500 text-white'
      : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white focus:ring-blue-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: props.disabled
      ? 'bg-gray-500 text-white'
      : 'bg-red-700 hover:bg-red-600 active:bg-red-800 text-white focus:ring-red-400',
    text: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-400'
  }
  return variants[props.variant]
})

const buttonClasses = computed(() => [
  'inline-flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
  sizeClasses.value,
  variantClasses.value,
  {
    'opacity-50 cursor-not-allowed': props.disabled || props.loading,
  },
  props.className
])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
