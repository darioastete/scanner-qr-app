const formatDate = (): RegExp => {
  return /^(?:19|20)\d\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/
}

const onlyText = (): RegExp => {
  return /^[a-zA-Z\s]+$/
}

const onlyNumber = (): RegExp => {
  return /^[0-9]+$/
}

export { formatDate, onlyText, onlyNumber }
