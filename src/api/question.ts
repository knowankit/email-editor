import axios from "@/api/axios-helper";

interface IAddQuestion {
  content: string
  question_type: string
  surveyId: string
}

export const addQuestion = async ({ content, question_type, surveyId }: IAddQuestion) => {
  const Url = `/surveys/${surveyId}/questions`

  const response = await axios.post(Url, {
      content,
      question_type
  }, {
    headers: {
    'Authorization': `Bearer ${window?.localStorage.getItem('token')}`
    }
  })

  return response
}
