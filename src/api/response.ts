import axios from "@/api/axios-helper";


export const getResponses = async ( surveyId: string, access_token?: string) => {
  const Url = `surveys/${surveyId}/response`

  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.get(Url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const getAllResponses = async ( page: number, per_page: number, access_token?: string) => {
  const Url = `responses`

  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.get(Url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}

