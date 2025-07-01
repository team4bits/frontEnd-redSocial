const getAllUsers = async () => {
  try {
    const response = await fetch('../MOCK_DATA.json')
    if (!response.ok) throw new Error('Error al cargar usuarios')
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export default getAllUsers;