import MyClasses from './MyClasses'
import FeaturedClass from './FeaturedClass'
import RecommendedClass from './RecommendedClass'
import AllClasses from './AllClasses'

import {
  recommendedClasses,
  allClasses,
  myClasses,
  featuredClass
} from '../dummy'

const ClassesList = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-start gap-4 rounded'>
        <div className='flex flex-2 flex-col justify-start gap-4 p-4 bg-white rounded-4xl'>
          <MyClasses myClasses={myClasses} />
          <FeaturedClass classData={featuredClass} />
        </div>

        <RecommendedClass recommendedClasses={recommendedClasses} />
      </div>
      
      <AllClasses allClasses={allClasses} />
    </div>
  )
}

export default ClassesList
