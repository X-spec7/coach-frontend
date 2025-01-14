import { GetSessionsRequestDTO, GetSessionsResponseDTO } from "@/features/sessions/types"
import { mockApi } from "./api"
import { sessionsDummyData } from "../dummy-data/sessions"

export const getSessionsMockApi = async (request: GetSessionsRequestDTO): Promise<GetSessionsResponseDTO> => {
  const { limit, offset, goal, booked, query } = request

  // Filter sessions based on the request criteria
  let filteredSessions = sessionsDummyData

  if (goal) {
    filteredSessions = filteredSessions.filter((session) => session.goal.includes(goal))
  }

  if (query) {
    filteredSessions = filteredSessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query.toLowerCase()) ||
        session.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Pagination logic
  const paginatedSessions = filteredSessions.slice(offset, offset + limit)

  return mockApi<GetSessionsResponseDTO>(
    {
      message: "Sessions fetched successfully",
      sessions: paginatedSessions
    },
    500 // Simulate a delay of 500ms
  )
}
