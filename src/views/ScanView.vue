<script lang="ts" setup>
import { onMounted, ref } from "vue"
import QrScanner from "../components/QrScanner.vue"
import iScan from "../assets/icons/line-scan.svg"
import UModal from "../components/UModal.vue"
import { getAll } from "../services/eventService"

import {
  getClientByQRService,
  confirmAssistanceService,
} from "../services/clientService"
import { QrSearchResponse } from "../types/qrsearch.response"

const isOpenModal = ref(false)
const loading = ref(false)
const notFounded = ref(false)
const eventId = ref<Number>(0)
const qrEncrypted = ref<String>("")
const findClient = ref<QrSearchResponse>()
const moodScan = ref(false)
const eventList = ref()

const closeSaleOptionsModal = () => {
  isOpenModal.value = false
}
const openSaleOptionsModal = async ($event: any) => {
  qrEncrypted.value = $event
  loading.value = true
  moodScan.value = false
  isOpenModal.value = true
  const response = await getClientByQRService($event, eventId.value)
  loading.value = false
  notFounded.value = response.status === 404 ? true : false
  findClient.value = response
}
const confirmAssistence = async () => {
  loading.value = true
  await confirmAssistanceService(qrEncrypted.value)
  closeSaleOptionsModal()
  loading.value = false
}

onMounted(async () => {
  const response = await getAll()
  eventList.value = response
})
</script>
<template>
  <div class="flex bg-black h-screen py-10 px-10 items-center">
    <template v-if="eventId !== 0">
      <div class="flex flex-col w-full justify-center text-white">
        <h1 class="text-center uppercase font-semibold mb-5">
          Escanear Ingreso
        </h1>
        <template v-if="moodScan">
          <QrScanner @onScan="openSaleOptionsModal" />
        </template>
        <template v-else>
          <img class="text-center max-w-none" :src="iScan" />
        </template>
        <button
          v-if="!moodScan"
          class="mx-auto px-5 py-2 mt-5 text-white rounded-lg bg-primary-violet-100 w-2/4"
          @click="moodScan = !moodScan"
        >
          Escanear
        </button>
      </div>
    </template>
    <template v-else>
      <div class="w-full flex flex-col justify-center gap-5">
        <label for="" class="text-center w-full text-white"
          >Seleccione el Evento</label
        >
        <select
          class="block w-full p-4 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
          v-model="eventId"
        >
          <option value="0" selected disabled>Seleccione ...</option>
          <option
            v-for="(event, index) in eventList"
            :key="index"
            :value="event.id"
          >
            {{ event.name }} - {{ event.dateEvent }}
          </option>
        </select>
      </div>
    </template>
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
              @click="confirmAssistence"
              type="button"
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
