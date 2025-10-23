<script setup lang="ts">
const router = useRouter();

function goToTasks() {
  router.push("/tasks")
}

let response = await $fetch("http://localhost:5000/", {
  method: "get"
})

console.log(response);
</script>
<template>
  <v-btn @click="goToTasks">к моим задачам</v-btn>
</template>