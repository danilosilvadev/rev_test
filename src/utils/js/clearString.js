/* eslint-disable */

import _ from 'lodash'

function text(str) {
  return _.startCase(_.toLower(str))
}

function snakeCase(str) {
  const url = _.toLower(str).replace(' ', '_')
  return url.replace('/', '_ou_')
}

function onlyLetters(str) {
  if (str) {
    const reg = str
      .replace(/[\"\'~`!@#$%^&()_={}[\]:;,.<>+\/?-]+|\d+|^\s+$/g, '')
      .replace(/\s+/gi, ' ')
    return reg
  }
  return ''
}

function onlyNumbers(str) {
  if (str) {
    const reg = str.replace(/[^0-9\.]+/g, '')
    return reg
  }
  return ''
}

export const clearString = {
  text,
  snakeCase,
  onlyLetters,
  onlyNumbers,
}
