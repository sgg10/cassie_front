import { get, put, patch } from 'axios'
import getFormData from '../util/objToFormData'

const HOST = process.env.VUE_APP_API_HOST
const BASE_URL = `${HOST}/users`

function userDetails (username, access_token) {
  const URL = `${BASE_URL}/${username}/`
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
  return get(URL, config)
}

function updateUser (username, data, access_token) {
  const URL = `${BASE_URL}/${username}/`
  const body = getFormData(data)
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
  return put(URL, body, config)
}

function partialUpdateUser (username, data, access_token) {
  const URL = `${BASE_URL}/${username}/`
  const body = getFormData(data)
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
  return patch(URL, body, config)
}

function userLicenses (username, access_token) {
  const URL = `${BASE_URL}/${username}/licenses/`
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
  return get(URL, config)
}

function userLicense (username, license, access_token) {
  const URL = `${BASE_URL}/${username}/licenses/${license}/`
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
  return get(URL, config)
}

function userAccounts(username, access_token){
  const URL = `${BASE_URL}/${username}/accounts/`
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
  return get(URL, config)
}

function userAccount (username, account, access_token) {
  const URL = `${BASE_URL}/${username}/accounts/${account}/`
  const config = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }
  return get(URL, config)
}

export {
  userDetails,
  updateUser,
  partialUpdateUser,
  userLicense,
  userLicenses,
  userAccounts,
  userAccount
}
