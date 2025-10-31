// import { config } from "process"
import type { Task } from "~/types/task.interface"

export function useTask() {
  let tasks = useState<Task[]>("tasks", () => [])

  let currentTaskToEdit = useState<Task | undefined>("currentTaskToEdit", () => undefined)
  let editTaskDialog = useState<boolean>("editTaskDialog", () => false)

  async function addTask(params: Pick<Task, 'title' | 'notes'>) {
    try {
      const config = useRuntimeConfig()
      const response = await $fetch<Task>(config.public.apiUrl +  'tasks/add-task', {
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
      const config = useRuntimeConfig()
        let res = await $fetch<boolean>(config.public.apiUrl +  'tasks/delete-task', {
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
      const config = useRuntimeConfig()
      let res = await $fetch<boolean>(config.public.apiUrl +  "tasks/edit-task", {
        method: "PATCH",
        body: {
          _id: currentTaskToEdit.value._id,
          title: currentTaskToEdit.value.title,
          notes: currentTaskToEdit.value.notes
        }
      })

      if (res) {
        for (let i = 0; i < tasks.value.length; i++) {
          if (tasks.value[i]?._id == currentTaskToEdit.value._id) {
            tasks.value[i]!.title = currentTaskToEdit.value!.title
            tasks.value[i]!.notes = currentTaskToEdit.value!.notes
            break
          }
        }
        
        closeEditDialog()
      }
    } catch (error) {
      console.log("useTask/editTask error", error)
    }
  }

  async function getAllTasks() {
    try {
      const config = useRuntimeConfig()
      let response = await $fetch<Task[]>(config.public.apiUrl + "tasks/get-all", { method: "GET" })

      tasks.value = response
    } catch (error) {
      console.log("useTask/getAllTasks error", error);
    }
  }

  function openEditDialog(_id: string){
    for (let i = 0; i < tasks.value.length; i++) {
            if (tasks.value[i]?._id == _id) {
                const originalTask = tasks.value[i];
                const copy: Task = Object.assign({}, originalTask);

                currentTaskToEdit.value = copy;
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