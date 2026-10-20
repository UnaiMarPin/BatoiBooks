const BASE_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

// ============ BOOKS ============
export const fetchBooks = async () => {
  const response = await fetch(`${BASE_URL}/books`)
  return checkResponse(response)
}

export const createBook = async (bookData) => {
  const response = await fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  })
  return checkResponse(response)
}

export const deleteBook = async (bookId) => {
  const response = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: 'DELETE'
  })
  // DELETE devuelve 200 con {} o 204 sin cuerpo. Si es 204, no hay JSON.
  if (response.status === 204) return {}
  return checkResponse(response)
}

export const updateBook = async (bookId, bookData) => {
  const response = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  })
  return checkResponse(response)
}

// ============ USERS ============
export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`)
  return checkResponse(response)
}

export const createUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return checkResponse(response)
}

export const deleteUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE'
  })
  if (response.status === 204) return {}
  return checkResponse(response)
}

export const updateUser = async (userId, userData) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return checkResponse(response)
}

// ============ MODULES ============
export const fetchModules = async () => {
  const response = await fetch(`${BASE_URL}/modules`)
  return checkResponse(response)
}