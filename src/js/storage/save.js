export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
  alert(key +  ': ' + localStorage.getItem(key))
}