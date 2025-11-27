<template>
  <div class="inline-flex items-center flex-col">
    <div class="inline-flex items-center">
      <label class="flex items-center cursor-pointer relative">
        <input :class="checkboxClasses" type="checkbox" :id="id" @change="cycleState" ref="checkbox"
          :indeterminate="state === null" :checked="state === true" :disabled="disabled || readonly" />
        <span
          class="absolute text-white opacity-0 peer-indeterminate:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CheckedErrorIcon v-if="hasError" />
          <CheckedIcon v-else />
        </span>
        <span
          class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <IndeterminateErrorIcon v-if="hasError" />
          <IndeterminateIcon v-else />
        </span>
      </label>
      <label :class="labelClasses" :for="id">{{ label }} {{ id }}</label>
    </div>
    <div v-if="hasError && displayErrorMessage" class="text-red-600 text-sm mt-1">
      {{ displayErrorMessage }}
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import CheckedIcon from '../assets/CheckedIcon.svg'
import CheckedErrorIcon from '../assets/CheckedErrorIcon.svg'
import IndeterminateIcon from '../assets/IndetereminateIcon.svg'
import IndeterminateErrorIcon from '../assets/IndeterminateErrorIcon.svg'

const props = defineProps({
  id: String,
  label: String,
  modelValue: Boolean,
  isIndeterminate: Boolean,
  error: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  required: Boolean,
  errorMessage: String,
})

const emit = defineEmits(['update:modelValue'])

const checkbox = ref(null)
const state = ref(props.modelValue || false)
const validationError = ref('')

const isValid = computed(() => {
  if (props.required && state.value !== true) {
    return false
  }
  return true
})

const hasError = computed(() => props.error || !isValid.value)

const displayErrorMessage = computed(() => {
  if (props.errorMessage) return props.errorMessage
  if (props.required && state.value !== true) return 'This field is required'
  return ''
})

// mapping where: null = intermediate, true = checked, false = unchecked
const cycleMap = { null: true, true: false, false: null }

function cycleState(event) {
  event?.preventDefault()

  if (!props.isIndeterminate && state.value === false) {
    state.value = true
  } else {
    state.value = cycleMap[state.value]
  }

  emit('update:modelValue', state.value === true)
  
  // Trigger validation
  validationError.value = isValid.value ? '' : displayErrorMessage.value

  nextTick(() => {
    if (checkbox.value) {
      checkbox.value.checked = state.value === true
      checkbox.value.indeterminate = state.value === null
    }
  })
}

onMounted(() => {
  if (checkbox.value && props.modelValue) {
    checkbox.value.checked = props.modelValue
    checkbox.value.indeterminate = false
  }
})

const checkboxClasses = computed(() => [
  `peer h-5 w-5 cursor-pointer transition-all appearance-none rounded
  border
  focus:ring-purple-400 focus:ring-2 focus:ring-offset-1 focus:outline-none focus:shadow-none focus:border-none
  ${props.disabled ? 'border-gray-400 focus:ring-none text-gray-400' : ''}
  ${state.value === null || state.value === true ? 'border-none shadow-none' : ''}
  ${hasError.value ? 'border-red-600 focus:ring-red-400' : 'border-slate-300'}
`,
])

const labelClasses = computed(() => [
  'mx-1 cursor-pointer text-primary',
  props.disabled ? 'border-gray-500 focus:ring-none text-gray-500' : '',
  props.readonly ? 'border-gray-500 focus:ring-none text-gray-800' : ''
])
</script>
