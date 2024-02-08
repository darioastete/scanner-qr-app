<script lang="ts" setup>
import { ref } from "vue"
import QrScanner from "../components/QrScanner.vue"
import iScan from "../assets/icons/line-scan.svg"
import UModal from "../components/UModal.vue"
import { getClientByQRService } from "../services/clientService"
import { QrSearchResponse } from "../types/qrsearch.response"

const isOpenModal = ref(false)
const loading = ref(false)
const notFounded = ref(false)
const eventId = ref<Number>(18)
const findClient = ref<QrSearchResponse>()
let moodScan = ref(false)
const closeSaleOptionsModal = () => {
  isOpenModal.value = false
}
const openSaleOptionsModal = async ($event: any) => {
  console.log("esto obtinene del evento", $event)
  loading.value = true
  moodScan.value = false
  isOpenModal.value = true
  const response = await getClientByQRService($event, eventId.value)
  loading.value = false
  notFounded.value = response.status === 404 ? true : false
  findClient.value = response
  console.log(response)
}
</script>
<template>
  <div class="flex bg-black h-screen text-white py-10 px-10 items-center">
    <div class="flex flex-col w-full justify-center">
      <h1 class="text-center uppercase font-semibold mb-5">Escanear Ingreso</h1>
      <template v-if="moodScan">
        <QrScanner @onScan="openSaleOptionsModal" />
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

  <UModal
    :hasMobileMode="false"
    :model-value="isOpenModal"
    @on-close="closeSaleOptionsModal"
    @update:model-value="closeSaleOptionsModal"
    :title="!loading ? (notFounded ? 'Aviso' : 'Registrar Ingreso') : ''"
  >
    <template v-slot:main>
      <template v-if="!loading">
        <template v-if="notFounded">
          <h2 class="text-center">{{ findClient?.message }}</h2>
          <button
            type="button"
            @click="closeSaleOptionsModal"
            class="w-full px-5 py-2 text-white rounded-lg bg-primary-violet-100"
          >
            Aceptar
          </button>
        </template>
        <template v-else>
          <div class="flex flex-col gap-3 justify-around">
            <div class="flex flex-col text-center">
              <span class="text-sm text-gray-700">Cliente:</span>
              <span class="uppercase">
                {{ findClient?.body.client.name }}
              </span>
            </div>
            <div class="flex flex-col text-center">
              <span class="text-sm text-gray-700">Documento:</span>
              <span>
                {{ findClient?.body.client.numberDocument }}
              </span>
            </div>
          </div>
          <div class="flex gap-5 justify-around mt-5">
            <button
              type="button"
              @click="closeSaleOptionsModal"
              class="w-full px-5 py-2 text-white rounded-lg bg-primary-gray-300"
            >
              Cancelar
            </button>
            <button
              class="w-full px-5 py-2 text-white rounded-lg bg-primary-violet-100 disabled:bg-opacity-50"
            >
              Confirmar
            </button>
          </div>
        </template>
      </template>
      <template v-else> <h2 class="text-center">Cargando...</h2></template>
    </template>
  </UModal>
</template>
