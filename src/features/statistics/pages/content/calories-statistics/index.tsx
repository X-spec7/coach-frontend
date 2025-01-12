import { TitleWithEllipsis } from '@/shared/components'
import { CaloriesCardColorSet } from './CaloriesCardColorSet'
import { ColorSet } from '@/features/statistics/types'
import CaloriesChart from './CaloriesChart'

type NutritionTitle = 'Calories' | 'Protein' | 'Carbs' | 'Fats'

interface Nutrition {
  title: NutritionTitle
  total: number
  value: number
}

const nutritionDummyData: Nutrition[] = [
  {
    title: 'Calories',
    total: 2500,
    value: 1750
  },
  {
    title: 'Protein',
    total: 32,
    value: 25
  },
  {
    title: 'Carbs',
    total: 120,
    value: 67
  },
  {
    title: 'Fats',
    total: 48,
    value: 42
  }
]

const getColorSetByTitle = (title: NutritionTitle): ColorSet => {
  switch (title) {
    case 'Calories':
      return CaloriesCardColorSet.calories
    case 'Protein':
      return CaloriesCardColorSet.protein
    case 'Carbs':
      return CaloriesCardColorSet.carbs
    case 'Fats':
      return CaloriesCardColorSet.fats
  }
}

const NutritionCard: React.FC<Nutrition> = ({ title, total, value }) => {

  const colorSet = getColorSetByTitle(title)

  const progressPercentage = Math.min((value / total) * 100, 100)

  return (
    <div className={`flex flex-col items-start justify-center w-full gap-2 xl:gap-3 px-3 py-3 xl:py-6 rounded-2xl ${colorSet.bgColor}`}>
      <h4 className='text-black text-sm font-medium'>{title}</h4>

      {/* Progress Bar */}
      <div className={`w-full h-2 rounded-md overflow-hidden ${colorSet.progressBgColor}`}>
        <div
          className={`h-full rounded-md ${colorSet.progressColor}`}
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>

      <div className=''>
        <span className='text-gray-30 text-sm font-medium'>{total.toLocaleString()}</span>
        <span className='text-gray-20 text-xxs'> / {value.toLocaleString()} cal</span>
      </div>
    </div>
  )
}

const CaloriesStatistics = () => {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <TitleWithEllipsis title='Calories Statistics' />

      <div className='flex justify-start items-center w-full text-gray-20 text-xxs'>
        <div className='bg-blue w-2.5 h-2.5 rounded-sm mr-1.5' />
        <p>Active Calories</p>
        <div className='bg-gray-20 w-2.5 h-2.5 rounded-sm ml-4 mr-1.5' />
        <p>Resting Calories</p>
      </div>

      <div className='w-full h-70 border-stroke border'>
        <CaloriesChart />
      </div>

      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4 w-full'>
        {
          nutritionDummyData.map((nutrition, index) => {
            return (
              <NutritionCard key={index} title={nutrition.title} total={nutrition.total} value={nutrition.value} />
            )
          })
        }
      </div>
    </div>
  )
}

export default CaloriesStatistics
