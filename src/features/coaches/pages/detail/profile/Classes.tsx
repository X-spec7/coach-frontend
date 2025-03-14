import { TitleWithEllipsis } from '@/shared/components'
import { MonitorSvg } from '@/shared/components/Svg'
import { ICoachDetailClass } from '@/shared/types'

interface IClassesProps {
  classes?: ICoachDetailClass[]
}

// TODO: handle no classes case
const Classes: React.FC<IClassesProps> = ({ classes }) => {
  if (!classes || classes.length === 0) {
    return (
      <div className='flex flex-col gap-3.5'>
        <TitleWithEllipsis title='Class' />
        <div className='flex justify-center items-center pt-6 w-full text-black text-lg'>No Classes Yet</div>  
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-3.5'>
      <TitleWithEllipsis title='Class' />

      {
        classes?.map((classItem, index) => (
          <div key={index} className='flex justify-start items-center gap-3.5'>
            <div className='flex justify-center items-center w-8 h-8 bg-blue rounded-full'>
              <MonitorSvg width='18' height='18' color='#4D5260' />
            </div>
            <div>
              <p className='text-black text-sm font-medium'>{classItem.title}</p>
              <p className='text-gray-20 text-xs mt-1'>{classItem.category}</p>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Classes
