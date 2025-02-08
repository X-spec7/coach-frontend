'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { IExercise, IFormExercise } from '@/shared/types'
import { PlusSvg } from '@/shared/components/Svg'
import {
  Pagination,
  SearchField,
  DefaultModal,
} from '@/shared/components'

import { exerciseService } from '../service'
import { CreateExerciseRequestDTO, EditExerciseRequestDTO, GetExercisesRequestDTO } from '../types'
import ExercisesList from './ExercisesList'
import ExerciseForm from './ExerciseForm'

interface IExercisePageProps {
  query: string
  currentPage: number
}

const ExercisesPage: React.FC<IExercisePageProps> = ({
  query,
  currentPage,
}) => {
  const [exercises, setExercises] = useState<IExercise[]>([])
  const [totalExercisesCount, setTotalExercisesCount] = useState<number>(0)

  const [showExerciseModal, setShowExerciseModal] = useState<boolean>(false)
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(null)

  const fetchData = useCallback(async () => {
    const getExercisesPayload: GetExercisesRequestDTO = {
      query,
      limit: 15,
      offset: (currentPage - 1) * 15
    }
    try {
      const response = await exerciseService.getExercises(getExercisesPayload)
      if (response.status === 200) {
        setExercises(response.exercises)
        setTotalExercisesCount(response.totalExercisesCount)
      }
    } catch (error) {
      alert('Error occured while fetching exercises data')
      console.log('Error when fetching exercises data: ', error)
    }
  }, [query, currentPage])

  useEffect(() => {
    fetchData()
  }, [])

  const AddExerciseButton = () => {
    return (
      <button
        className='flex justify-center items-center gap-0.5 py-1.5 px-2.5 bg-green rounded-20'
        onClick={() => {
          setEditingExerciseId(null)
          setShowExerciseModal(true)
        }}
      >
        <PlusSvg width='14' height='18' color='#4D5260' />
        <p className='text-gray-30 text-xxs font-medium'>Add Exercise</p>
      </button>
    )
  }

  const onExerciseSelected = (exerciseId: number) => {
    setEditingExerciseId(exerciseId)
    setShowExerciseModal(true)
  }

  const onAddExercise = async (newExercise: IFormExercise) => {
    try {
      const response = await exerciseService.createExercise(newExercise as CreateExerciseRequestDTO)

      if (response.status === 200) {
        alert('Exercise created successfully')
        fetchData()
        return true
      } else {
        alert('An error occured while creating an exercise')
        console.log('Error when creating exercise: ', response.message)
        return false
      }
    } catch (error) {
      alert('An error occured while creating an exercise')
      console.log('Error when creating exercise: ', error)
      return false
    }
  }

  const onEditExercise = async (updatingExerciseId: number, updatedExercise: IFormExercise) => {
    const payload: EditExerciseRequestDTO = {
      exerciseId: updatingExerciseId,
      ...updatedExercise,
    }

    try {
      const response = await exerciseService.editExercise(payload)
      if (response.status === 200) {
        alert('Updated exercise successfully')
        fetchData()
        return true
      } else {
        alert('An error occured while updating exercise')
        console.log('Error while updating exercise: ', response.message)
        return false
      }
    } catch (error) {
      alert('An error occured while updating exercise')
      console.log('Error while updating exercise: ', error)
      return false
    }
  }

  return (
    <div className='relative flex flex-col p-4 gap-4 bg-white rounded-4xl'>
      {/* CONTENT HEADER */}
      <div className='flex justify-between items-center w-full h-7.5'>
        <SearchField
          width='w-56'
          height='h-7.5'
          placeholder='Search for exercise'
          value={query}
        />
        <AddExerciseButton />
      </div>

      {/* MAIN CONTENT */}
      <ExercisesList
        exercises={exercises}
        onExerciseSelected={onExerciseSelected}
      />

      <Pagination
        countPerPage={15}
        totalCounts={totalExercisesCount}
      />

      {showExerciseModal && (
        <DefaultModal onClose={() => setShowExerciseModal(false)}>
          <ExerciseForm
            isAdd={editingExerciseId === null}
            onClose={() => setShowExerciseModal(false)}
            onAdd={editingExerciseId === null ? onAddExercise: undefined}
            onEdit={editingExerciseId === null ? undefined : (updatedExercise: CreateExerciseRequestDTO) => onEditExercise(editingExerciseId, updatedExercise)}
            editingExercise={editingExerciseId === null ? undefined : exercises.find(exercise => exercise.id === editingExerciseId)}
          />
        </DefaultModal>
      )}

    </div>
  )
}

export default ExercisesPage
