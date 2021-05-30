import { get } from 'axios'

const HOST = process.env.VUE_APP_API_HOST
const BASE_URL = `${HOST}/reports`

function getAccountReport(account, access_token) {
  const URL = `${BASE_URL}/${account}/`
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
  return get(URL, config)
}

export { getAccountReport }