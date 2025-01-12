import { contactUserDummyData } from '../dummy-data'
import { mockApi } from './api'

export const getContacts = async () => {
  return mockApi(contactUserDummyData)
}
