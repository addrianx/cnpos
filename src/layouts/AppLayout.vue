<!-- src/App.vue -->
<template>
    <div class="app-wrapper">
      <AppHeader />
      <AppSidebar />
      
      <main class="app-main">
        <router-view />
      </main>
      
      <AppFooter />
    </div>
 
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'
import AppFooter from '../components/AppFooter.vue'
</script>


