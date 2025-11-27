<template>
  <div :class="containerClasses">
    <label v-if="label" :for="inputId" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input :id="inputId" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      :readonly="readonly" :required="required" :class="inputClasses" @input="handleInput" @blur="handleBlur"
      @focus="handleFocus" />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password', 'email'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
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

const labelClasses = computed(() => [
  'text-sm font-medium text-primary',
  props.disabled ? 'text-gray-500' : ''
])

const inputClasses = computed(() => [
  'px-3 py-2 border rounded-md text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
  {
    'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-400': !props.error && !props.disabled,
    'border-red-500 hover:border-red-600 focus:border-red-500 focus:ring-red-400': props.error,
    'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300': props.disabled,
    'bg-gray-50 border-gray-300': props.readonly && !props.disabled
  }
])

const containerClasses = computed(() => [
  'flex flex-col gap-1 p-2 text-primary',
  {
    'focus:ring-purple-500': !props.error && !props.disabled,
    'focus:ring-red-400': props.error,
    'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300': props.disabled,
    'bg-gray-50 border-gray-300': props.readonly && !props.disabled
  }
])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}
</script>
