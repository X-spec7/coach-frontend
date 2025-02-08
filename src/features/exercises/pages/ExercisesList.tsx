import { IExercise } from '@/shared/types'

interface IExercisesListProps {
  exercises: IExercise[]
  onExerciseSelected: (exerciseId: number) => void
}

const ExercisesList: React.FC<IExercisesListProps> = ({
  exercises,
  onExerciseSelected,
}) => {
  return (
    <div className='flex flex-col gap-4 min-h-115'>
      {exercises.map((exercise, index) => (
        <div className='pb-4 border-b border-stroke' key={index}>
          {exercise.title}
        </div>
      ))}
    </div>
  )
}

export default ExercisesList
