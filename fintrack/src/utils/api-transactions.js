// how can I use AuthContext here?

export async function createTransaction(transactionData, authToken) {

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(transactionData)
  }
  // handle on a call site
  return fetch('/api/v1/transactions/', fetchOptions)
}