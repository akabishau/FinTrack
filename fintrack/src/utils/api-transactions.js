import transData from '../data/transactions.json'

export async function getTransactions(accountId) {
    await fakeNetwork(accountId)

    let transactions = transData.transactions
    console.log('data', transactions)


    console.log('accountId', accountId)
    if (accountId) {
        transactions = transactions.filter((transaction) => transaction.account._id === accountId)
    }
    return transactions
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