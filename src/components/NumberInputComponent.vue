<template>
  <div class="flex flex-col gap-1 p-2">
    <label v-if="label" :for="inputId" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div :class="containerClasses" :id="`container-${inputId}`">
      <button type="button" :disabled="disabled || modelValue <= min" :class="buttonClasses" @click="decrement">
        -
      </button>
      <input :id="inputId" type="number" :value="modelValue" :min="min" :max="max" :step="step" :disabled="disabled"
        :readonly="readonly" :required="required" :class="inputClasses" @input="handleInput" @blur="handleBlur"
        @focus="handleFocus" />
      <button type="button" :disabled="disabled || modelValue >= max" :class="buttonClasses" @click="increment">
        +
      </button>
    </div>
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup>
import { computed, useId, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: ''
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const inputId = computed(() => props.id || useId())
const isFocused = ref(false)

const labelClasses = computed(() => [
  'text-sm font-medium text-gray-700',
  props.disabled ? 'text-gray-500' : ''
])

const containerClasses = computed(() => [
  'flex items-center w-min',
  {
    'border-red-400 ring-2 ring-red-400 ring-offset-1 rounded-md': props.error,
    'border-blue-400 ring-2 ring-blue-400 ring-offset-1 rounded-md': isFocused.value && !props.error
  }
])

const inputClasses = computed(() => [
  'w-20 px-3 py-2 text-center border-y text-base transition-colors duration-200 focus:outline-none focus:ring-none',
  {
    'border-red-400': props.error,
    'border-blue-400': isFocused.value && !props.error,
    'border-gray-300': !props.disabled,
    'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300': props.disabled,
    'bg-gray-50 border-gray-300': props.readonly && !props.disabled
  }
])

const buttonClasses = computed(() => [
  'px-3 py-2 border transition-colors duration-200 focus:outline-none focus:ring-none',
  'first:rounded-l-md first:border-r-0 last:rounded-r-md last:border-l-0',
  {
    'border-red-400': props.error,
    'border-blue-400': isFocused.value && !props.error,
    'border-gray-300 bg-gray-50 hover:bg-gray-100': !props.disabled,
    'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed': props.disabled,
    'disabled:opacity-50': true
  }
])

const handleInput = (event) => {
  const value = parseFloat(event.target.value)
  if (!isNaN(value)) {
    emit('update:modelValue', Math.min(Math.max(value, props.min), props.max))
  }
}

const increment = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', Math.min(props.modelValue + props.step, props.max))
  }
}

const decrement = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', Math.max(props.modelValue - props.step, props.min))
  }
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}
</script>
