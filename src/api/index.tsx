import axios from 'axios'
import { IHeaderProps } from 'api/interface'

export const BaseURL = process.env.NEXT_PUBLIC_API_URL

const defaultHeaders: IHeaderProps = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
  api_key: true,
  isFormData: false,
}

export const ApiGet = (type: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHttpOptions({ ...defaultHeaders, isAuth: false }))
      .then((response: any) => resolve(response.data))
      .catch((error: any) => {
        if (error?.response?.data?.error) {
          reject(error.response.data.error)
        } else {
          reject(error)
        }
      })
  })
}

export const getHttpOptions = (options = defaultHeaders) => {
  let headers: any = {}
  if (options?.isAuth) {
    if (localStorage.getItem('token')) {
      headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    }
  }
  if (options?.isJsonRequest && !options?.isFormData) {
    headers['Content-Type'] = 'application/json'
  }
  if (options?.isFormData) {
    headers['Content-Type'] = 'multipart/form-data'
  }
  if (options?.AdditionalParams) {
    headers = { ...headers, ...options.AdditionalParams }
  }
  return { headers }
}
