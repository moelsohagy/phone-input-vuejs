<template>
  <div>
    <PhoneInput :phoneNumber="phoneNumber" :countryCodeName="countryCodeName" @changed="changed" />
  </div>
</template>


<script setup>
import { ref } from 'vue'
import PhoneInput from './components/PhoneInput.vue'

const phoneNumber = ref('')
const countryCodeName = ref('EG')
const countryCode = ref('')
const phoneWithCC = ref('')

const changed = (data) => {
  // console.log(data)
  // if (data.valid) {
  //   phoneNumber.value = data.phoneNumber
  //   countryCodeName.value = data.countryCodeName
  //   countryCode.value = data.countryCode
  //   phoneWithCC.value = data.phoneWithCC
  // }
  phoneNumber.value = data.phoneNumber
  countryCodeName.value = data.countryCodeName
  countryCode.value = data.countryCode
  phoneWithCC.value = data.phoneWithCC
}

// setTimeout(() => {
//   phoneNumber.value = '01141997397'
//   countryCodeName.value = 'EG'
// }, 2000)
</script>
