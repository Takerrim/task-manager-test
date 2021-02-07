<template lang="pug">
  div.new-task-view
    h1.title Add a new task
    form.new-task-form(@submit.prevent.stop="createTask")
      input.input(v-model.trim="form.title" placeholder="enter a title")
      textarea.textarea(v-model.trim="form.description" placeholder="enter a description")
      ui-button(type="submit") Create
</template>

<script>
import { CREATE_TASK } from '@/store/constants/actions'

export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
      },
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasksModule.tasks
    },
  },
  methods: {
    async createTask() {
      if (this.form.title && this.form.description) {
        await this.$store.dispatch(`tasksModule/${CREATE_TASK}`, this.form)

        this.$router.push({
          name: 'task',
          params: { id: String(this.tasks[this.tasks.length - 1].id) },
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.new-task-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new-task-form {
  display: grid;
  grid-gap: 12px;
  max-width: 300px;
  width: 100%;
}

.textarea {
  height: 150px;
}

.input {
  height: 40px;
  font-size: 18px;
}
</style>
