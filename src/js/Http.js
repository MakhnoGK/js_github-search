export default class Http {
  static async get (url, params = {}) {
    const queryParamsString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`).join('&')

    const urlWithParams = Object.keys(params).length > 0
      ? `${url}?${queryParamsString}`
      : url

    try {
      const response = await fetch(urlWithParams)
      const responseData = await response.json()
      const responseObject = new ResponseObject()

      // Check possible HTTP reponse statuses
      if (response.status === 200) {
        responseObject.data = responseData
      } else {
        responseObject.error = {
          status: response.status,
          message: responseData.message
        }
      }

      return responseObject
    } catch (error) {
      console.error(error)
    }
  }
}

export class ResponseObject {
  constructor () {
    this.data = null
    this.error = null
  }
}
