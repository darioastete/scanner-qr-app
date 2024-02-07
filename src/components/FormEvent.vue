<script lang="ts" setup>
import { ref } from "vue"
import UModal from "../components/UModal.vue"

const isOpenEventModal = ref(false)

const closeEventModal = () => {
  isOpenEventModal.value = false
}
</script>
<template>
  <UModal
    :model-value="isOpenEventModal"
    @on-close="closeEventModal"
    @update:model-value="closeEventModal"
    title="Crear Evento"
  >
    <template v-slot:main>
      <form action="">
        <div class="mb-5">
          <label for="eventInput" class="text-sm ml-1 text-gray-500"
            >Evento :
          </label>
          <input
            id="eventInput"
            type="text"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
            placeholder="Nombre del evento"
          />
        </div>
        <div class="">
          <label for="eventInput" class="text-sm ml-1 text-gray-500"
            >Fecha :
          </label>
          <input
            type="date"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
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
            class="w-full px-5 py-2 text-white rounded-lg bg-primary-violet-100"
          >
            Crear
          </button>
        </div>
      </form>
    </template>
  </UModal>
</template>
