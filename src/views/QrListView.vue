<script setup lang="ts">
import { ref } from "vue"
import QrGenerate from "../components/QrGenerate.vue"
import iTrash from "../assets/icons/trash-white.svg"
import iSearch from "../assets/icons/search-gray.svg"
import UModal from "../components/UModal.vue"
const clientList = [
  { id: "1", fullName: "Raleway", doc: "1234567", status: true },
  { id: "12", fullName: "Juan", doc: "12345267", status: true },
  { id: "13", fullName: "María", doc: "12345267", status: false },
  { id: "14", fullName: "Carlos", doc: "12345267", status: false },
  { id: "15", fullName: "Laura", doc: "12345673", status: false },
  { id: "16", fullName: "Pedro", doc: "123456723", status: true },
  { id: "17", fullName: "Isabel", doc: "1234567232", status: false },
  { id: "18", fullName: "Sergio", doc: "123456237", status: false },
  { id: "19", fullName: "Elena", doc: "1234567222", status: false },
  { id: "10", fullName: "Miguel", doc: "1234567111", status: false },
]

let filteredList = ref(clientList)
let clientSelect = ref()

const handleOnInput = ($event: any) => {
  const searchValue = $event.target.value.toLowerCase()
  filteredList.value = clientList.filter((i: any) =>
    i.fullName.toLowerCase().includes(searchValue)
  )
}

const isOpenSaleOptionsModal = ref(false)

const openSaleOptionsModal = (client: any) => {
  isOpenSaleOptionsModal.value = true
  clientSelect.value = client
}

const closeSaleOptionsModal = () => {
  isOpenSaleOptionsModal.value = false
}

const deleteClientList = () => {
  console.log("se elimino", clientSelect.value.doc)
  closeSaleOptionsModal()
}
</script>
<template>
  <div class="w-3/4 lg:w-1/4 mx-2 my-2">
    <form>
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
    </form>
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
              {{ row.fullName }}
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
                <QrGenerate :full-name="row.fullName" />
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
</template>
