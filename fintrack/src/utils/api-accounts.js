import accounData from '../data/accounts.json'

export async function getAccounts(query) {


    await fakeNetwork(query)
    // complete

    return accounData.accounts

}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {}

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {}
  }

  if (fakeCache[key]) {
    return
  }

  fakeCache[key] = true
  return new Promise(res => {
    setTimeout(res, Math.random() * 800)
  })
}