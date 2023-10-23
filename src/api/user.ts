import axios from "@/api/axios-helper";

interface ICreateUser {
  name: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

export const getCurrentUser = async (access_token?: string) => {
  const Url = '/users/me'

  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.get(Url, {
    headers: {
    'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const logoutUser = async (access_token?: string) => {
  const Url = '/users/logout'

  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.get(Url, {
    headers: {
    'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const registerUser = async (userData: ICreateUser, access_token?: string) => {
  const Url = '/users'
  const { email, username, password, name } = userData

  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.post(Url, {
    name,
    email,
    username,
    password
}, {
  headers: {
  'Authorization': `Bearer ${token}`
  }
})

return response
}
