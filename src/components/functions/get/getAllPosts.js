import { API_URL, apiEndpoints } from '../../../config/api'

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}${apiEndpoints.posts}`)
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`)
    }
    
    // Verificar si hay contenido antes de parsear JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('La respuesta no es JSON válido')
      return []
    }
    
    // Obtener el texto crudo primero
    const text = await response.text()
    
    // Verificar si el texto no está vacío
    if (!text.trim()) {
      console.warn('Respuesta vacía del servidor')
      return []
    }
    
    // Parsear JSON solo si hay contenido
    return JSON.parse(text)
    
  } catch (error) {
    console.error('Error al obtener posts:', error)
    console.error('URL intentada:', `${API_URL}${apiEndpoints.posts}`)
    return []
  }
}