import { API_URL, apiEndpoints } from '../../../config/api'

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}${apiEndpoints.posts}`)
    if (!response.ok) throw new Error('Error al cargar usuarios')
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}