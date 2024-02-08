<script setup lang="ts">
// @ts-ignore
import vueQr from "vue-qr/src/packages/vue-qr.vue"
// import src2 from "../assets/vue.svg"
import { ref } from "vue"
import iQR from "../assets/icons/qr-white.svg"
const { id, name } = defineProps<{
  id?: string
  name?: string
}>()
const qrDownload = ref()
const qrImg64 = (dataUrl: any, _id: any) => {
  qrDownload.value = dataUrl
}

const descargarImagen = () => {
  const link = document.createElement("a")
  link.href = qrDownload.value
  link.download = name || "defaultClient" // Nombre de archivo de descarga
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
<template>
  <div class="flex flex-col">
    <!-- :logoSrc="src2" -->
    <vue-qr
      v-show="false"
      :text="id"
      :callback="qrImg64"
      :qid="'testid'"
      :size="500"
    ></vue-qr>
    <button
      @click="descargarImagen"
      class="bg-primary-violet-300 p-3 text-white"
    >
      <img :src="iQR" class="max-w-none" />
    </button>
  </div>
</template>
