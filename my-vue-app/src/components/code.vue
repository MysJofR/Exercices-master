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
const currentContent = ref<string | null>(null);

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

  const response = await fetch("http://localhost:3000/exercice/list", requestOptions);
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
    window.location.href = '/login';
    throw new Error(data.message || "Erro ao enviar exercício");
  }
}

const handleEditorValue = async (value: string) => {
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
      console.log(data.message);
    } else {
      throw new Error(data.message || "Erro ao enviar exercício");
    }
  } catch (err) {
    console.log(err);
  }
};

const showContent = (content: string) => {
  currentContent.value = content;
};

const selectDropdownItem = (item: string) => {
  selectedDropdownItem.value = item;
  console.log(selectedDropdownItem.value);
};

const handleExerciceSelect = (exercice: any) => {
  exerciceSelected.value = exercice;
  console.log(exerciceSelected.value);
};

// On mounted
onMounted(async () => {
  await getUser();
  await getExercices();
});
</script>

<template>
  <div class="h-screen flex flex-col">
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
                  <h2 class="h-full w-full">{{ item.statement }}</h2>
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
            <p id="result"></p>
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
