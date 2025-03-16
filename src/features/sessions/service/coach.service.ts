import axios, { AxiosInstance } from "axios";
import {
  CreateSessionRequestDTO,
  CreateSessionResponseDTO,
  GetMySessionsRequestDTO,
  GetMySessionsResponseDTO,
  GetTotalSessionCountRequestDTO,
  GetTotalSessionCountResponseDTO,
} from "../types"
  
class CoachSessionService {
  private httpClient: AxiosInstance

  constructor(httpClient?: AxiosInstance) {
    // Proxy API base URL
    this.httpClient = httpClient || axios.create({ baseURL: 'api/sessions/coaches' })
  }

  getTotalMySessionCount = async (
    request: GetTotalSessionCountRequestDTO
  ): Promise<GetTotalSessionCountResponseDTO> => {
    const params = new URLSearchParams();

    if (request.goal) {
      params.append('goal', request.goal);
    }
    if (request.booked !== undefined) {
      params.append('booked', String(request.booked));
    }
    if (request.query) {
      params.append('query', request.query);
    }

    return this.httpClient
      .get(`/count?${params.toString()}`)
      .then((response) => ({
        status: response.status,
        ...response.data
      }))
  }

  getMySessions = async (
    request: GetMySessionsRequestDTO
  ): Promise<GetMySessionsResponseDTO> => {
    const params = new URLSearchParams();
    if (request.limit) {
      params.append('limit', request.limit.toString());
    }
    if (request.offset !== undefined) {
      params.append('offset', String(request.offset));
    }
    if (request.query) {
      params.append('query', request.query);
    }

    return this.httpClient
      .get(`/?${params.toString()}`)
      .then((response) => ({
        status: response.status,
        ...response.data
      }))
  }

  createSession = async (
    payload: CreateSessionRequestDTO
  ): Promise<CreateSessionResponseDTO> => {
    return this.httpClient
      .post('', payload)
      .then((response) => ({
        status: response.status,
        ...response.data
      }))
  }
}

const coachSessionService = new CoachSessionService()

export default coachSessionService
