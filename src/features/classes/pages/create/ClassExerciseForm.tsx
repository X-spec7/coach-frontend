'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { IClassExercise, IExercise } from '@/shared/types'
import { exercisesDummyData } from '@/dev/dummy-data'
import { CaretUpSvg, CaretDownSvg } from '@/shared/components/Svg'

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
  const [formData, setFormData] = useState({
    setCount: '',
    repsCount: '',
    restDuration: '',
    caloriePerSet: '',
  })

  const [exercise, setExercise] = useState<IExercise | null>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

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

      setFormData({
        setCount: originalClassExercise.setCount.toString(),
        repsCount: originalClassExercise.repsCount.toString(),
        restDuration: originalClassExercise.restDuration.toString(),
        caloriePerSet: originalClassExercise.caloriePerRound.toString(),
      })

      setExercise(originalExercise)
    }
  }, [])

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectExercise = (exercise: IExercise) => {
    setExercise(exercise)
    setIsDropdownOpen(false)
  }

  const validateFormData = () => {
    const validations: { [key: string]: { check: (value: string) => boolean; message: string } } = {
      setCount: { check: (value) => value.trim() !== '', message: 'Set Count is required'},
      repsCount: { check: (value) => value.trim() !== '', message: 'Repetition count is required'},
      restDuration: { check: (value) => value.trim() !== '', message: 'Rest Duration is required'},
      caloriePerSet: { check: (value) => value.trim() !== '', message: 'Calorie Per Set is required'},
    }

    for (const field in validations) {
      if (!validations[field].check(formData[field as keyof typeof formData])) {
        setError(validations[field].message)
        return false
      }
    }

    setError('')
    return true
  }

  const validateExercise = () => {
    if (exercise) {
      return true
    } else {
      setError('You should select an exercise')
      return false
    }
  }

  const handleSubmit = () => {
    if (validateFormData() && validateExercise()) {
      if (isAdd && onAddClassExercise) {
        onAddClassExercise({
          ...exercise!,
          setCount: Number(formData.setCount),
          repsCount: Number(formData.repsCount),
          restDuration: Number(formData.restDuration),
          caloriePerSet: Number(formData.caloriePerSet),
        })
      }
      if (!isAdd && onEditClassExercise) {
        onEditClassExercise({
          ...exercise!,
          setCount: Number(formData.setCount),
          repsCount: Number(formData.repsCount),
          restDuration: Number(formData.restDuration),
          caloriePerSet: Number(formData.caloriePerSet),
        })
      }

      onClose()
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">{isAdd ? 'Add' : 'Edit'} Class Exercise</h2>

      {/* Custom Select Dropdown */}
      <div className="relative">
        <button
          className="w-full flex items-center justify-between p-2 border rounded-lg bg-gray-100"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {exercise ? (
            <div className="flex items-center gap-2">
              <Image
                src={exercise.exerciseIconUrl}
                alt={`${exercise.title} image`}
                width={24}
                height={24}
                className="rounded"
              />
              <span>{exercise.title}</span>
            </div>
          ) : (
            <span>Select an exercise</span>
          )}
          {isDropdownOpen ? (
            <CaretUpSvg width='24' height='24' color='#4D5260' />
          ) : (
            <CaretDownSvg width='24' height='24' color='#4D5260' />
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
                <Image
                  src={exercise.exerciseIconUrl}
                  alt={`${exercise.title} image`}
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span>{exercise.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input fields for form data */}
      <div className='flex flex-col gap-4 pt-4'>
        <input
          type='text'
          name='setCount'
          placeholder='Set Count'
          value={formData.setCount}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <input
          type='text'
          name='repsCount'
          placeholder='Reps Count'
          value={formData.repsCount}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <input
          type='text'
          name='restDuration'
          placeholder='Rest Duration'
          value={formData.restDuration}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <input
          type='text'
          name='caloriePerSet'
          placeholder='Calorie Per Set'
          value={formData.caloriePerSet}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
      </div>

      <button onClick={handleSubmit} className="mt-8 w-full p-2 bg-blue-500 text-white rounded-lg">
        {isAdd ? 'Create Exercise' : 'Edit Exercise'}
      </button>

      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default ClassExerciseForm
