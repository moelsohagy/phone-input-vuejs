<template>
  <div class="phone-input">
    <label class="phone-label">Selcet country</label>
    <div class="phone-inputs">
      <div class="dropdown-menu" :class="dropdownOpend ? 'opend' : ''" @blur="dropdownOpend = false">
        <div class="dropdown-button" @click="dropdownOpend = !dropdownOpend">
          <div class="dropdown-button-content">
            <span class="flag" v-html="selectedCountryCode.flag"></span>
            <span>{{ selectedCountryCode.callingCode }}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" class="ml-2">
            <path
              fill="#000"
              d="M8.292893.292893c.390525-.390524 1.023689-.390524 1.414214 0 .390524.390525.390524 1.023689 0 1.414214l-4 4c-.390525.390524-1.023689.390524-1.414214 0l-4-4c-.390524-.390525-.390524-1.023689 0-1.414214.390525-.390524 1.023689-.390524 1.414214 0L5 3.585786 8.292893.292893z"
            ></path>
          </svg>
        </div>
        <ul class="dropdown-content">
          <li
            class="dropdown-button-content"
            v-for="country in countries"
            :key="country.callingCode"
            @click="countryCodeNameValue = country.code"
          >
            <span class="flag" v-html="country.flag"></span>
            <span>{{ `(${country.callingCode}) ${country.name}` }}</span>
          </li>
        </ul>
      </div>
      <input type="text" v-model="phoneNumberValue" :placeholder="`Example: ${example}`" />
    </div>
    <!-- <select name="countrycode" id="countrycode" v-model="countryCodeNameValue">
      <option v-for="country in countries" :key="country.callingCode" :value="country.code">
        {{ country.name }}
      </option>
    </select> -->
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
// import parsePhoneNumber from 'libphonenumber-js'
import { getExampleNumber } from 'libphonenumber-js'
import examples from 'libphonenumber-js/mobile/examples'
import parsePhoneNumber from '../utils/helper'
import CountryList from 'country-list-with-dial-code-and-flag'
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg'

const emit = defineEmits(['changed'])

const props = defineProps({
  phoneNumber: String,
  countryCodeName: String,
})

const phoneNumberValue = ref(props.phoneNumber)
const countryCodeNameValue = ref(props.countryCodeName)
const dropdownOpend = ref(false)
const example = ref('')
// const reloadData = ref(false)

// const countries = [
//   { code: '', callingCode: '', name: 'Selcet country' },
//   { code: 'EG', callingCode: '+20', name: 'Egypt' },
//   { code: 'OM', callingCode: '+968', name: 'Oman' },
//   { code: 'MO', callingCode: '+212', name: 'Morcoo' },
//   { code: 'RU', callingCode: '+7', name: 'Russia' },
//   { code: 'US', callingCode: '+1', name: 'USA' },
// ]

const countries = CountryList.getAll().map((i) => {
  return { code: i.code, callingCode: i.dial_code, name: i.name, flag: CountryFlagSvg[i.code] }
})
// const inputChanged = () => {
//   if(reloadData.value) console.log(phoneNumber.value)
//   reloadData.value = false
//   setTimeout(() => { reloadData.value = true }, 500)
// }

// watch(phoneNumber, (newValue, oldValue) => {
//   // console.log(newValue, oldValue);
//   if(reloadData.value) console.log(phoneNumber.value)
//   reloadData.value = false
//   setTimeout(() => { reloadData.value = true }, 500)
// });

const selectedCountryCode = computed(() => {
  // return { code: i.code, callingCode: i.dial_code, name: i.name, flag: CountryFlagSvg[i.code] }
  const found = countries.find((e) => e.code == countryCodeNameValue.value)
  return found
    ? found
    : {
        code: '',
        callingCode: 'Select country',
        name: '',
        flag: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 64 64" viewBox="0 0 64 64" id="earth"><path d="M62.69,41.03C63.54,38.16,64,35.14,64,32c0-5.98-1.65-11.58-4.52-16.37c0,0,0-0.01,0-0.01c-0.01-0.02-0.02-0.03-0.03-0.05 C53.85,6.25,43.64,0,32,0C15.68,0,2.19,12.28,0.25,28.08c0,0.01,0,0.01,0,0.02C0.09,29.38,0,30.68,0,32c0,17.64,14.36,32,32,32 c14.42,0,26.65-9.6,30.63-22.74C62.66,41.19,62.68,41.11,62.69,41.03z M1.94,32c0-0.79,0.04-1.56,0.1-2.34 c3.18,1.47,7.58,2.87,13.09,4.16c0.33,0.08,0.68,0.14,1.01,0.22c0.12,3.87,0.56,7.53,1.27,10.88c-0.03-0.01-0.07-0.01-0.1-0.02 c-5.44-1.11-10.36-2.79-14.28-4.86C2.33,37.48,1.94,34.78,1.94,32z M6.05,16.86c2.93,1,7.79,2.34,11.19,3.08 c-0.73,3.71-1.13,7.77-1.13,12.06c0,0.02,0,0.03,0,0.05c-0.18-0.04-0.36-0.08-0.54-0.12c-5.76-1.34-10.22-2.8-13.3-4.32 C2.83,23.74,4.14,20.11,6.05,16.86z M61.66,27.15c-3.48,2.19-8.36,4.12-13.19,5.22c-0.19,0.04-0.4,0.07-0.59,0.11 c0-0.16,0.01-0.32,0.01-0.47c0-4.03-0.35-7.86-1-11.38c0.05-0.01,0.09-0.01,0.14-0.02c3.68-0.64,8.55-2.41,11.12-3.41 C59.87,20.22,61.08,23.58,61.66,27.15z M45.95,32c0,0.28-0.01,0.55-0.01,0.83c-4.05,0.7-8.39,1.05-12.97,1.03V21.65 c0.39,0.01,0.78,0.01,1.18,0.01c3.72,0,7.33-0.26,10.78-0.75C45.58,24.36,45.95,28.11,45.95,32z M18.05,32 c0-4.12,0.41-8.07,1.14-11.68c3.85,0.71,7.82,1.13,11.84,1.27v12.25c-4.37-0.12-8.79-0.59-12.98-1.4 C18.05,32.3,18.05,32.15,18.05,32z M32.97,19.71V2.02c5.02,0.78,9.4,7.58,11.56,16.98C40.84,19.52,36.97,19.77,32.97,19.71z  M31.03,2.02v17.62c-3.88-0.14-7.71-0.55-11.42-1.22C21.82,9.33,26.12,2.79,31.03,2.02z M18.1,34.43c4.19,0.78,8.58,1.24,12.93,1.36 v10.66c-3.92-0.11-7.76-0.49-11.48-1.14C18.76,41.96,18.25,38.28,18.1,34.43z M31.03,48.38v13.59c-4.58-0.72-8.64-6.45-10.95-14.61 C23.64,47.94,27.3,48.28,31.03,48.38z M32.97,61.98V48.43c0.13,0,0.27,0,0.4,0c3.6,0,7.1-0.23,10.44-0.68 C41.48,55.7,37.48,61.27,32.97,61.98z M32.97,46.47V35.82c0.1,0,0.19,0,0.29,0c4.44,0,8.66-0.35,12.62-1 c-0.18,3.87-0.71,7.54-1.53,10.87C40.74,46.23,36.93,46.49,32.97,46.47z M47.84,34.45c0.35-0.07,0.71-0.12,1.05-0.19 c4.7-1.06,9.45-2.9,13.04-5c0.08,0.9,0.13,1.82,0.13,2.74c0,2.87-0.41,5.65-1.17,8.28c-3.71,2.26-8.62,4.01-14.24,5.05 c-0.05,0.01-0.11,0.02-0.16,0.03C47.23,42.01,47.7,38.34,47.84,34.45z M57.12,15.51c-2.57,0.99-7.06,2.59-10.42,3.18 c-0.06,0.01-0.13,0.02-0.19,0.03c-1.6-7.22-4.47-12.95-8.08-16.08C46.2,4.34,52.87,9.06,57.12,15.51z M25.58,2.64 c-3.5,3.03-6.31,8.5-7.93,15.41c-3.17-0.69-7.65-1.91-10.54-2.87C11.36,8.89,17.93,4.31,25.58,2.64z M3.88,42.62 c3.75,1.76,8.2,3.19,13.04,4.18c0.32,0.07,0.65,0.11,0.97,0.18c1.65,6.42,4.35,11.51,7.68,14.39C15.59,59.18,7.45,52.02,3.88,42.62z M38.42,61.36c3.25-2.82,5.91-7.74,7.57-13.97c0.33-0.06,0.68-0.1,1.01-0.16c5.01-0.92,9.34-2.34,12.96-4.21 C56.31,52.23,48.26,59.21,38.42,61.36z"></path></svg>',
      }
})
watch(
  () => props.phoneNumber,
  (data) => (phoneNumberValue.value = data),
)
watch(
  () => props.countryCodeName,
  (data) => (countryCodeNameValue.value = data),
)

watch(phoneNumberValue, () => checkPhone())
watch(countryCodeNameValue, () => checkPhone())

onMounted(() => {
  if (phoneNumberValue.value || countryCodeNameValue.value) checkPhone()
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-button') && !e.target.classList.contains('dropdown-button')) {
      dropdownOpend.value = false
    }
  })
})

const checkPhone = () => {
  setExample()

  const phone = parsePhoneNumber(phoneNumberValue.value, countryCodeNameValue.value)
  if (phone && phone.isValid()) {
    emit('changed', {
      valid: true,
      phoneNumber: phoneNumberValue.value,
      countryCodeName: phone.country,
      countryCode: `+${phone.countryCallingCode}`,
      phoneWithCC: phone.number,
      type: phone.getType(),
    })
  } else {
    emit('changed', {
      valid: false,
      phoneNumber: phoneNumberValue.value,
      countryCodeName: countryCodeNameValue.value,
      countryCode: '',
      phoneWithCC: '',
      type: '',
    })
  }
}
const setExample = () => {
  if (countryCodeNameValue.value) {
    const exampleNumber = getExampleNumber(countryCodeNameValue.value, examples)
    example.value = exampleNumber.formatNational() || ''
  }
}
</script>

<style lang="scss">
$border-color: #626262;

.phone-input,
.phone-input * {
  box-sizing: border-box;
}
.phone-input {
  text-align: initial;
  /* display: felx;
  height: 30px; */
  .phone-inputs {
    display: flex;
    height: 40px;

    .dropdown-menu {
      position: relative;
      display: inline-block;
      height: 100%;
      /* width: 100%; */
      .dropdown-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 16px;
        background: var(--bg-secondary);
        padding: 6px 8px;
        border: 1px solid $border-color;
        // border-radius: 0;
        border-start-start-radius: 5px;
        border-end-start-radius: 5px;
        cursor: pointer;
        height: 100%;
      }
      .dropdown-content {
        display: none;
        position: absolute;
        background-color: var(--bg-secondary);
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 0;
        z-index: 21;
        width: 100%;
        margin-top: 8px;
        border-radius: 8px;
        width: max-content;
        height: 200px;
        overflow: auto;
        li {
          cursor: pointer;
          padding: 8px 6px 2px;
          /* border-bottom: 2px solid $border-color; */
          box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        }
      }

      .dropdown-button-content {
        display: flex;
        align-items: center;
        column-gap: 8px;
        img {
          width: 24px;
          height: auto;
          object-fit: cover;
          border-radius: 4px;
        }
      }
    }

    > input {
      height: 100%;
      margin: 0;
      padding: 0px 6px;
      border: 1px solid $border-color;
      border-start-end-radius: 5px;
      border-end-end-radius: 5px;
      outline: none;
    }
  }
}

.phone-input .flag svg {
  display: flex;
  width: 26px;
}

.phone-input .phone-inputs {
  .dropdown-menu.opend .dropdown-content {
    display: block;
  }
}
</style>
