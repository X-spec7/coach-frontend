'use client'

import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'

import { EditSvg, PlusSvg, TrashSvg } from '@/shared/components/Svg'
import { IClassSession, IClassExercise } from '@/shared/types'
import { DefaultModal } from '@/shared/components'
import { getDateFromDateObject } from '@/shared/utils'
import CreateClassSessionForm from './ClassSessionForm'
import ClassExerciseForm from './ClassExerciseForm'
import { CreateClassRequestDTO } from '../../types/class.dto'
import { classService } from '../../services'

const CreateClassForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    intensity: '',
    level: '',
    price: '',
  })

  const [exercises, setExercises] = useState<IClassExercise[]>([])
  const [sessions, setSessions] = useState<IClassSession[]>([])

  const [banner, setBanner] = useState<string | ArrayBuffer | null>()
  const [benefits, setBenefits] = useState<string[]>([])

  const [exerciseModalOpen, setExerciseModalOpen] = useState<boolean>(false)
  const [sessionModalOpen, setSessionModalOpen] = useState<boolean>(false)

  const [exerciseEditingIndex, setExerciseEditingIndex] = useState<number | null>(null)
  const [sessionEditingIndex, setSessionEditingIndex] = useState<number | null>(null)

  const [loading, setLoading] = useState<boolean>(false)
  const [validationError, setValidationError] = useState('')

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (type === 'banner') setBanner(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddSession = (session: IClassSession) => {
    setSessions((prev) => [...prev, session])
  }
  const handleAddExercise = (exercise: IClassExercise) => {
    setExercises((prev) => [...prev, exercise])
  }
  const handleRemoveSession = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index))
  }
  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }
  const handleEditSession = (
    index: number,
    updatedSession: IClassSession,
  ) => {
    setSessions((prevSessions) =>
      prevSessions.map((session, i) =>
        i === index ? { ...session, ...updatedSession } : session
      )
    )
  }
  const handleEditExercise = (
    index: number,
    updatedExercise: IClassExercise,
  ) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise, i) =>
        i === index ? { ...exercise, updatedExercise } : exercise
      )
    )
  }

  const AddButton = ({ onClick }: { onClick: () => void }) => (
    <button
      className='flex justify-center items-center px-2 py-1.5 bg-green rounded-full'
      onClick={onClick}
    >
      <PlusSvg width='14' height='18' color='#4D5260' />
    </button>
  )

  const validateFormData = () => {
    const validations: { [key: string]: { check: (value: string) => boolean; message: string } } = {
      title: { check: (value) => value.trim() !== '', message: 'Title is required.' },
      category: { check: (value) => value.trim() !== '', message: 'Category is required.' },
      description: { check: (value) => value.trim() !== '', message: 'Description is required.' },
      intensity: { check: (value) => value.trim() !== '', message: 'Intensity is required.' },
      level: { check: (value) => value.trim() !== '', message: 'Level is required.' },
      price: {
        check: (value) => value.trim() !== '' && !isNaN(Number(value)) && Number(value) >= 0,
        message: 'Price must be a non-negative number.'
      }
    }

    for (const field in validations) {
      if (!validations[field].check(formData[field as keyof typeof formData])) {
        setValidationError(validations[field].message)
        return false
      }
    }

    setValidationError('')
    return true
  }


  const handleSubmit = async () => {
    setLoading(true)

    if (validateFormData()) {
      const averageDurationPerSession = sessions.length
        ? sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length
        : 0
      const averageCaloriePerSession = sessions.length
        ? sessions.reduce((sum, session) => sum + session.calorie, 0) / sessions.length
        : 0
  
      const uniqueEquipments = Array.from(new Set(sessions.flatMap(session => session.equipments || [])))
  
      const payload: CreateClassRequestDTO = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        intensity: formData.intensity,
        level: formData.level,
        price: Number(formData.price),
        sessionCount: sessions.length,
        durationPerSession: averageDurationPerSession,
        caloriePerSession: averageCaloriePerSession,
        benefits: benefits,
        equipments: uniqueEquipments,
        bannerImage: banner,
        exercises: exercises,
        sessions: sessions
      }

      try {
        const response = await classService.createClass(payload)
        if (response.status === 200) {
          alert(response.message)
        } else {
          alert('Error occured while creating class')
          console.log('Error when creating class: ', response.message)
        }
      } catch (error) {
        alert('Error occured while creating class')
        console.log('Error when creating class: ', error)
      } finally {
        setLoading(false)
      }

    } else {
      setLoading(false)
    }

  }

  return (
    <div className='relative flex flex-col gap-8 bg-white rounded-4xl w-full p-8 min-h-230'>
      <h2 className='text-black text-3xl font-600 w-full text-center mt-8 mb-12'>Class Detail</h2>

      {/* MAIN FORM */}
      <div className='flex justify-center gap-20 w-full'>
        {/* Left Side - Banner Image and input fields */}
        <div className='flex flex-col gap-4 w-1/2 max-w-125'>
          <label className='block text-gray-500'>Banner Image</label>
          <div
            className='relative w-full h-80 bg-gray-bg rounded-lg flex items-center justify-center border border-dashed border-gray-300 cursor-pointer'
          >
            <input
              type='file'
              accept='image/*'
              id='class.banner'
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              onChange={(e) => handleFileChange(e, 'banner')}
            />
            {banner && typeof banner === 'string' ? (
              <Image
                src={banner}
                alt="Banner Preview"
                layout="fill"
                onClick={() => document.getElementById('class.banner')?.click()}
              />
            ) : (
              <p className="text-gray-30 text-xl font-medium">Drag and drop or click to upload</p>
            )}
          </div>

          <div className='flex flex-col gap-3 pt-8'>
            <input
              type='text'
              name='title'
              placeholder='Class Title'
              value={formData.title}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
            />
            <input
              type='text'
              name='category'
              placeholder='Class Category'
              value={formData.category}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
            />
            <input
              type='text'
              name='description'
              placeholder='Class Description'
              value={formData.description}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
            />
            <input
              type='text'
              name='intensity'
              placeholder='Class Intensity'
              value={formData.intensity}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
            />
            <input
              type='text'
              name='level'
              placeholder='Class Level'
              value={formData.level}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
            />
            <input
              type='text'
              name='price'
              placeholder='Class Price'
              value={formData.price}
              onChange={handleInputChange}
              className='w-full p-2 border rounded-md'
            />
          </div>
        </div>

        {/* Right side - Exercises and Sessions */}
        <div className='flex flex-col gap-4 w-1/2 max-w-125'>
          <div className='flex flex-col gap-4 min-h-80'>
            <div className='flex justify-between items-center border-b border-stroke pb-2'>
              <p className='text-gray-30 font-medium'>Add Exercise</p>
              <AddButton onClick={() => {
                setExerciseEditingIndex(null)
                setExerciseModalOpen(true)
              }} />
            </div>

            {exercises.map((exercise, index) => (
              <div key={index} className='flex items-center justify-between w-full h-10 border-gray-20 border-2 bg-gray-100 p-2 rounded-md mt-2'>
                <div className='flex items-center justify-start gap-4'>
                  <span>{exercise.title}</span>
                  <span className='max-w-60 h-6 overflow-hidden'>{exercise.description}</span>
                </div>
                <div className='flex items-center justify-end gap-2'>
                  <button onClick={() => {
                    setExerciseEditingIndex(index)
                    setExerciseModalOpen(true)
                  }}>
                    <EditSvg width="25" height="25" color="#333333" />
                  </button>

                  <button onClick={() => { handleRemoveExercise(index) }}>
                    <TrashSvg width="25" height="25" color="#333333" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Handle Class Sessions */}
          <div className='flex flex-col gap-4 min-h-80 mt-4'>
            <div className='flex justify-between items-center border-b border-stroke pb-2'>
              <p className='text-gray-30 font-medium'>Add Session</p>
              <AddButton onClick={() => {
                setSessionEditingIndex(null)
                setSessionModalOpen(true)
              }} />
            </div>

            {sessions.map((session, index) => (
              <div key={index} className='flex items-center justify-between border-gray-20 border-2 bg-gray-100 p-2 rounded-md mt-2'>
                <div className='flex items-center justify-start gap-6'>
                  <span>{session.title}</span>
                  <span>{getDateFromDateObject(session.startDate)}</span>
                </div>
                <div className='flex items-center justify-end gap-2'>
                  <button onClick={() => {
                    setSessionEditingIndex(index)
                    setSessionModalOpen(true)
                  }}>
                    <EditSvg width="25" height="25" color="#333333" />
                  </button>

                  <button onClick={() => { handleRemoveSession(index) }}>
                    <TrashSvg width="25" height="25" color="#333333" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className='mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md'
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Class'}
          </button>

          {validationError && <p className='text-red-500'>{validationError}</p>}
        </div>
      </div>

      {/* MODAL */}
      {sessionModalOpen && (
        <DefaultModal onClose={() => setSessionModalOpen(false)}>
          <CreateClassSessionForm
            onClose={() => setSessionModalOpen(false)}
            isAdd={sessionEditingIndex === null}
            onAddClassSession={sessionEditingIndex === null ? handleAddSession : undefined}
            onEditClassSession={sessionEditingIndex !== null ? (updatedSession) => handleEditSession(sessionEditingIndex, updatedSession) : undefined}
            originalClassSession={sessionEditingIndex === null ? undefined : sessions[sessionEditingIndex]}
          />
        </DefaultModal>
      )}

      {exerciseModalOpen && (
        <DefaultModal onClose={() => setExerciseModalOpen(false)}>
          <ClassExerciseForm
            onClose={() => setExerciseModalOpen(false)}
            isAdd={exerciseEditingIndex === null}
            onAddClassExercise={exerciseEditingIndex === null ? handleAddExercise : undefined}
            onEditClassExercise={exerciseEditingIndex !== null ? (updatedExercise) => handleEditExercise(exerciseEditingIndex, updatedExercise) : undefined}
            originalClassExercise={exerciseEditingIndex === null ? undefined : exercises[exerciseEditingIndex]}
          />
        </DefaultModal>
      )}
    </div>
  )
}

export default CreateClassForm
