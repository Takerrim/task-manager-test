<template lang="pug">
  .task-base
    div.dropdown-wrapper
      ui-dropdown.dropdown(v-model="currentStatus" @change="onStatusChange" :items="statuses")
    h3.title {{ task.title }}
    p.description {{ task.description }}
    span.date {{ date }}
    ui-button.delete-btn(appearance="error" @click="deleteTask") Delete
</template>

<script>
import statuses from '@/constants/statuses'
import { REMOVE_TASK, UPDATE_TASK } from '@/store/constants/actions'

export default {
  data() {
    return {
      currentStatus: this.task.status,
    }
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      const date = new Date(this.task.created_date).toLocaleString()
      return date
    },
    statuses() {
      return statuses.map(status => ({
        label: status.title,
        value: status.id,
      }))
    }
  },
  methods: {
    async deleteTask() {
      await this.$store.dispatch(`tasksModule/${REMOVE_TASK}`, this.task.id)
      this.$router.push({ name: 'tasks' })
    },
    async onStatusChange() {
      await this.$store.dispatch(`tasksModule/${UPDATE_TASK}`, {
        ...this.task,
        status: this.currentStatus,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.task-base {
  border: 1px solid #EBEDF0;
  border-radius: 6px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  position: relative;
}

.description {
  margin-top: 12px;
}

.dropdown-wrapper {
  position: absolute;
  top: 12px;
  right: 12px;
}

.delete-btn {
  margin-top: 24px;
  min-width: 100px;
}

.title {
  text-align: center;
}

.title,
.description {
  word-break: break-all;
}
</style>
