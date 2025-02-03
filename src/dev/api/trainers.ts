import { trainersDummyData } from '../dummy-data/trainers'
import {
  GetTrainersPayloadDTO,
  GetTrainersResponseDTO,
  GetTotalTrainersCountPayloadDTO,
  GetTotalTrainersCountResponseDTO,
  GetTrainerByIdPayloadDTO,
  GetTrainerByIdResponseDTO
} from '@/features/trainers/types/coach.dto'

export const getTrainers = (
  { pageSize, pageNum, query, expertise }: GetTrainersPayloadDTO
): Promise<GetTrainersResponseDTO> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredData = trainersDummyData;

      if (query) {
        filteredData = filteredData.filter((trainer) =>
          trainer.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (expertise) {
        filteredData = filteredData.filter(
          (trainer) => trainer.expertise === expertise
        );
      }

      // Paginate filtered data
      const start = (pageNum - 1) * pageSize;
      const end = start + pageSize;
      const paginatedData = filteredData.slice(start, end);

      // Get total count after filtering
      const total = filteredData.length;

      resolve({
        trainers: paginatedData,
        total,
        pageNum,
        pageSize,
      })
    }, 1000)
  })
}

export const getTotalTrainersCount = (
  { query, expertise }: GetTotalTrainersCountPayloadDTO
): Promise<GetTotalTrainersCountResponseDTO> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = trainersDummyData.length
      resolve({
        totalCount: total
      })
    }, 200)
  })
}

export const getTrainerById = (
  { trainerId }: GetTrainerByIdPayloadDTO
): Promise<GetTrainerByIdResponseDTO | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const trainer = trainersDummyData.find((trainer) => trainer.id === trainerId)

      if (trainer) {
        resolve({ trainer })
      } else {
        resolve(null)
      }

    }, 500)
  })
}
