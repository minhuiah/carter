<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/views/Sidebar.vue";

export default defineComponent({
  components: {
    Sidebar,
  },
});
</script>

<template>
  <div class="app">
    <div class="side">
      <div class="nav">
        <RouterLink
          :to="{ name: 'carparks' }"
          class="nav-link"
          router-link-active="nav-link-active"
          >Carparks</RouterLink
        >
        <RouterLink
          :to="{ name: 'rental' }"
          class="nav-link"
          router-link-active="nav-link-active"
          >Rental</RouterLink
        >
      </div>
      <Sidebar />
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
body {
  max-height: 100vh;
  width: 100%;
}
.side {
  display: flex;
  flex-direction: column;
  width: 400px;
  border-right: 1px solid #f0f0f0;
  height: 100%;
  min-width: 400px;
}
.nav {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}
.nav-link {
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  text-decoration: none;
  color: rgb(26, 26, 26);
  font-size: 0.9rem;
}
.router-link-active {
  font-weight: bold;
  color: #000000;
}
.app {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: flex-start;
}
</style>
