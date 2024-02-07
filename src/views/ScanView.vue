<script lang="ts" setup>
import { ref } from "vue"
import QrScanner from "../components/QrScanner.vue"
import iScan from "../assets/icons/line-scan.svg"
let moodScan = ref(false)
</script>
<template>
  <div class="flex bg-black h-screen text-white py-10 px-10 items-center">
    <div class="flex flex-col w-full justify-center">
      <h1 class="text-center uppercase font-semibold mb-5">Escanear Ingreso</h1>
      <template v-if="moodScan">
        <QrScanner msg="Vite + Vue" />
      </template>
      <template v-else>
        <img class="text-center max-w-none" :src="iScan" />
      </template>
      <button
        class="mx-auto px-5 py-2 mt-5 text-white rounded-lg bg-primary-violet-100 w-2/4"
        @click="moodScan = !moodScan"
      >
        Escanear
      </button>
    </div>
  </div>
</template>
