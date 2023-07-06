export async function getAccount(accountId, token) {

  const fetchOptions = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  }


  const response = await fetch(`/api/v1/accounts/${accountId}`, fetchOptions)
  if (response.status === 200) {
    const account = await response.json()
    return account
  } else {
    console.log('ErrorGetAccount', response.status)
    return null
  }
}


export async function getAccounts(token) {
  const fetchOptions = {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  }

  console.log('fetchOptions', fetchOptions)

  const response = await fetch('/api/v1/accounts/', fetchOptions)
  if (response.status === 200) {
    const { accounts } = await response.json()
    return accounts
  } else {
    console.log('ErrorGetAccount', response.status)
    return null
  }
}