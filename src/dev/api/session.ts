import { mockApi } from "./api"
import { sessionsDummyData } from "../dummy-data/sessions"
import {
  GetSessionsRequestDTO,
  GetSessionsResponseDTO,
  GetTotalSessionCountRequestDTO,
  GetTotalSessionCountResponseDTO,
} from "@/features/sessions/types"

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

export const getTotalSessionCountMockApi = async (
  request: GetTotalSessionCountRequestDTO
): Promise<GetTotalSessionCountResponseDTO> => {
  const { limit, offset, goal, booked, query } = request

  let filteredSessions = sessionsDummyData

  if (goal) {
    filteredSessions = filteredSessions.filter(
      (session) => session.goal === goal
    )
  }

  if (query) {
    filteredSessions = filteredSessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query.toLowerCase()) ||
        session.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  const paginatedSessions = filteredSessions.slice(offset, offset + limit)

  return mockApi<GetTotalSessionCountResponseDTO>(
    {
      message: 'Session Total Count fetched successfully',
      totalSessionCount: paginatedSessions.length
    },
    500
  )
}
