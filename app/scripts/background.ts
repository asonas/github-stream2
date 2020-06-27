// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import client from "./client"

setInterval(() => {
  fetchNotifications()
}, 1000 * 60 * 10)
fetchNotifications()

function updateBadgeText(count: string) {
  chrome.browserAction.setBadgeText({
    text: count
  });
}

async function fetchNotifications() {
  let { data } = await client.request(`/notifications?t=${Number(new Date)}`);

  updateBadgeText(data.length.toString())
  localStorage.setItem('notifications', JSON.stringify(data))
}

// ToDo: Error handling
// async function fetchThread() {
//   let { data } = await client.request(`/notifications/threads/347673?t=${Number(new Date)}`);
// }
