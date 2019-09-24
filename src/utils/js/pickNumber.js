export default function (str) {
  return str.match(/[0-9][0-9.]*[0-9]/, '')[0]
}