<script setup lang="ts">
const router = useRouter()
const route = useRoute()

import { useColorMode } from '@vueuse/core'
import { onMounted } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router';


const mode = useColorMode()

mode.value = 'dark'


</script>

<template>
 

  <div class="h-screen w-full ">
    <RouterView />
</div>

</template> 