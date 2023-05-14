import _parsePhoneNumber, {
  findPhoneNumbersInText as _findPhoneNumbersInText,
  AsYouType as _AsYouType,
} from 'libphonenumber-js/core'

import metadata from 'libphonenumber-js/max/metadata'

function call(func, _arguments) {
  var args = Array.prototype.slice.call(_arguments)
  args.push(metadata)
  return func.apply(this, args)
}

export default function parsePhoneNumber() {
  return call(_parsePhoneNumber, arguments)
}

export function findPhoneNumbersInText() {
  return call(_findPhoneNumbersInText, arguments)
}

export function AsYouType(country) {
  return _AsYouType.call(this, country, metadata)
}
AsYouType.prototype = Object.create(_AsYouType.prototype, {})
AsYouType.prototype.constructor = AsYouType
