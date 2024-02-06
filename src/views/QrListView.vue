<script setup lang="ts">
import QrGenerate from "../components/QrGenerate.vue"
const data = [
  { id: "1", fullName: "Ana", doc: "1234567", status: true },
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
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right">
      <thead class="text-xs text-gray-300 uppercase bg-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3">Asistente</th>
          <th scope="col" class="px-6 py-3">Estado</th>
          <th scope="col" class="px-6 py-3">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in data" :key="row.id">
          <tr class="bg-white border-b border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ row.fullName }}
            </th>
            <td
              :class="`px-6 py-4 font-semibold ${
                row.status ? 'text-white' : 'text-white'
              }`"
            >
              <span
                :class="` py-1 px-4 rounded-full ${
                  row.status ? 'bg-green-600' : 'bg-gray-600'
                }`"
                >{{ row.status ? "Usado" : "Pendiente" }}</span
              >
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-4">
                <QrGenerate :full-name="row.fullName" />
                <button class="bg-blue-950 p-3 text-white">Eliminar</button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
