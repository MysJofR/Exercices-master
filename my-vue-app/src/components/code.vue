<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { Ref, ref, onMounted } from 'vue';
import MonacoEditor from '@/components/MonacoEditor.vue';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

// Variables
const router = useRouter();
const route = useRoute();
const mode = useColorMode();
const editorContent = ref('');
const exercicesDone = ref([]);
const exercicesPending = ref([]);
const user = ref();
const selectedDropdownItem = ref('Selecione uma opção');
const exerciceSelected: Ref<any> = ref(null);
const currentContent = ref<string | null>('console');

// Functions
async function getUser() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("token", localStorage.getItem("token") ?? '');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch("http://127.0.0.1:3000/me", requestOptions);
    const data = await response.json();

    if (response.status === 200) {
      user.value = data;
    }
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
  }
}
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const { toast } = useToast()

async function getExercices() {
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "token": localStorage.getItem("token") ?? ''
    },
    redirect: 'follow'
  };

  const response = await fetch("http://localhost:3000/exercice", requestOptions);
  const data = await response.json();

  if (response.status === 200) {
    if (data.length > 0) {
      data.forEach(e => {
        if (user.value.exercisesDone.some(obj => obj.id === e.id)) {
          exercicesDone.value.push(e);
        } else {
          exercicesPending.value.push(e);
        }
      });
    }
  } else {
  
    throw new Error(data.message || "Erro ao enviar exercício");
  }
}

const handleEditorValue = async (value: string) => {
  if(!exerciceSelected.value){
    toast({
    title: 'Você deve selecionar um exercício para enviar uma resolução.',
    
  })
  }
  editorContent.value = value;

  try {
    const response = await fetch("http://localhost:3000/exercice/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": localStorage.getItem("token") ?? ''
      },
      body: JSON.stringify({
        exerciceId: exerciceSelected.value.id,
        code: editorContent.value,
        name: user.value.id
      })
    });

    const data = await response.json();

    if (response.status === 200) {

        submitResult.value = data.message
        if(exercicesPending.value.some(obj => obj.id === exerciceSelected.value.id)){
          exercicesDone.value.push(exerciceSelected.value)
        const index =  exercicesPending.value.indexOf(exerciceSelected.value)
        exercicesPending.value.splice(index, 1);
        }
    } else {
      submitResult.value = data.message
      
    }
  } catch (err) {
    console.log(err);
  }
};
const submitResult = ref(null)
const showContent = (content: string) => {
  currentContent.value = content;
};

const selectDropdownItem = (item: string) => {
  selectedDropdownItem.value = item;
 
};

const handleExerciceSelect = (exercice: any) => {
  exerciceSelected.value = exercice;
 
  
};

// On mounted
onMounted(async () => {
  await getUser();
  await getExercices();
});
</script>

<template>
  <Toaster />
  <div class="h-screen flex flex-col">
    <div style="visibility: hidden;" class="w-full h-full justify-end items-center flex absolute "><div style="visibility: visible;" class="bg-gray-100 w-8 justify-center ">

<button @click="$router.push('/dashboard')" class="p-2 w-8 hover:bg-slate-600 bg-black ">
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
</svg>
</button>


<button @click="$router.push('/me')" class="p-2 hover:bg-slate-600 w-8 bg-black ">
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</button>

<button @click="$router.push('/help')" class="p-2 hover:bg-slate-600  w-8 bg-black ">
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877075 7.49972C0.877075 3.84204 3.84222 0.876892 7.49991 0.876892C11.1576 0.876892 14.1227 3.84204 14.1227 7.49972C14.1227 11.1574 11.1576 14.1226 7.49991 14.1226C3.84222 14.1226 0.877075 11.1574 0.877075 7.49972ZM7.49991 1.82689C4.36689 1.82689 1.82708 4.36671 1.82708 7.49972C1.82708 10.6327 4.36689 13.1726 7.49991 13.1726C10.6329 13.1726 13.1727 10.6327 13.1727 7.49972C13.1727 4.36671 10.6329 1.82689 7.49991 1.82689ZM8.24993 10.5C8.24993 10.9142 7.91414 11.25 7.49993 11.25C7.08571 11.25 6.74993 10.9142 6.74993 10.5C6.74993 10.0858 7.08571 9.75 7.49993 9.75C7.91414 9.75 8.24993 10.0858 8.24993 10.5ZM6.05003 6.25C6.05003 5.57211 6.63511 4.925 7.50003 4.925C8.36496 4.925 8.95003 5.57211 8.95003 6.25C8.95003 6.74118 8.68002 6.99212 8.21447 7.27494C8.16251 7.30651 8.10258 7.34131 8.03847 7.37854L8.03841 7.37858C7.85521 7.48497 7.63788 7.61119 7.47449 7.73849C7.23214 7.92732 6.95003 8.23198 6.95003 8.7C6.95004 9.00376 7.19628 9.25 7.50004 9.25C7.8024 9.25 8.04778 9.00601 8.05002 8.70417L8.05056 8.7033C8.05924 8.6896 8.08493 8.65735 8.15058 8.6062C8.25207 8.52712 8.36508 8.46163 8.51567 8.37436L8.51571 8.37433C8.59422 8.32883 8.68296 8.27741 8.78559 8.21506C9.32004 7.89038 10.05 7.35382 10.05 6.25C10.05 4.92789 8.93511 3.825 7.50003 3.825C6.06496 3.825 4.95003 4.92789 4.95003 6.25C4.95003 6.55376 5.19628 6.8 5.50003 6.8C5.80379 6.8 6.05003 6.55376 6.05003 6.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
</button>

</div></div>

    <div class="flex flex-row">
      <MonacoEditor class="p-2 w-4/6" @getValue="handleEditorValue" />
      <div style="background-color: #1e1e1e; scrollbar-color: black;" class="shadow-lg space-y-2 flex flex-col items-center max-h-[442px] p-6 sm:w-[100px] md:w-[400px] lg:w-[600px] overflow-y-auto">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button id="selectedContent" variant="outline">
              {{ selectedDropdownItem }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-full">
            <DropdownMenuItem @click="selectDropdownItem('Exercicios Concluidos')">
              Exercícios Concluídos
            </DropdownMenuItem>
            <DropdownMenuItem @click="selectDropdownItem('Exercicios Pendentes')">
              Exercícios Pendentes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div v-if="!exerciceSelected">
          <div class="flex flex-col items-center space-y-2" v-if="selectedDropdownItem === 'Exercicios Pendentes'">
            <Button @click="handleExerciceSelect(item)" v-for="(item, index) in exercicesPending" :key="index" class="border-2 w-6/6 max-h-5/6 h-5/6 text-left border-black block bg-gray-100 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black hover:text-gray-100 focus:bg-black focus:text-gray-100">
              <HoverCard>
                <HoverCardTrigger>
                  <h2 class="h-full w-full">{{ item.statement }}</h2>
                </HoverCardTrigger>
                <HoverCardContent>
                  <h2>{{ item.difficulty }}</h2>
                </HoverCardContent>
              </HoverCard>
            </Button>
          </div>

          <div class="flex flex-col items-center space-y-2" v-if="selectedDropdownItem === 'Exercicios Concluidos'">
            <Button @click="handleExerciceSelect(item)" v-for="(item, index) in exercicesDone" :key="index" class="border-2 w-6/6 max-h-5/6 h-5/6 text-left border-black block bg-gray-100 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black hover:text-gray-100 focus:bg-black focus:text-gray-100">
              <HoverCard>
                <HoverCardTrigger>
                  <h2 class="h-full w-full">{{ item.name }}</h2>
                </HoverCardTrigger>
                <HoverCardContent>
                  <h2>{{ item.createdAt }}</h2>
                </HoverCardContent>
              </HoverCard>
            </Button>
          </div>
        </div>

        <div v-else class="border-2 border-white rounded-lg h-full w-full text-center flex flex-col">
          <Button @click="handleExerciceSelect(null)" style="background-color: #1e1e1e;" class="w-1/12 h-1/6 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors text-white hover:text-black focus:text-black">X</Button>
          {{ exerciceSelected.statement }}
          {{ exerciceSelected.difficulty }}
        </div>
        
      </div>
      
    </div>
    

    <div>
      <div style="background-color: #1e1e1e;" class="border-t-2 px-2 py-2 h-full border-gray-100 flex flex-col">
        <div class="space-x-2 flex flex-row">
          <Button @click="showContent('console')" class="border-2 w-6/6 max-h-6/6 h-6/6 text-left border-black block text-black bg-gray-100 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black hover:text-gray-100 focus:bg-black focus:text-gray-100">
            Console
          </Button>
          <Button @click="showContent('debug')" class="border-2 w-6/6 max-h-6/6 h-6/6 text-left text-black border-black block bg-gray-100 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-black hover:text-gray-100 focus:bg-black focus:text-gray-100">
            Debug
          </Button>
        </div>

        <div class="mt-3 h-[107px] w-full">
          <div v-if="currentContent === 'console'">
            <h2>Resultado do Envio: </h2>
            <p >{{ submitResult }}</p>
          </div>
          <div v-if="currentContent === 'debug'">
            <h2>Conteúdo 1</h2>
            <p>Este é o conteúdo 1.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
