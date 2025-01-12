import { TitleWithEllipsis } from '@/shared/components'

interface WorkoutActivity {
  xaxis: string
  label: string
  percent: number
}

const workoutActivityDummy = [
  {
    xaxis: 'Sun',
    label: '2 Hours 15 Min',
    percent: 56.5
  },
  {
    xaxis: 'Mon',
    label: '2 Hours',
    percent: 50
  },
  {
    xaxis: 'Tue',
    label: '2 Hours 30 Min',
    percent: 62.5
  },
  {
    xaxis: 'Wed',
    label: '3 Hours',
    percent: 75
  },
  {
    xaxis: 'Thu',
    label: '2 Hours 40 Min',
    percent: 65
  },
  {
    xaxis: 'Fri',
    label: '2 Hours',
    percent: 50
  },
  {
    xaxis: 'Sat',
    label: '2 Hours 35 Min',
    percent: 63
  },
]

const VerticalProgressBar: React.FC<WorkoutActivity> = ({ xaxis, label, percent }) => {
  return (
    <div className='flex w-20 flex-col justify-between gap-2 items-center h-full'>
      <div className='flex w-full flex-col justify-end gap-2 items-center flex-1 bg-gray-bg-subtle rounded-20 p-1.5'>
        <p className='text-gray-20 text-xxs2 font-medium break-words text-center'>{label}</p>
        <div
          className="bg-blue rounded-20 w-full"
          style={{ height: `${percent}%` }}
        />
      </div>
      <p className='text-gray-20 text-xxs2 font-medium'>{xaxis}</p>
    </div>
  )
}

const WorkoutActivityPanel = () => {
  return (
    <div className='flex flex-col items-center gap-4 w-full p-4 border-stroke border rounded-20'>
      <TitleWithEllipsis title='Workout Activity' />

      <div className='flex justify-between items-center w-full h-90'>
        {
          workoutActivityDummy.map((workout, index) => {
            return (
              <VerticalProgressBar
                key={index}
                xaxis={workout.xaxis}
                label={workout.label}
                percent={workout.percent}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default WorkoutActivityPanel
