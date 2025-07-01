import { API_URL, apiEndpoints } from '../../../config/api'
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}${apiEndpoints.users}`)
    if (!response.ok) throw new Error('Error al cargar usuarios')
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}