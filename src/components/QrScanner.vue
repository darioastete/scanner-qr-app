<script setup lang="ts">
import { ref } from "vue"
import { QrcodeStream } from "vue-qrcode-reader"
let errorMessage = ref()
let codeDetected = ref()

const onReady = (capabilities: any) => {
  console.log(capabilities)
}
const onDetect = (detectedCodes: any) => {
  codeDetected.value = JSON.stringify(detectedCodes[0].rawValue)
  alert(codeDetected.value)
}

const onError = (error: any) => {
  if (error.name === "NotAllowedError") {
    errorMessage.value = "user denied camera access permission"
  } else if (error.name === "NotFoundError") {
    errorMessage.value = "no suitable camera device installed"
  } else if (error.name === "NotSupportedError") {
    errorMessage.value = "page is not served over HTTPS (or localhost)"
  } else if (error.name === "NotReadableError") {
    errorMessage.value = "maybe camera is already in use"
  } else if (error.name === "OverconstrainedError") {
    errorMessage.value =
      "did you request the front camera although there is none?"
  } else if (error.name === "StreamApiNotSupportedError") {
    errorMessage.value = "browser seems to be lacking features"
  }
}

defineProps<{ msg: string }>()
</script>

<template>
  <!-- <h1>{{ msg }}</h1>
  <h1>Este es el error: {{ errorMessage }}</h1>
  <h2><strong>QR VALUE: </strong>{{ codeDetected }}</h2> -->
  <qrcode-stream
    :formats="['qr_code', 'code_128']"
    @camera-on="onReady"
    @detect="onDetect"
    @error="onError"
  ></qrcode-stream>
</template>
