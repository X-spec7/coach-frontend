'use client'

import { useEffect, useState } from 'react'
import { IClassExercise, IExercise } from '@/shared/types'
import { exercisesDummyData } from '@/dev/dummy-data'

export interface IClassExerciseFormProps {
  isAdd: boolean
  onAddClassExercise?: (classExercise: IClassExercise) => void
  onEditClassExercise?: (classExercise: IClassExercise) => void
  originalClassExercise?: IClassExercise
  onClose: () => void
}

const ClassExerciseForm: React.FC<IClassExerciseFormProps> = ({
  isAdd,
  onAddClassExercise,
  onEditClassExercise,
  originalClassExercise,
  onClose,
}) => {
  const [exercise, setExercise] = useState<IExercise | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    if (originalClassExercise) {
      const originalExercise = {
        id: originalClassExercise.id,
        title: originalClassExercise.title,
        description: originalClassExercise.description,
        exerciseIconUrl: originalClassExercise.exerciseIconUrl,
        exerciseGifUrl: originalClassExercise.exerciseGifUrl,
        caloriePerRound: originalClassExercise.caloriePerRound,
      }

      setExercise(originalExercise)
    }
  }, [])

  const handleSelectExercise = (exercise: IExercise) => {
    setExercise(exercise)
    setIsDropdownOpen(false) // Close dropdown after selection
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md w-80">
      <h2 className="text-lg font-semibold mb-2">{isAdd ? 'Add' : 'Edit'} Class Exercise</h2>
      
      {/* Custom Select Dropdown */}
      <div className="relative">
        <button
          className="w-full flex items-center justify-between p-2 border rounded-lg bg-gray-100"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {exercise ? (
            <div className="flex items-center gap-2">
              <img src={exercise.exerciseIconUrl} alt="" className="w-6 h-6 rounded" />
              <span>{exercise.title}</span>
            </div>
          ) : (
            <span>Select an exercise</span>
          )}
        </button>

        {/* Dropdown Items */}
        {isDropdownOpen && (
          <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-2 max-h-60 overflow-auto">
            {exercisesDummyData.map((exercise) => (
              <li
                key={exercise.id}
                onClick={() => handleSelectExercise(exercise)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img src={exercise.exerciseIconUrl} alt="" className="w-6 h-6 rounded" />
                <span>{exercise.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={onClose} className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg">
        Close
      </button>
    </div>
  )
}

export default ClassExerciseForm
