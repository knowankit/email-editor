export interface Survey {
  name: string
  permalink: string
  id: string,
  created_at: Date
  is_published: boolean
  questions?: Question[]
}

export type Question = {
  id: string
  content: string
  question_type: string
  created_at: Date
  is_required: boolean
  question_options?: QuestionOptions[]
}

export type QuestionOptions = {

}
