<template lang="pug">
  .task-base(:style="{ backgroundColor: statusColor }" @dblclick="goToTask")
    h3.title {{ task.title }}
    p.description {{ task.description }}
</template>

<script>
import statuses from '@/constants/statuses'

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusColor() {
      return statuses.find(status => status.id === this.task.status).color || ''
    },
    isDescriptionTruncated() {
      
    }
  },
  methods: {
    goToTask() {
      this.$router.push({
        name: 'task',
        params: { id: String(this.task.id) },
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.task-base {
  border: 1px solid #EBEDF0;
  border-radius: 6px;
  padding: 24px 0;
  text-align: center;
  cursor: pointer;
}

.title {
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title,
.description {
  overflow: hidden;
  padding: 0 24px;
}

.description {
  margin-top: 12px;
  $lh: 22px;
  $max-lines: 2;
  line-height: $lh;
  max-height: $lh * $max-lines;
  word-break: break-all;
  position: relative;
  background-color: inherit;
}

.description::before {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 10px;
}

.description::after {
  content: "";
  position: absolute;
  right: 10px;
  width: 1rem;
  height: 1rem;
  background: inherit;
  z-index: 5;
}
</style>
