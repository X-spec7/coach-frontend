import Image from 'next/image'

import { TitleWithEllipsis } from '@/shared/components'
import { IClass } from '@/shared/types'
import { DEFAULT_CLASS_BANNER_URL } from '@/shared/constants'

interface IRecommendedClassCardProps {
  classData: IClass
}

const RecommendedClassCard: React.FC<IRecommendedClassCardProps> = ({ classData }) => {
  const Tag: React.FC<{ content: string | number }> = ({ content }) => {
    return (
      <div className='py-2 px-3 bg-gray-bg text-gray-30 text-xxs'>
        {typeof content === 'string' ? (
          content
        ) : (
          `${content} videos`
        )}
      </div>
    )
  }

  return (
    <div className='flex justify-start items-center w-full py-4 pl-4 bg-white rounded-4xl'>
      <div className='w-25 h-25 rounded-2xl'>
        <Image
          src={DEFAULT_CLASS_BANNER_URL}
          alt={classData.title + ' banner image'}
          width={100}
          height={100}
          className='rounded-2xl'
        />
      </div>

      <div className='flex flex-col items-start justify-start gap-4'>
        <p className='text-gray-20 text-xs'>{classData.category}</p>
        <h3 className='text-black font-medium'>{classData.title}</h3>
        <div className='flex justify-start items-center gap-3'>
          <Tag content={classData.level} />
          <Tag content={classData.sessionCount} />
        </div>
        <p className='text-black text-sm font-medium'>
          &euro;{classData.price}
          <span className='text-gray-20 text-xxs2'>for the full course</span>
        </p>
      </div>
    </div>
  )

}

interface IRecommendedClassProps {
  recommendedClasses: IClass[]
}

const RecommendedClass: React.FC<IRecommendedClassProps> = ({ recommendedClasses }) => {
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <TitleWithEllipsis title='Recommended Class' />
      {recommendedClasses.map((classData, index) => (
        <RecommendedClassCard key={index} classData={classData} />
      ))}
    </div>
  )
}

export default RecommendedClass
