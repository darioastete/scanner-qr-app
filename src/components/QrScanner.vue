<script setup lang="ts">
import { ref } from "vue"
import { QrcodeStream } from "vue-qrcode-reader"
let errorMessage = ref()
let codeDetected = ref()
const emit = defineEmits(["onScan"])

// const onReady = (capabilities: any) => {
// }
const onDetect = (detectedCodes: any) => {
  codeDetected.value = detectedCodes[0].rawValue
  emit("onScan", codeDetected.value)
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

// defineProps<{ msg: string }>()
</script>

<template>
  <qrcode-stream
    :formats="['qr_code', 'code_128']"
    @detect="onDetect"
    @error="onError"
  ></qrcode-stream>
</template>
<!-- @camera-on="onReady" -->
