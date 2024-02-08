<script setup lang="ts">
import { onMounted, ref } from "vue"
import QrGenerate from "../components/QrGenerate.vue"
import iTrash from "../assets/icons/trash-white.svg"
import iSearch from "../assets/icons/search-gray.svg"
import iPlus from "../assets/icons/plus-white.svg"
import UModal from "../components/UModal.vue"
import { required, helpers, minLength } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import { formatDate, onlyText } from "../utils/regInputs"
import { createEvent, getAll } from "../services/eventService"
import { getClientsByEventIdService } from "../services/clientService"
import { EventRequest } from "../types/event.request"
import { ClientResponse } from "../types/client.response"

let clientList = ref<ClientResponse[] | []>([])

let filteredList = ref<ClientResponse[] | []>([])
let eventList = ref()
let clientSelect = ref()
let eventSelected = ref<Number>(0)

const regexDate = helpers.regex(formatDate())
const regexText = helpers.regex(onlyText())

const formEvent = ref<EventRequest>({
  name: "",
  dateEvent: "",
})

const rules = {
  name: {
    required,
    minLength: minLength(3),
    regexText,
    $autoDirty: true,
  },
  dateEvent: {
    required,
    regexDate,
    $autoDirty: true,
  },
}

const v$ = useVuelidate(rules, formEvent)

const handleOnInput = ($event: any) => {
  const searchValue = $event.target.value.toLowerCase()
  filteredList.value = clientList.value.filter((i: ClientResponse) =>
    i.name.toLowerCase().includes(searchValue)
  )
}

const isOpenSaleOptionsModal = ref(false)
const isOpenEventModal = ref(false)
const isOpenClientModal = ref(false)

const openSaleOptionsModal = (client: any) => {
  isOpenSaleOptionsModal.value = true
  clientSelect.value = client
}

const closeSaleOptionsModal = () => {
  isOpenSaleOptionsModal.value = false
}

const deleteClientList = () => {
  closeSaleOptionsModal()
}

const closeEventModal = () => {
  isOpenEventModal.value = false
}

const openEventModal = () => {
  isOpenEventModal.value = true
}

const closeClientModal = () => {
  isOpenClientModal.value = false
}

const openClientModal = () => {
  isOpenClientModal.value = true
}

const submitEvent = async () => {
  await createEvent(formEvent.value)
  closeEventModal()
  formEvent.value = {
    name: "",
    dateEvent: "",
  }
}

const getClients = async () => {
  const clients = await getClientsByEventIdService(eventSelected.value)
  filteredList.value = clients
  clientList.value = clients
}

onMounted(async () => {
  const response = await getAll()
  eventList.value = response
})
</script>
<template>
  <!-- <div class="w-3/4 lg:w-1/4 mx-2 my-2"> -->
  <div class="flex w-full mx-2 my-2 justify-between items-center">
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <img :src="iSearch" alt="" />
      </div>
      <input
        type="search"
        :oninput="handleOnInput"
        id="default-search"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500"
        placeholder="Escribe aquí..."
        required
      />
    </div>
    <div class="flex gap-2 pr-3">
      <select
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
        @change="getClients"
        v-model="eventSelected"
      >
        <option selected disabled>Seleccione ...</option>
        <option
          v-for="(event, index) in eventList"
          :key="index"
          :value="event.id"
        >
          {{ event.name }}
        </option>
      </select>
      <button
        @click="openEventModal"
        class="flex items-center gap-2 bg-primary-violet-100 text-white py-3 px-5 rounded-xl"
      >
        <img :src="iPlus" />

        <span class="text-sm">Evento</span>
      </button>
      <button
        @click="openClientModal"
        class="flex items-center gap-2 bg-primary-violet-100 text-white py-3 px-5 rounded-xl"
      >
        <img :src="iPlus" />

        <span class="text-sm">Asistente</span>
      </button>
    </div>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right">
      <thead class="text-xs text-gray-300 uppercase bg-gray-700 text-center">
        <tr>
          <th scope="col" class="px-1 py-3">N°</th>
          <th scope="col" class="px-6 py-3">Asistente</th>
          <th scope="col" class="px-6 py-3">Estado</th>
          <th scope="col" class="px-6 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody class="text-xs xl:text-sm">
        <template
          v-if="filteredList.length > 0"
          v-for="(row, index) in filteredList"
          :key="row.id"
        >
          <tr class="bg-white border-b border-gray-700">
            <td class="text-center font-semibold">{{ index + 1 }}</td>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ row.name }}
            </th>
            <td
              :class="`px-6 py-4 text-center ${
                row.status ? 'text-white' : 'text-white'
              }`"
            >
              <span
                :class="` py-1 px-4 rounded-full  ${
                  row.status ? 'bg-primary-violet-100' : 'bg-gray-600'
                }`"
                >{{ row.status ? "Inválido" : "Válido" }}</span
              >
            </td>
            <td class="px-6 py-4">
              <div class="flex">
                <QrGenerate :id="row.qrEncrypted" :name="row.name" />
                <button
                  class="bg-primary-red-300 p-3"
                  @click="openSaleOptionsModal(row)"
                >
                  <img class="max-w-none" :src="iTrash" />
                </button>
              </div>
            </td>
          </tr>
        </template>

        <template v-else>
          <tr class="bg-white border-b border-gray-700">
            <td
              colspan="5"
              class="py-4 px-4 rounded-full text-center text-gray-700"
            >
              No se encontraron resultados
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <UModal
    :model-value="isOpenSaleOptionsModal"
    @on-close="closeSaleOptionsModal"
    @update:model-value="closeSaleOptionsModal"
    title="¿Estas Seguro?"
  >
    <template v-slot:main>
      <span class="text-center text-sm"
        >Se eliminará al cliente definitivamente de la lista</span
      >
      <div class="flex gap-4 justify-center">
        <button
          class="px-5 py-2 text-white rounded-lg bg-primary-gray-300"
          @click="closeSaleOptionsModal"
        >
          Cancelar
        </button>
        <button
          class="px-5 py-2 text-white rounded-lg bg-primary-violet-100"
          @click="deleteClientList"
        >
          Confirmar
        </button>
      </div>
    </template>
  </UModal>
  <UModal
    :model-value="isOpenEventModal"
    @on-close="closeEventModal"
    @update:model-value="closeEventModal"
    title="Crear Evento"
  >
    <template v-slot:main>
      <form @submit.prevent="submitEvent">
        <div class="mb-5">
          <label for="eventInput" class="text-sm ml-1 text-gray-500"
            >Evento :
          </label>
          <input
            id="eventInput"
            type="text"
            v-model="formEvent.name"
            :class="`block w-full p-4 ps-10 text-sm text-gray-900 border  rounded-lg bg-gray-50 focus:ring-black focus:border-black ${
              v$.name.$error ? 'border-red-600' : 'border-gray-300'
            }`"
            placeholder="Nombre del evento"
          />
        </div>
        <div class="">
          <label for="eventInput" class="text-sm ml-1 text-gray-500"
            >Fecha :
          </label>
          <input
            type="date"
            v-model="formEvent.dateEvent"
            :class="`block w-full p-4 ps-10 text-sm text-gray-900 border  rounded-lg bg-gray-50 focus:ring-black focus:border-black ${
              v$.dateEvent.$error ? 'border-red-600' : 'border-gray-300'
            }`"
          />
        </div>
        <div class="flex gap-5 justify-around mt-5">
          <button
            type="button"
            @click="closeEventModal"
            class="w-full px-5 py-2 text-white rounded-lg bg-primary-gray-300"
          >
            Cancelar
          </button>
          <button
            :disabled="v$.$invalid"
            class="w-full px-5 py-2 text-white rounded-lg bg-primary-violet-100 disabled:bg-opacity-50"
          >
            Crear
          </button>
        </div>
      </form>
    </template>
  </UModal>

  <UModal
    :model-value="isOpenClientModal"
    @on-close="closeClientModal"
    @update:model-value="closeClientModal"
    title="Agregar Asistente"
  >
    <template v-slot:main>
      <form action="">
        <div class="mb-5">
          <label for="docInput" class="text-sm ml-1 text-gray-500"
            >Nro Documento :
          </label>
          <input
            id="docInput"
            type="text"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
            placeholder="Nombre del evento"
          />
        </div>
        <div class="mb-5">
          <label for="docFullName" class="text-sm ml-1 text-gray-500"
            >Nombres:
          </label>
          <input
            id="docFullName"
            type="text"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
            placeholder="Nombre del evento"
          />
        </div>
        <!-- <div class="">
          <label for="eventInput" class="text-sm ml-1 text-gray-500"
            >Evento :
          </label>
          <select
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
          >
            <option selected disabled>Seleccione ...</option>
            <option value="US">United States</option>
          </select>
        </div> -->
        <div class="flex gap-5 justify-around mt-5">
          <button
            type="button"
            @click="closeClientModal"
            class="w-full px-5 py-2 text-white rounded-lg bg-primary-gray-300"
          >
            Cancelar
          </button>
          <button
            class="w-full px-5 py-2 text-white rounded-lg bg-primary-violet-100"
          >
            Crear
          </button>
        </div>
      </form>
    </template>
  </UModal>
</template>
