<template>
  <div class="column">
    <heading class="heading">
      <h1><slot></slot></h1>
      <div class="addButton" @click="addTask">
        <p>Add Task</p>
      </div>
    </heading>
    <div class="tasks">
      <TaskLists :tasks="tasks" @removeTask="removeTask" :columnId="props.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskLists from './TaskLists.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['addOpenTask', 'addInProgressTask', 'addFinishedTask', 'removeTask'])

const addTask = () => {
  if (props.id === 1) {
    emit('addOpenTask')
  } else if (props.id === 2) {
    emit('addInProgressTask')
  } else {
    emit('addFinishedTask')
  }
}

const props = defineProps<{
  tasks: {
    id: number
    title: string
    description?: string
    strikeThrough: boolean
  }[]
  id: number
}>()

const removeTask = (id: number) => {
  emit('removeTask', id)
}
</script>

<style scoped>
.column {
  text-align: center;
  margin: 0;

  height: 100%;
  width: 30%;
}

.tasks {
  background-color: var(--brand-color-light);

  padding: 5rem;

  height: 100%;

  border: 0.2rem solid var(--brand-color);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border-bottom: 0;
}

.heading {
  margin-bottom: 1rem;
  text-align: left;
  display: flex;

  justify-content: space-between;
}

.addButton {
  background-color: var(--brand-color);
  color: var(--brand-color-dark);
  border-radius: 0.6rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0.5rem;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.addButton:hover {
  background-color: var(--brand-color-darky);
  color: var(--brand-color-light);
}
</style>
