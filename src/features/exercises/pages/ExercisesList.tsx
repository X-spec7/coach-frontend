import Image from 'next/image'

import { IExercise } from '@/shared/types'
import { EditSvg, TrashSvg } from '@/shared/components/Svg'

import {
  BACKEND_HOST_URL,
  DEFAULT_EXERCISE_ICON_URL
} from '@/shared/constants'

interface IExercisesListProps {
  exercises: IExercise[]
  handleExerciseItemEditButtonClicked: (exerciseId: number) => void
  handleExerciseItemDeleteButtonClicked: (exerciseId: number) => void
}

const ExercisesList: React.FC<IExercisesListProps> = ({
  exercises,
  handleExerciseItemDeleteButtonClicked,
  handleExerciseItemEditButtonClicked,
}) => {
  return (
    <div className='flex flex-col gap-4 min-h-115'>
      {exercises.map((exercise, index) => (
        <div className='flex items-center justify-between px-4 pb-4 border-b border-stroke' key={index}>
          <div className='flex items-center justify-start gap-4'>
            <Image
              src={exercise.exerciseIconUrl ? BACKEND_HOST_URL + exercise.exerciseIconUrl : DEFAULT_EXERCISE_ICON_URL}
              alt={`${exercise.title} icon`}
              width={40}
              height={40}
            />
            <h3 className='text-black font-semibold w-32 ml-8'>{exercise.title}</h3>
            <p className='text-sm text-gray-30 max-w-203 pl-12'>{exercise.description}</p>
          </div>

          <div className='flex items-center justify-end gap-4'>
            <button onClick={() => {
              handleExerciseItemEditButtonClicked(exercise.id)
            }}>
              <EditSvg width="25" height="25" color="#555555" />
            </button>

            <button onClick={() => {
              handleExerciseItemDeleteButtonClicked(exercise.id)
            }}>
              <TrashSvg width="25" height="25" color="#555555" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExercisesList
