import { getTotalSessionCountMockApi } from "@/dev/api/session"
import { GetTotalSessionCountRequestDTO, GetTotalSessionCountResponseDTO } from "../types"

class CoachSessionService {
  getTotalMySessionCount = async (
      request: GetTotalSessionCountRequestDTO
    ): Promise<GetTotalSessionCountResponseDTO> => {
      const response = getTotalSessionCountMockApi(request)
      return response
    }
}

const coachSessionService = new CoachSessionService()

export default coachSessionService
