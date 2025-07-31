<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Import layout komponen
import AppLayout from './layouts/AppLayout.vue'
import BlankLayout from './layouts/BlankLayout.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  if (route.meta.layout === 'blank') return BlankLayout
  return AppLayout
})
</script>
