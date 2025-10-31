<script setup lang="ts">
// const router = useRouter();

// function goToTasks() {
//   router.push("/tasks")
// }

let response = await $fetch("http://localhost:5000/", {
  method: "get"
})

const routes = [
  {
    title: "Мои задачи",
    description: "Удаление, добавление, редактирование",
    icon: "mdi-calendar-check-outline",
    path: "/tasks"
  }
]

console.log(response);
</script>
<template>
  <v-container class="fill-height">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" md="6" lg="4" v-for="(item, index) in routes" :key="index">
        <NuxtLink :to="item.path" class="text-decoration-none">
          <v-sheet
            class="d-flex flex-column justify-center align-center pa-8"
            elevation="8"
            rounded="xl"
            border
            min-height="350"
          >
            <v-icon :icon="item.icon" color="primary" size="90" class="mb-5" />
            <h2 class="text-h4 font-weight-bold text-grey-darken-3">{{ item.title }}</h2>
            <p class="text-body-1 text-grey-darken-1 mt-3">{{ item.description }}</p>
          </v-sheet>
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>