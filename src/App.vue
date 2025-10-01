<template>
  <v-app>
    <!-- Top Nav -->
    <NavBar />

    <!-- Page Content -->
    <v-main>
      <v-container class="mt-4 mb-10">
        <router-view />
      </v-container> 
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: "App",
  components: { NavBar, AppFooter }
}
</script>

