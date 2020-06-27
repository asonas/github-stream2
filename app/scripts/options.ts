// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

import client from "./client"

window.addEventListener('DOMContentLoaded', () =>{
  const button = document.querySelector("button.js-submit")
  setExistsParameter()
  const apiKeyElement: HTMLInputElement = <HTMLInputElement>document.querySelector('input[name="api-key"]')
  const baseUrlElement: HTMLInputElement = <HTMLInputElement>document.querySelector('input[name="base-url"]')

  button!.addEventListener('click', () =>{
    let url = baseUrlElement.value ? baseUrlElement.value : 'https://github.com/api/v3'
    let apiKey = apiKeyElement.value

    validateParameter(url, apiKey)
    localStorage.setItem('apiKey', apiKeyElement.value)
    localStorage.setItem('baseUrl', baseUrlElement.value)
  })
})

function setExistsParameter(): void {
  let apiKeyElement: HTMLInputElement = <HTMLInputElement>document.querySelector('input[name="api-key"]')
  let baseUrl: HTMLInputElement = <HTMLInputElement>document.querySelector('input[name="base-url"]')
  apiKeyElement.value = localStorage.getItem('apiKey') ? <string>localStorage.getItem('apiKey') : ""
  baseUrl.value = localStorage.getItem('baseUrl') ? <string>localStorage.getItem('baseUrl') : ""
}

async function validateParameter(baseUrl: string, apiKey: string) {
  // ToDo: Error handling
  let { data } = await client.request(`/notifications?t=${Number(new Date)}`)
}
