import { Calendar } from '@/shared/components'
import { TimePeriodSelectButton } from '@/shared/components/Button'
import { TwoPeopleSvg, ClockSvg } from '@/shared/components/Svg'

interface ITrainerSchedule {
  date: string
  time: string
  title: string
  duration: number
  participants: number
}

interface ITrainerScheduleItemProps {
  trainerSchedule: ITrainerSchedule
}

const TrainerScheduleItem: React.FC<ITrainerScheduleItemProps> = ({ trainerSchedule }) => {
  return (
    <div className='flex justify-between items-center p-2'>
      <div className='flex justify-start items-center gap-4'>
        <div className='flex flex-col justify-center items-start gap-1'>
          <p className='text-gray-20 text-xxs'>{trainerSchedule.date}</p>
          <p className='text-black text-xs font-medium'>{trainerSchedule.time}</p>
        </div>

        <div className='w-0.5 bg-stroke h-full' />
        <p className='text-black font-medium'>{trainerSchedule.title}</p>
      </div>

      <div className='flex flex-col items-start justify-center gap-1'>
        <div className='flex justify-start items-center gap-1'>
          <ClockSvg width='12' height='12' color='#878A94' />
          <p className='text-gray-20 text-xxs'>{trainerSchedule.duration} min</p>
        </div>
        <div className='flex justify-start items-center gap-1'>
          <TwoPeopleSvg width='12' height='12' color='#878A94' />
          <p className='text-gray-20 text-xxs'>{trainerSchedule.participants} participants</p>
        </div>
      </div>
    </div>
  )
}

const trainerScheduleDummyData: ITrainerSchedule[] = [
  {
    date: 'Sun, 2 Aug',
    time: '9:00 AM',
    title: 'Core Stability',
    duration: 45,
    participants: 10,
  },
  {
    date: 'Mon, 3 Aug',
    time: '7:00 AM',
    title: 'Strength & Conditioning',
    duration: 60,
    participants: 15,
  },
  {
    date: 'Wed, 5 Aug',
    time: '6:00 PM',
    title: 'Functional Strength Training',
    duration: 60,
    participants: 12,
  },
  {
    date: 'Fri, 7 Aug',
    time: '8:00 AM',
    title: 'Full-Body Strength',
    duration: 60,
    participants: 18,
  },
  {
    date: 'Sat, 8 Aug',
    time: '10:00 AM',
    title: 'Advanced Strength Training',
    duration: 75,
    participants: 20,
  },
]

const TrainerSchedule = () => {
  return (
    <div className='flex justify-start items-start p-4 gap-4 bg-white rounded-4xl max-h-90'>
      <div className='w-100 h-100 pt-4'>
        <Calendar />
      </div>

      <div className='flex flex-1 flex-col gap-2 h-full overflow-y-auto no-scrollbar'>
        <div className='flex justify-between items-center'>
          <h3 className='text-black font-medium'>The Trainer Schedule</h3>
          <TimePeriodSelectButton options={['This Week', 'Today', 'This Month']} />
        </div>

        {
          trainerScheduleDummyData.map((trainerSchedule, index) => (
            <div key={index} className='w-full'>
              <TrainerScheduleItem trainerSchedule={trainerSchedule} />

              {index < trainerScheduleDummyData.length - 1 && (
                <div className='w-full h-px bg-gray-200 my-1' />
              )}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TrainerSchedule
