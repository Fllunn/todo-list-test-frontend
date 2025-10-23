<script setup lang ="ts">
import type { Task } from '~/types/task.interface';

const props = defineProps<{
    task: Task
}>()

const emit = defineEmits(["delete-task", "edit-task"])

let task = props.task;

function deleteTask(){
    emit("delete-task", task._id)
}

function editTask(){
    emit("edit-task", task._id)
}

</script>
<template>
    <v-card>
        <v-card-title>
            {{ task.title }}
        </v-card-title>
        <v-card-text>
            {{ task.notes }}
        </v-card-text>

        <v-card-actions>
            <v-btn @click="deleteTask">Удалить</v-btn>
            <v-btn @click="editTask" color="info">Изменить</v-btn>
        </v-card-actions>
    </v-card>
</template>