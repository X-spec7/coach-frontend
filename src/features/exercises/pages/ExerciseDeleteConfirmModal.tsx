'use client'

import React, { useState } from 'react'

interface IExerciseDeleteConfirmModalProps {
  onClose: () => void
  onDelete: () => Promise<boolean>
}

const ExerciseDeleteConfirmModal: React.FC<IExerciseDeleteConfirmModalProps> = ({
  onClose,
  onDelete,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleDeleteButtonClicked = async () => {
    setLoading(true)

    const isSuccess = await onDelete()

    if (isSuccess) {
      setLoading(false)
      onClose()
    } else {
      setLoading(false)
    }
  }

  return (
    <div className='p-4'>
      <p className='text-center'>Are you sure you want to delete this exercise?</p>
      <div className='flex items-center justify-center gap-6 mt-12'>
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-10 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button
          type='button'
          className="px-10 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          disabled={loading}
          onClick={handleDeleteButtonClicked}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ExerciseDeleteConfirmModal
