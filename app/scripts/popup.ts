// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import client from './client'

window.addEventListener('DOMContentLoaded', () =>{
  const button = document.querySelector("#next-button")

  let notifications: Array<any> = JSON.parse(<string>localStorage.getItem('notifications'))
  renderNotification(notifications.pop())

  button!.addEventListener('click', () =>{
    renderNotification(notifications.pop());
  })
})

async function renderNotification(notification: any) {
  if (notification === undefined) {
    (<HTMLAnchorElement>document.querySelector("#url")).href = "#";
    (<HTMLElement>document.querySelector("#subject")).innerText = "Well Done!";
  } else {
    let subject: string = "[" + notification.repository.full_name + "] " + notification.subject.title;
    let { data } = await client.request(notification.subject.url);
    (<HTMLAnchorElement>document.querySelector("#url")).href = data.html_url;
    (<HTMLElement>document.querySelector("#subject")).innerText = subject;
  }
}
