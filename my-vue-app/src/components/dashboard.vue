<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useColorMode } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import sidebar from '@/components/dashboard/sideBar.vue'
import { ref } from 'vue';
import content from '@/components/dashboard/dashboardContent.vue'
const router = useRouter()
const route = useRoute()
const mode = useColorMode()


</script>

<template>
  <div class="h-screen w-full bg-gray-100 flex flex-row">
 <sidebar></sidebar>
   <content></content>
  </div>
</template>