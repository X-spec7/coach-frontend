'use client'

import { IExercise, IFormExercise } from '@/shared/types'
import { useEffect, useState } from 'react'

interface IExerciseFormProps {
  isAdd: boolean
  onClose: () => void
  onAdd?: (newExercise: IFormExercise) => Promise<boolean>
  onEdit?: (updatedExercise: IFormExercise) => Promise<boolean>
  editingExercise?: IExercise
}

const ExerciseForm: React.FC<IExerciseFormProps> = ({
  isAdd,
  onClose,
  onAdd,
  onEdit,
  editingExercise,
}) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [caloriePerRound, setCaloriePerRound] = useState<string>('')

  const [exerciseIcon, setExerciseIcon] = useState<string | ArrayBuffer | null>(null)
  const [exerciseGif, setExerciseGif] = useState<string | ArrayBuffer | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [validationError, setValidationError] = useState<string>('')

  useEffect(() => {
    if (editingExercise) {
      setTitle(editingExercise.title || '')
      setDescription(editingExercise.description || '')
      setCaloriePerRound(editingExercise.caloriePerRound.toString() || '')
      setExerciseIcon(editingExercise.exerciseIconUrl || null)
      setExerciseGif(editingExercise.exerciseGifUrl || null)
    }
  }, [editingExercise])

  // Handle file input
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFile(reader.result)
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!title.trim() || !description.trim() || !caloriePerRound.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    setLoading(true)

    const newExercise: IFormExercise = {
      title,
      description,
      caloriePerRound: parseFloat(caloriePerRound),
      exerciseIcon: exerciseIcon,
      exerciseGif: exerciseGif,
    }

    let isSucceed = false

    if (isAdd && onAdd) {
      isSucceed = await onAdd(newExercise)
    } else if (!isAdd && onEdit) {
      isSucceed = await onEdit(newExercise)
    }

    if (isSucceed) {
      onClose()
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{isAdd ? 'Add New Exercise' : 'Edit Exercise'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={3}
            required
          />
        </div>

        {/* Calorie Per Round Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Calories Per Round</label>
          <input
            type="number"
            value={caloriePerRound}
            onChange={(e) => setCaloriePerRound(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Icon Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Exercise Icon</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setExerciseIcon)} />
          {exerciseIcon && (
            <img src={exerciseIcon.toString()} alt="Icon Preview" className="mt-2 w-16 h-16 object-cover rounded" />
          )}
        </div>

        {/* GIF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Exercise GIF</label>
          <input type="file" accept="image/gif" onChange={(e) => handleFileChange(e, setExerciseGif)} />
          {exerciseGif && (
            <img src={exerciseGif.toString()} alt="GIF Preview" className="mt-2 w-24 h-24 object-cover rounded" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            disabled={loading}
          >
            {isAdd ? 'Add Exercise' : 'Save Changes'}
          </button>
        </div>

        {validationError && <p className='text-red-500'>{validationError}</p>}
      </form>
    </div>
  )
}

export default ExerciseForm