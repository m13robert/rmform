import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => ({
    submissions: []
  }),
  
  actions: {
    submitForm(formData) {
      this.submissions.push({
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString()
      })
    },
    
    clearSubmissions() {
      this.submissions = []
    }
  },
  
  getters: {
    getSubmissionCount: (state) => state.submissions.length,
    getLatestSubmission: (state) => state.submissions[state.submissions.length - 1]
  }
})
