import {
  GetContactsResponseDTO,
  SearchUserRequestDTO,
  SearchUserResponseDTO
} from '../types'
import axios, { AxiosInstance } from 'axios'

class ContactService {
  private httpClient: AxiosInstance
  
  constructor(httpClient?: AxiosInstance) {
    this.httpClient = httpClient || axios.create({ baseURL: 'api/chat/contact'})
  }

  getContacts = async (): Promise<GetContactsResponseDTO> => {
    return this.httpClient
      .get('')
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }

  searchUsers = async (
    request: SearchUserRequestDTO
  ): Promise<SearchUserResponseDTO> => {
    const params = new URLSearchParams()

    if (request.limit) {
      params.append('limit', request.limit.toString())
    }

    if (request.offset) {
      params.append('offset', request.offset.toString())
    } else {
      params.append('offset', '0')
    }

    if (request.query) {
      params.append('query', request.query.toString())
    }

    return this.httpClient
      .get(`/search/?${params.toString()}`)
      .then((response) => {
        return {
          status: response.status,
          ...response.data
        }
      })
  }
}

const contactService = new ContactService()

export default contactService
