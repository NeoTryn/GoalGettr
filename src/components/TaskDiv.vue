<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue'
import ColumnTasks from './ColumnTasks.vue'

const taskTitle = ref('')
const taskDescription = ref('')

const formVisible = ref(false)

const type = ref('')

const addTask = (t: string) => {
  formVisible.value = true
  type.value = t
}

interface Task {
  id: number
  title: string
  description?: string
  strikeThrough: boolean
}

const openTasks = ref<Task[]>([])
const inProgressTasks = ref<Task[]>([])
const finishedTasks = ref<Task[]>([])

const onFormSubmit = () => {
  switch (type.value) {
    case 'openTask':
      openTasks.value.push({
        id: openTasks.value.length + 1,
        title: taskTitle.value,
        description: taskDescription.value,
        strikeThrough: false
      })
      break
    case 'inProgressTask':
      inProgressTasks.value.push({
        id: inProgressTasks.value.length + 1,
        title: taskTitle.value,
        description: taskDescription.value,
        strikeThrough: false
      })
      break
    case 'finishedTask':
      finishedTasks.value.push({
        id: finishedTasks.value.length + 1,
        title: taskTitle.value,
        description: taskDescription.value,
        strikeThrough: true
      })
      break
  }
  formVisible.value = false
}

onUpdated(() => {
  localStorage.setItem('openTasks', JSON.stringify(openTasks.value))
  localStorage.setItem('inProgressTasks', JSON.stringify(inProgressTasks.value))
  localStorage.setItem('finishedTasks', JSON.stringify(finishedTasks.value))
  console.log('Unmounted')
})

onMounted(() => {
  console.log('Mounted')
  if (localStorage.getItem('openTasks')) {
    openTasks.value = JSON.parse(localStorage.getItem('openTasks')!)
  }
  if (localStorage.getItem('inProgressTasks')) {
    inProgressTasks.value = JSON.parse(localStorage.getItem('inProgressTasks')!)
  }
  if (localStorage.getItem('finishedTasks')) {
    finishedTasks.value = JSON.parse(localStorage.getItem('finishedTasks')!)
  }
})

const removeOpenTask = (id: number) => {
  openTasks.value = openTasks.value.filter((task) => task.id !== id)
}

const removeInProgressTask = (id: number) => {
  inProgressTasks.value = inProgressTasks.value.filter((task) => task.id !== id)
}

const removeFinishedTask = (id: number) => {
  finishedTasks.value = finishedTasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <div class="tasks">
    <ColumnTasks
      @addOpenTask="addTask('openTask')"
      :tasks="openTasks"
      :id="1"
      @removeTask="removeOpenTask"
    >
      Open Tasks
    </ColumnTasks>
    <ColumnTasks
      @addInProgressTask="addTask('inProgressTask')"
      :tasks="inProgressTasks"
      :id="2"
      @removeTask="removeInProgressTask"
    >
      Tasks in Progress
    </ColumnTasks>
    <ColumnTasks
      @addFinishedTask="addTask('finishedTask')"
      :tasks="finishedTasks"
      :id="3"
      @removeTask="removeFinishedTask"
    >
      Finished Tasks
    </ColumnTasks>
  </div>
  <div class="newTask" v-if="formVisible">
    <form class="taskForm" @submit="onFormSubmit" autocomplete="off">
      <label for="task-title">Task Title: </label>
      <input
        id="task-title"
        type="text"
        placeholder="Enter here:"
        v-model="taskTitle"
        autocomplete="off"
        required
      />
      <label for="task-description">Task description: </label>
      <textarea
        id="task-description"
        type="text"
        placeholder="Enter here:"
        v-model="taskDescription"
        autocomplete="off"
      ></textarea>
      <br />
      <button type="submit" @click="onFormSubmit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.tasks {
  top: 10%;
  left: 30%;

  width: 70%;
  height: 90%;

  position: absolute;

  display: flex;
  justify-content: space-evenly;

  /*background-color: var(--brand-color-light);
  border-top: 0.2rem solid var(--brand-color);
  border-left: 0.2rem solid var(--brand-color);*/

  color: var(--brand-color-dark);

  border-top-left-radius: 3rem;

  overflow: hidden;
}

.newTask {
  z-index: 10;

  top: 40%;
  left: 45%;

  position: absolute;

  background-color: var(--blue-light);

  padding: 2rem;
  border-radius: 2rem;
}
</style>
