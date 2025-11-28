<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-primary rounded-lg shadow-md">
    <div class="flex justify-end">
      <ThemeSwitcher />
    </div>
    <h1 class="text-2xl font-bold mb-6">User Registration</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <TextInput v-model="form.name" label="Name" required :error="errors.name" @blur="validateName" />

      <TextInput v-model="form.email" label="Email" type="email" required :error="errors.email" @blur="validateEmail" />

      <NumberInputComponent v-model="form.age" label="Age" :min="18" :max="100" required :error="errors.age" />

      <CheckboxComponent v-model="form.agreeToTerms" label="I agree to the terms and conditions"
        :error="!!errors.terms" />

      <div class="flex gap-4 pt-4 justify-center">
        <ButtonComponent type="submit" :disabled="!isFormValid">
          Submit
        </ButtonComponent>

        <ButtonComponent variant="secondary" @click="clearFields">
          Clear Fields
        </ButtonComponent>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFormStore } from './stores/form'
import TextInput from './components/TextInput.vue'
import NumberInputComponent from './components/NumberInputComponent.vue'
import CheckboxComponent from './components/CheckboxComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

const formStore = useFormStore()

const form = ref({
  name: '',
  email: '',
  age: 18,
  agreeToTerms: false
})

const errors = ref({
  name: '',
  email: '',
  age: '',
  terms: ''
})

const validateName = () => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/
  errors.value.name = !nameRegex.test(form.value.name) ? 'Name must be at least 2 characters and contain only letters' : ''
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  errors.value.email = !emailRegex.test(form.value.email) ? 'Please enter a valid email address' : ''
}

const isFormValid = computed(() => {
  return form.value.name &&
    !errors.value.name &&
    form.value.email &&
    !errors.value.email &&
    form.value.age >= 18 &&
    form.value.agreeToTerms
})

const handleSubmit = () => {
  errors.value.name = !form.value.name ? 'Name is required' : ''
  errors.value.email = !form.value.email ? 'Email is required' : ''
  errors.value.age = form.value.age < 18 ? 'Age must be at least 18' : ''
  errors.value.terms = !form.value.agreeToTerms ? 'You must agree to the terms' : ''

  if (!errors.value.name) validateName()
  if (!errors.value.email) validateEmail()

  if (isFormValid.value) {
    formStore.submitForm(form.value)
    console.log('Form submitted:', form.value)
    console.log('Total submissions:', formStore.getSubmissionCount)
    alert('Form submitted successfully!')
  }
}

const clearFields = () => {
  form.value = {
    name: '',
    email: '',
    age: 18,
    agreeToTerms: false
  }
  errors.value = {
    name: '',
    email: '',
    age: '',
    terms: ''
  }
}
</script>

<style scoped></style>
