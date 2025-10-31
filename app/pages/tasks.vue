<script setup lang="ts">
const taskStore = useTask()
const router = useRouter()

const { tasks, editTaskDialog, currentTaskToEdit} = taskStore

let form = ref({
  title: "",
  notes: ""
})

function deleteTask(id: string) {
  taskStore.deleteTask(id)
}

let loading = ref<boolean>(false)

function editTask(_id: string){
    loading.value = true
    taskStore.openEditDialog(_id)
    loading.value = false
}

function clearForm() {
  form.value.title = ""
  form.value.notes = ""
}



function addTask() {
  let toSend = {
    title: form.value.title,
    notes: form.value.notes,
    // id: Date.now()
  }

  taskStore.addTask(toSend)

  clearForm()
}

await taskStore.getAllTasks();
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="router.push('/')" prepend-icon="mdi-chevron-left">назад</v-btn>
      </v-col>

      <v-col cols="12">
        <v-text-field v-model="form.title" label="Название задачи" variant="outlined"></v-text-field>
        <v-textarea v-model="form.notes" label="Заметки к задаче" variant="outlined"></v-textarea>

        <v-btn @click="addTask">добавить</v-btn>

        
      </v-col>

      <v-col cols="4" md="6" lg="4" v-for="task of tasks" :key="task._id">
        <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask" />
      </v-col>
    </v-row>

    <v-dialog v-model="editTaskDialog">
        <v-card v-if="currentTaskToEdit">
            <v-text-field v-model="currentTaskToEdit.title" label="Название задачи" variant="outlined"></v-text-field>
            <v-textarea v-model="currentTaskToEdit.notes" label="Заметки к задаче" variant="outlined"></v-textarea>

            <v-btn color="primary" @click="taskStore.editTask()">отправить</v-btn>
            <v-btn variant="text" @click="taskStore.closeEditDialog()">отмена</v-btn>
            <!-- РЕАЛИЗОВАТЬ ОПЕРАЦИЮ ОТПРАВЛЕНИЯ
             в useTask  -->
        </v-card>
    </v-dialog>
  </v-container>
</template>