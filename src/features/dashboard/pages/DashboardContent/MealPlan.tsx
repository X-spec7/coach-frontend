import React from 'react'
import Image from 'next/image'

import { Meal, MealTime } from '@/shared/types'
import { mealDummyData } from '@/dev/dummy-data'

interface MealPlanCardProps extends Omit<Meal, 'nutrition' | 'healthScore'> { }

const getImageUrlByMealTitle = (mealName: string): string => {
  switch (mealName) {
    case 'Power Protein':
      return '/images/meal/power_protein.png'
    case 'Vegan Energy Boost':
      return '/images/meal/vegan_energy_boost.png'
    case 'Lean & Green':
      return '/images/meal/lean_green.png'
    default:
      return '/images/meal/power_protein.png'
  }
}

const getBgColorByMealTime = (mealTime: MealTime): string => {
  switch (mealTime) {
    case 'Breakfast':
      return 'bg-blue'
    case 'Lunch':
      return 'bg-yellow'
    case 'Dinner':
      return 'bg-green'
    case 'Snack':
      return 'bg-red'
    default:
      return 'bg-blue'
  }
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ mealTime, mealTitle, difficulty, calory, description }) => {
  const bgColor = getBgColorByMealTime(mealTime as MealTime)
  const mealImageUrl = getImageUrlByMealTitle(mealTitle)

  return (
    <div className={`flex flex-col p-4 ${bgColor} rounded-20`}>
      <div className='flex justify-start items-center gap-3 mb-4'>
        <Image
          width={84}
          height={84}
          src={mealImageUrl}
          alt={mealTitle}
          className='rounded-xl'
        />

        <div className='flex flex-col gap-[6px] text-gray-30'>
          <div>
            <span className='py-[2px] px-[6px] bg-white rounded-md text-xxs2'>
              {mealTime}
            </span>
          </div>
          <h3 className='text-black font-medium text-xs'>{mealTitle}</h3>
          <p className='text-xxs'>Medium</p>
          <p className='text-xxs'>{calory.toLocaleString()} Cal</p>
        </div>
      </div>

      <div className='w-full h-[2px] bg-white mr-3 mb-3'></div>

      <p className='text-xxs text-gray-30 break-words'>{description}</p>
    </div>
  )
}

const mealPlanDummyData = mealDummyData.length > 3 ? mealDummyData.slice(0, 2) : mealDummyData

const MealPlan = () => {
  return (
    <div className='flex flex-col gap-4 min-w-60'>
      <div className='flex justify-between items-center'>
        <h3 className='text-black font-medium'>Meal Plan</h3>
        <p className='text-black'>...</p>
      </div>

      {
        mealPlanDummyData.map((mealData) => (
          <MealPlanCard
            key={mealData.id}
            id={mealData.id}
            mealTime={mealData.mealTime}
            mealTitle={mealData.mealTitle}
            difficulty={mealData.difficulty}
            calory={mealData.calory}
            description={mealData.description}
          />
        ))
      }
    </div>
  )
}

export default MealPlan
