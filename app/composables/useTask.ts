import type { Task } from "~/types/task.interface"

export function useTask() {
  let tasks = useState<Task[]>("tasks", () => [])

  let currentTaskToEdit = useState<Task | undefined>("currentTaskToEdit", () => undefined)
  let editTaskDialog = useState<boolean>("editTaskDialog", () => false)

  async function addTask(params: Pick<Task, 'title' | 'notes'>) {
    try {
      const response = await $fetch<Task>('http://localhost:5000/tasks/add-task', {
        method: 'POST',
        body: params
      })
      tasks.value.push(response)
    } catch (error) {
      console.log('useTask/addTask error', error)
    }
  }

  async function deleteTask(_id: string){
    try{
        let res = await $fetch<boolean>('http://localhost:5000/tasks/delete-task', {
        method: "DELETE",
        body: { _id }
    })

    if (res){
        for (let i = 0; i < tasks.value.length; i++) {
            if (tasks.value[i]?._id == _id) {
                tasks.value.splice(i, 1);
                break;
        }
        }
    }
    }
    catch (error){
        console.log(error)
    }
  }

  async function editTask() {
    if (!currentTaskToEdit.value) return
    try {
      const updated = await $fetch<Task>("http://localhost:5000/tasks/edit-task", {
        method: "PATCH",
        body: {
          _id: currentTaskToEdit.value._id,
          title: currentTaskToEdit.value.title,
          notes: currentTaskToEdit.value.notes
        }
      })
      const idx = tasks.value.findIndex(t => t._id === updated._id)
      if (idx !== -1) tasks.value[idx] = updated
      closeEditDialog()
    } catch (error) {
      console.log("useTask/editTask error", error)
    }
  }

  async function getAllTasks() {
    try {
      let response = await $fetch<Task[]>("http://localhost:5000/tasks/get-all", { method: "GET" })

      tasks.value = response
    } catch (error) {
      console.log("useTask/getAllTasks error", error);
    }
  }

  function openEditDialog(_id: string){
    for (let i = 0; i < tasks.value.length; i++) {
            if (tasks.value[i]?._id == _id) {
                currentTaskToEdit.value = tasks.value[i];
                editTaskDialog.value = true;
                return;
        }
    }
  }

  function closeEditDialog() {
    editTaskDialog.value = false
    currentTaskToEdit.value = undefined
  }

  return {
    // variables
    tasks, currentTaskToEdit, editTaskDialog,
    // functions
    addTask, deleteTask, getAllTasks, editTask, openEditDialog, closeEditDialog
  }
}