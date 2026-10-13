const BASE_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

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