import type { NextApiRequest, NextApiResponse } from 'next'

const mjml2html = require('mjml')

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json(mjml2html(req.body))
}



