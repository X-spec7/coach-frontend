'use client'

import { useEffect, useState } from 'react'

import { IClassSession } from '@/shared/types'

export interface IClassSessionFormProps {
  isAdd: boolean
  onAddClassSession?: (classSession: IClassSession) => void
  onEditClassSession?: (classSession: IClassSession) => void
  originalClassSession?: IClassSession
  onClose: () => void
}

const ClassSessionForm: React.FC<IClassSessionFormProps> = ({
  onClose,
  isAdd,
  onAddClassSession,
  onEditClassSession,
  originalClassSession
}) => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    duration: '',
    description: '',
    totalParticipantNumber: '',
    calorie: '',
    equipments: '',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    if (originalClassSession) {
      setFormData({
        title: originalClassSession.title,
        startDate: originalClassSession.startDate,
        duration: originalClassSession.duration,
        description: originalClassSession.description,
        totalParticipantNumber: originalClassSession.totalParticipantNumber.toString(),
        calorie: originalClassSession.calorie.toString(),
        equipments: originalClassSession.equipments?.join(', ') || '',
      })
    }
  }, [])

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateFormData = () => {
    const validations: { [key: string]: { check: (value: string) => boolean; message: string } } = {
      title: { check: (value) => value.trim() !== '', message: 'Title is required.' },
      startDate: { check: (value) => value.trim() !== '', message: 'Start date is required.' },
      duration: { check: (value) => !isNaN(Number(value)) && Number(value) > 0, message: 'Duration must be a positive number.' },
      description: { check: (value) => value.trim() !== '', message: 'Description is required.' },
      totalParticipantNumber: { check: (value) => !isNaN(Number(value)) && Number(value) > 0, message: 'Total participant number must be a positive number.' },
      calorie: { check: (value) => !isNaN(Number(value)) && Number(value) >= 0, message: 'Calorie must be a non-negative number.' },
      equipments: {
        check: (value) => value.trim() === '' || /^[a-zA-Z0-9\s,]+$/.test(value),
        message: 'Equipments should be a comma-separated list of valid items.'
      }
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

  const handleSubmit = () => {
    if (validateFormData()) {
      const startDateISO = new Date(formData.startDate).toISOString()

      const newSession: IClassSession = {
        title: formData.title,
        startDate: startDateISO,
        duration: formData.duration,
        description: formData.description,
        totalParticipantNumber: Number(formData.totalParticipantNumber),
        calorie: Number(formData.calorie),
        equipments: formData.equipments.split(',').map((item) => item.trim()),
      }

      if (isAdd && onAddClassSession) {
        onAddClassSession(newSession)
      }
      if (!isAdd && onEditClassSession) {
        onEditClassSession(newSession)
      }

      onClose()
    }
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Add Session</h2>
      <div className='flex flex-col gap-4'>
        <input
          type='text'
          name='title'
          placeholder='Session Title'
          value={formData.title}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <input
          type='datetime-local'
          name='startDate'
          placeholder='Start Date'
          value={formData.startDate}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <input
          type='number'
          name='duration'
          placeholder='Duration (minutes)'
          value={formData.duration}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <textarea
          name='description'
          placeholder='Session Description'
          value={formData.description}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <input
          type='number'
          name='totalParticipantNumber'
          placeholder='Total Participants'
          value={formData.totalParticipantNumber}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <input
          type='text'
          name='calorie'
          placeholder='Calorie'
          value={formData.calorie}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <input
          type='text'
          name='equipments'
          placeholder='Equipments (comma separated)'
          value={formData.equipments}
          onChange={handleInputChange}
          className='w-full p-2 border rounded-md'
        />
        <button
          onClick={handleSubmit}
          className='mt-6 bg-green text-black py-3 px-4 rounded-md'
        >
          {isAdd ? 'Create Session' : 'Edit Session'}
        </button>

        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  )
}

export default ClassSessionForm
