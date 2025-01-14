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

  if (goal && goal !== '') {
    filteredSessions = filteredSessions.filter((session) => session.goal.includes(goal))
  }

  if (query && query !== '') {
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
  console.log('limit, offest, goal, booked, query', limit, offset, goal, booked, query)

  let filteredSessions = sessionsDummyData
  console.log('filtered sessions', filteredSessions.length)

  if (goal && goal !== '') {
    filteredSessions = filteredSessions.filter(
      (session) => session.goal === goal
    )
  }
  console.log('goal filtered sessions', filteredSessions.length)

  if (query && query !== '') {
    filteredSessions = filteredSessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query.toLowerCase()) ||
        session.description.toLowerCase().includes(query.toLowerCase())
    )
  }
  console.log('query filtered sessions', filteredSessions.length)

  const paginatedSessions = filteredSessions.slice(offset, offset + limit)
  console.log('paginated filtered sessions', filteredSessions.length)

  return mockApi<GetTotalSessionCountResponseDTO>(
    {
      message: 'Session Total Count fetched successfully',
      totalSessionCount: paginatedSessions.length
    },
    500
  )
}
