const BASE_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

// ============ BOOKS ============
export const fetchBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books`)
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}

export const createBook = async (bookData) => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData)
    })
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}

export const deleteBook = async (bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${bookId}`, {
      method: 'DELETE'
    })
    if (response.status === 204) return {}
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}

export const updateBook = async (bookId, bookData) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData)
    })
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}

// ============ USERS ============
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`)
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE'
    })
    if (response.status === 204) return {}
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}

export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}

// ============ MODULES ============
export const fetchModules = async () => {
  try {
    const response = await fetch(`${BASE_URL}/modules`)
    return await checkResponse(response)
  } catch (error) {
    throw error
  }
}