'use client'

import { useEffect, useState } from 'react'

import MyClasses from './MyClasses'
import FeaturedClass from './FeaturedClass'
import RecommendedClass from './RecommendedClass'
import AllClasses from './AllClasses'
import { IClass } from '@/shared/types'

import {
  recommendedClasses,
  allClasses,
  myClasses,
  featuredClass
} from '../dummy'
import { GetClassesRequestDTO } from '../../types'
import { classService } from '../../services'

interface IClassesListProps {
  currentPage: number
  query?: string
  category?: string
  level?: string
}

const ClassesList: React.FC<IClassesListProps> = ({
  currentPage,
  query,
  category,
  level,
}) => {
  const [classes, setClasses] = useState<IClass[]>([])
  const [totalClassesCount, setTotalClassesCount] = useState<number>(0)

  const [gettingClasses, setGettingClasses] = useState<boolean>(false)

  useEffect(() => {
    const getClasses = async () => {
      const getClassesPayload: GetClassesRequestDTO = {
        limit: 6,
        offset: ( currentPage - 1 ) * 6,
        query,
        category,
        level,
      }
      
      try {
        setGettingClasses(true)
        console.log('payload in getting classes', getClassesPayload)
        const response = await classService.getClasses(getClassesPayload)

        if (response.status === 200) {
          setClasses(response.classes)
          setTotalClassesCount(response.totalClassesCount)
        } else {
          alert('Something went wrong when fetching classes data')
          console.log('Error when fetching classes', response.message)
        }
      } catch (error) {
        alert('Something went wrong when fetching classes data')
        console.log('Error when fetching classes', error)
      } finally {
        setGettingClasses(false)
      }
    }

    getClasses()
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-start gap-4 rounded'>
        <div className='flex flex-2 flex-col justify-start gap-4 p-4 bg-white rounded-4xl'>
          <MyClasses myClasses={myClasses} />
          <FeaturedClass classData={featuredClass} />
        </div>

        <RecommendedClass recommendedClasses={recommendedClasses} />
      </div>
      
      <AllClasses
        allClasses={classes}
        totalClassesCount={totalClassesCount}
        query={query}
        category={category}
        level={level}
      />
    </div>
  )
}

export default ClassesList
