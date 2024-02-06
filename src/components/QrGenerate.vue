<script setup lang="ts">
// @ts-ignore
import vueQr from "vue-qr/src/packages/vue-qr.vue"
import src2 from "../assets/vue.svg"
import { ref } from "vue"
const { fullName } = defineProps<{
  fullName?: string
  id?: number
  doc?: number
}>()
const qrDownload = ref()
const qrImg64 = (dataUrl: any, _id: any) => {
  qrDownload.value = dataUrl
}

const descargarImagen = () => {
  const link = document.createElement("a")
  link.href = qrDownload.value
  link.download = fullName || "defaultClient" // Nombre de archivo de descarga
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
<template>
  <div class="flex flex-col">
    <vue-qr
      v-show="false"
      :logoSrc="src2"
      :text="fullName"
      :callback="qrImg64"
      :qid="'testid'"
      :size="500"
    ></vue-qr>
    <button @click="descargarImagen" class="bg-blue-950 p-3 text-white">
      Descargar QR
    </button>
  </div>
</template>
