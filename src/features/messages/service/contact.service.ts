import { IContactUser } from '../types'
import { getContacts } from '@/dev/api'

class ContactService {
  async getContacts(): Promise<IContactUser[]> {
    const response = await getContacts()
    return response
  }

  async getSearchResult() {
    return []
  }
}

const contactService = new ContactService()

export default contactService
