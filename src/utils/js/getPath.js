export function getPathAtPos(level) {
  return window.location.pathname.split('/')[level]
}

export function getPathLength() {
  return window.location.pathname.split('/').length
}

export function getPathWithoutWorkspace() {
  const pathArray = window.location.pathname.split('/')
  pathArray.shift()
  pathArray.shift()
  return pathArray.join('/')
}
