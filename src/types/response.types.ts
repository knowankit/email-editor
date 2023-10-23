export interface Response {
  id: string
  name: string
  created_at: string
  survey_details: {
    permalink: string
    name: string
  }
  is_published: boolean
  user_id: string
  survey_id: string
  username: string
}
