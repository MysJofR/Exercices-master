<script setup lang="ts">
const router = useRouter()
const route = useRoute()

import { useColorMode } from '@vueuse/core'
import { onMounted } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const mode = useColorMode()

mode.value = 'dark'


</script>

<template>
 

  <div class=" h-full w-full ">
      
    
    <RouterView />
</div>

</template> 