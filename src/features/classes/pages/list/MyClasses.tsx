import { IClass } from '@/shared/types'
import { BarbellSvg } from '@/shared/components/Svg'
import { EllipsisMenu } from '@/shared/components'

interface IMyClassesProps {
  myClasses: IClass[]
}

interface MyClassCardProps {
  classData: IClass
}

const MyClassCard: React.FC<MyClassCardProps> = ({ classData }) => {
  const Tag = ({content}: {content: string}) => (
    <div className='bg-blue-subtle rounded-md py-1 px-1.5 text-gray-30 text-xxs2'>{content}</div>
  )

  return (
    <div className='flex flex-col items-center gap-4 min-w-[calc(27%)] h-44 bg-blue shadow-md p-4 rounded-4xl'>
      <div className='flex items-start justify-between w-full'>
        <div className='p-2.5 rounded-full bg-blue-subtle'>
          <BarbellSvg width='20' height='20' color='#4D5260' />
        </div>
        <div className='flex justify-center items-center w-7.5 h-7.5 bg-white rounded-full'>
          {/* TODO: Replace this, adjust children size */}
          <EllipsisMenu menus={[]} />
        </div>
      </div>

      <h3 className='text-black text-sm font-medium w-full'>{classData.title}</h3>
      <div className='flex justify-start items-center w-full gap-2'>
        <Tag content={classData.category} />
        <Tag content={classData.level} />
      </div>

      <p className='text-gray-30 text-xxs2 w-full'>72% completed 2 hours left</p>
    </div>
  )
}

const MyClasses: React.FC<IMyClassesProps> = ({ myClasses }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='text-black font-medium'>My Classes</h2>
      </div>

      <div className='flex items-center justify-start gap-4 w-full py-4 overflow-x-auto no-scrollbar'>
        {myClasses.map((classData, index) => (
          <MyClassCard key={index} classData={classData} />
        ))}
      </div>
    </div>
  )
}

export default MyClasses
