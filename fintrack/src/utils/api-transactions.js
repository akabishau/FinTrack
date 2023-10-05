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
  return fetch('https://fintrackapp.onrender.com/api/v1/transactions/', fetchOptions)
}

export async function updateTransaction(id, transactionData, authToken) {
  // think about using a PUT request instead
  const fetchOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(transactionData)
  }
  // handle on a call site
  return fetch(`https://fintrackapp.onrender.com/api/v1/transactions/${id}`, fetchOptions)
}


export async function deleteTransaction(id, authToken) {
  // think about using a PUT request instead
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    }
  }
  // handle on a call site
  return fetch(`https://fintrackapp.onrender.com/api/v1/transactions/${id}`, fetchOptions)
}