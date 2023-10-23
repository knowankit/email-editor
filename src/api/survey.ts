import axios from "@/api/axios-helper";

interface CreateSurvey {
  name: string
  permalink: string
}

export const createSurvey = async ({ name, permalink }: CreateSurvey) => {
    const Url = '/surveys'

    const response = await axios.post(Url, {
        name,
        permalink
    }, {
      headers: {
      'Authorization': `Bearer ${window?.localStorage.getItem('token')}`
      }
    })

    return response
}

export const getSurveys = async (access_token?: string) => {
  const Url = '/surveys'
  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.get(Url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const getSurvey = async (surveyId: string, access_token?: string) => {
  const Url = `/surveys/${surveyId}`
  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.get(Url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const getPublishedSurvey = async (surveyId: string) => {
  const Url = `/surveys/${surveyId}/published`

  const response = await axios.get(Url)

  return response
}

export const deleteSurvey = async (id: string, access_token?: string) => {
  const Url = `/surveys/${id}`
  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.delete(Url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const surveyPermalinkAvailability = async (permalink: string, access_token?: string) => {
  const Url = `/surveys/permalink_validation?permalink=${permalink}`
  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.get(Url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const publishSurvey = async (surveyId: string, access_token?: string) => {
  const Url = `/surveys/${surveyId}/publish`
  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.put(Url, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const unpublishSurvey = async (surveyId: string, access_token?: string) => {
  const Url = `/surveys/${surveyId}/unpublish`
  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.put(Url, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}

export const submitAnswers = async (surveyId: string, data: any, access_token?: string) => {
  const Url = `/surveys/${surveyId}/answers`
  const token = typeof window === 'undefined' ? access_token : window.localStorage.getItem('token')

  const response = await axios.post(Url, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response
}
