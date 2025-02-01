import { TitleWithEllipsis } from '@/shared/components'
import { IClassExercise } from '@/shared/types/exercise.type'
import {
  ArrowClockWiseSvg,
  ClockSvg,
  FireSvg
} from '@/shared/components/Svg'

interface IExerciseItemProps {
  exercise: IClassExercise
  index: number
}

const ExerciseItem: React.FC<IExerciseItemProps> = ({exercise, index}) => {
  return (
    <div className='flex items-center justify-start w-full p-4 bg-white rounded-20'>
      <div className='flex justify-center items-center w-8 h-8'>{index + 1}</div>
      <div className='flex flex-col items-start justify-start gap-2'>
        <h3 className='text-black font-medium'>{exercise.title}</h3>
        <div className='flex items-center justify-start gap-3 text-gray-20'>
          <div className='flex items-center justify-start gap-1'>
            <ArrowClockWiseSvg width='12' height='12' color='#878A94' />
            <p>{exercise.repsCount} reps &times; {exercise.setCount} sets</p>
          </div>

          <div className='flex items-center justify-start gap-1'>
            <ClockSvg width='12' height='12' color='#878A94' />
            <p>{exercise.restDuration} secs rest</p>
          </div>

          <div className='flex items-center justify-start gap-1'>
            <FireSvg width='12' height='12' color='#878A94' />
            <p>{exercise.caloriePerSet} per set</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface IExercisesProps {
  exercises?: IClassExercise[]
}

const Exercises: React.FC<IExercisesProps> = ({ exercises }) => {
  return (
    <div className='flex flex-col w-full gap-4'>
      <TitleWithEllipsis title='Exercises' />
      {exercises?.map((exercise, index) => (
        <ExerciseItem key={index} exercise={exercise} index={index} />
      ))}
    </div>
  )
}

export default Exercises
