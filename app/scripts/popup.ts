// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import client from './client';

window.addEventListener('DOMContentLoaded', () =>{
  const button = document.querySelector("#next-button");
  const anchor = document.querySelector("#url");

  openNotification()

  button!.addEventListener('click', () =>{
    openNotification();
  })
  anchor!.addEventListener('click', () => {
    openNotification();
  })
})

async function openNotification() {
  let notifications: Array<any> = JSON.parse(<string>localStorage.getItem('notifications'));
  let notification = notifications.pop();

  await renderNotification(notification);

  let url = (<HTMLAnchorElement>document.querySelector("#url")).dataset.url;
  chrome.tabs.query({ "active": true }, (tab) => {
    let tabId = <number>tab[0].id;
    chrome.tabs.update(tabId, { url: url }, () => {
    });
  });

  localStorage.setItem("notifications", JSON.stringify(notifications));
  chrome.browserAction.setBadgeText({
    text: notifications.length.toString()
  });
  markAsRead(notification);
}

function markAsRead(notification: any) {
  client.activity.markThreadAsRead({
    thread_id: notification.id
  });
}

async function renderNotification(notification: any) {
  if (notification === undefined) {
    (<HTMLAnchorElement>document.querySelector("#url")).href = "#";
    (<HTMLElement>document.querySelector("#subject")).innerText = "Well Done!";
  } else {
    let subject: string = "[" + notification.repository.full_name + "] " + notification.subject.title;
    let { data } = await client.request(notification.subject.url);
    (<HTMLAnchorElement>document.querySelector("#url")).dataset.url = data.html_url;
    (<HTMLElement>document.querySelector("#subject")).innerText = subject;
    (<HTMLElement>document.querySelector(".js-notification")).dataset.notificationId = notification.id;
  }
}
