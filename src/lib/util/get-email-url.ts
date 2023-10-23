export const getBaseURL = () => {
  return  process.env.NODE_ENV != "development"
  ? "https://emaileditor.knowankit.com"
  : "http://localhost:3000"
}
