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
    <div className='bg-blue-subtle rounded-md p-2 text-gray-30 text-xxs2'>{content}</div>
  )

  return (
    <div className='flex flex-col items-center gap-4 w-[calc(33.33%-16px)] h-44 bg-blue shadow-md p-4 rounded-4xl'>
      <div className='flex items-start justify-between'>
        <div className='p-2.5 bg-blue-subtle'>
          <BarbellSvg width='20' height='20' color='#4D5260' />
        </div>
        <div className='flex justify-center items-center w-7.5 h-7.5 bg-white rounded-full'>
          <EllipsisMenu menus={[]} />
        </div>
      </div>

      <h3 className='text-black text-sm font-medium'>{classData.title}</h3>
      <div className='flex justify-start items-center gap-2'>
        <Tag content={classData.category} />
        <Tag content={classData.level} />
      </div>

      <p className='text-gray-30 text-xxs2'>72% completed 2 hours left</p>
    </div>
  )
}

const MyClasses: React.FC<IMyClassesProps> = ({ myClasses }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='text-black font-medium'>My Classes</h2>
        <div>Toggle Button</div>
      </div>

      <div className='flex items-center justify-start gap-4 w-full overflow-x-auto no-scrollbar'>
        {myClasses.map((classData, index) => (
          <MyClassCard key={index} classData={classData} />
        ))}
      </div>
    </div>
  )
}

export default MyClasses
