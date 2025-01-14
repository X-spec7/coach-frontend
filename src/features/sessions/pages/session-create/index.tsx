'use client'

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'

const CreateSessionContent = () => {
  const [banner, setBanner] = useState<string | ArrayBuffer | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    duration: '',
    goal: '',
    level: '',
    description: '',
    totalParticipantNumber: '',
    price: '',
    equipments: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setBanner(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const sessionData = {
      title: formData.title,
      startDate: formData.startDate,
      duration: Number(formData.duration),
      goal: formData.goal,
      level: formData.level,
      description: formData.description,
      bannerImageUrl: banner,
      totalParticipantNumber: Number(formData.totalParticipantNumber),
      price: Number(formData.price),
      equipments: formData.equipments.split(',').map((item) => item.trim()),
    }

    try {
      // Replace with your API call
      console.log('Session Data:', sessionData)
      setLoading(false)
      alert('Session Created Successfully')
    } catch (err) {
      console.error('Error creating session:', err)
      setError('Failed to create session')
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-8 bg-white rounded-4xl w-full p-8 min-h-230'>
      <h2 className='text-black text-3xl font-600 w-full text-center mt-8 mb-12'>Create Session</h2>

      <div className='flex justify-center gap-20 w-full'>
        {/* Left Side - Banner Image */}
        <div className='flex flex-col gap-4 w-1/2 max-w-125'>
          <label className='block text-gray-500'>Banner Image</label>
          <div className='relative w-full h-125 bg-gray-bg rounded-lg flex items-center justify-center border border-dashed border-gray-300 cursor-pointer'>
            <input
              type='file'
              accept='image/*'
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              onChange={handleFileChange}
            />
            {banner && typeof banner === 'string' ? (
              <Image src={banner} alt="Banner Preview" layout="fill" />
            ) : (
              <p className="text-gray-30 text-xl font-medium">Drag and drop or click to upload</p>
            )}
          </div>
        </div>

        {/* Right Side - Session Fields */}
        <div className='flex flex-col gap-4 w-1/2 max-w-125'>
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
          <input
            type='text'
            name='goal'
            placeholder='Goal'
            value={formData.goal}
            onChange={handleInputChange}
            className='w-full p-2 border rounded-md'
          />
          <select
            name='level'
            value={formData.level}
            onChange={handleInputChange}
            className='w-full p-2 border rounded-md'
          >
            <option value=''>Select Level</option>
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='advanced'>Advanced</option>
          </select>
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
            type='number'
            name='price'
            placeholder='Price'
            value={formData.price}
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
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Session'}
          </button>

          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default CreateSessionContent
