import authorizedHttpServer from '@/shared/services/authorizedHttp'
import { GetContactsResponseDTO, SearchUserRequestDTO, SearchUserResponseDTO } from '../types'
import { propTypesOffset } from '@material-tailwind/react/types/components/menu'

class ContactService {
  getContacts = async (): Promise<GetContactsResponseDTO> => {
    return authorizedHttpServer
      .get('/chat/contact/get/')
      .then((response) => {
        return response.data as GetContactsResponseDTO
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

    return authorizedHttpServer
      .get(`/chat/users/search/?${params.toString()}`)
      .then((response) => {
        return response.data as SearchUserResponseDTO
      })
  }
}

const contactService = new ContactService()

export default contactService
