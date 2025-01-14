import { mockApi } from "./api"
import { sessionsDummyData, sessionsWithoutBookedDummyData } from "../dummy-data/sessions"
import {
  GetMySessionsRequestDTO,
  GetMySessionsResponseDTO,
  GetSessionsRequestDTO,
  GetSessionsResponseDTO,
  GetTotalMySessionCountRequestDTO,
  GetTotalMySessionCountResponseDTO,
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
  const { goal, booked, query } = request

  let filteredSessions = sessionsDummyData

  if (goal && goal !== '') {
    filteredSessions = filteredSessions.filter(
      (session) => session.goal === goal
    )
  }

  if (query && query !== '') {
    filteredSessions = filteredSessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query.toLowerCase()) ||
        session.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  return mockApi<GetTotalSessionCountResponseDTO>(
    {
      message: 'Session Total Count fetched successfully',
      totalSessionCount: filteredSessions.length
    },
    100
  )
}

export const getMySessionsMockApi = async (request: GetMySessionsRequestDTO): Promise<GetMySessionsResponseDTO> => {
  const { limit, offset, query } = request

  // Filter sessions based on the request criteria
  let filteredSessions = sessionsWithoutBookedDummyData

  if (query && query !== '') {
    filteredSessions = filteredSessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query.toLowerCase()) ||
        session.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Pagination logic
  const paginatedSessions = filteredSessions.slice(offset, offset + limit)

  return mockApi<GetMySessionsResponseDTO>(
    {
      message: "Sessions fetched successfully",
      sessions: paginatedSessions,
      totalCount: filteredSessions.length,
    },
    500 // Simulate a delay of 500ms
  )
}

export const getTotalMySessionCountMockApi = async (
  request: GetTotalMySessionCountRequestDTO
): Promise<GetTotalMySessionCountResponseDTO> => {
  const { query } = request

  let filteredSessions = sessionsWithoutBookedDummyData

  if (query && query !== '') {
    filteredSessions = filteredSessions.filter(
      (session) =>
        session.title.toLowerCase().includes(query.toLowerCase()) ||
        session.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  return mockApi<GetTotalSessionCountResponseDTO>(
    {
      message: 'Session Total Count fetched successfully',
      totalSessionCount: filteredSessions.length
    },
    100
  )
}

