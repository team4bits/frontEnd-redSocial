const getUsersNickNames = async () => {
  const response = await fetch('../MOCK_DATA.json')
  const data = await response.json()
  const usuarios = data.map(user => user.nickName)
  return usuarios
}

export default getUsersNickNames;