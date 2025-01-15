import { getTotalSessionCountMockApi } from "@/dev/api/session"
import {
  CreateSessionRequestDTO,
  CreateSessionResponseDTO,
  GetMySessionsRequestDTO,
  GetMySessionsResponseDTO,
  GetTotalSessionCountRequestDTO,
  GetTotalSessionCountResponseDTO,
} from "../types"
import authorizedHttpServer from "@/shared/services/authorizedHttp"
import { JoinSessionRequestDTO, JoinSessionResponseDTO } from "../types/dto";

class CoachSessionService {
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

      return authorizedHttpServer
        .get(`/session/get/mine/count/?${params.toString()}`)
        .then((response) => {
          return response
        })
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
  
      return authorizedHttpServer
        .post(`/session/get/mine/?${params.toString()}`)
        .then((response) => {
          return response
        })
    }

  createSession = async (
    request: CreateSessionRequestDTO
  ): Promise<CreateSessionResponseDTO> => {
    return authorizedHttpServer
      .post('/session/create/', request)
      .then((response) => {
        return response
      })
  }

  joinSession = async (
    request: JoinSessionRequestDTO
  ): Promise<JoinSessionResponseDTO> => {
    return authorizedHttpServer
      .post('/join/', request)
      .then((response) => {
        return response
      })
  }

}

const coachSessionService = new CoachSessionService()

export default coachSessionService
