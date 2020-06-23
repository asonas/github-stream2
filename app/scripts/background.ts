// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
import { Octokit } from "@octokit/rest"

chrome.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

setInterval(() => {
  fetchNotifications()
}, 1000 * 10 * 1)
fetchNotifications()

function updateBadgeText(count: string) {
  chrome.browserAction.setBadgeText({
    text: count
  });
}

async function fetchNotifications() {
  const octokit = new Octokit({
    baseUrl: 'https://ghe.ckpd.co/api/v3',
    userAgent: 'GitHub Stream 2',
    auth: 'b331f12a9bb24e7e731afd8db176a097524168d1'
  })
  let { data } = await octokit.request(`/notifications?t=${Number(new Date)}`);

  console.log(data.length)
  console.log(Number(new Date))
  updateBadgeText(data.length.toString())
}
