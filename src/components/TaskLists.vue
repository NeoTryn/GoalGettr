<template>
  <ul class="taskList">
    <li v-for="task in props.tasks" :key="task.id" class="task" draggable="true">
      <div class="task">
        <p v-if="task.strikeThrough">
          <del>{{ task.title }}</del>
        </p>
        <p v-else>{{ task.title }}</p>
        <p v-if="task.strikeThrough">
          <del>{{ task.description }}</del>
        </p>
        <p v-else>{{ task.description }}</p>
        <div class="delete-icon" @click="emit('removeTask', task.id)">
          <p>Remove Task</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  tasks: {
    id: number
    title: string
    description?: string
    strikeThrough: boolean
  }[]
  columnId: number
}>()

const emit = defineEmits(['removeTask'])
</script>

<style scoped>
.task {
  margin: 2rem;
  background-color: lightskyblue;
  padding: 0.1rem 0.25rem 0.1rem 0.25rem;
  border-radius: 2rem;
}

.taskList {
  list-style-type: none;
  overflow: hidden;
  overflow-y: auto;

  height: 100%;
}

.delete-icon {
  transition: background-color 0.2s ease;

  color: var(--red-dark);
  background-color: var(--red-light);

  padding: 0.75rem;
  border-radius: 1rem;

  margin-top: 0.5rem;
}

.delete-icon:hover {
  color: var(--red-light);
  background-color: var(--red);
  cursor: pointer;
}
</style>
