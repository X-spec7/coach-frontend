'use client'

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { UpdateCoachProfilePayloadDTO } from '@/features/user/types'
import { profileService } from '@/features/user/services'
import { useAuth } from '@/shared/provider'
import { ICoachProfile, IUser } from '@/shared/types'
import { BACKEND_HOST_URL } from '@/shared/constants'

interface IFormData {
  firstName: string
  lastName: string
  address: string
  phoneNumber: string
  yearsOfExperience: undefined | number
  specialization: string
}

const CoachProfileUpdateForm = () => {

  const { user, login } = useAuth()

  const isCoach = (user: IUser | ICoachProfile | null): user is ICoachProfile =>
    user?.userType === 'Coach'

  const getFullImageUrl = (path?: string) => (path ? `${BACKEND_HOST_URL}${path}?t=${new Date().getTime()}` : null)

  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(getFullImageUrl(user?.avatarImageUrl))
  const [banner, setBanner] = useState<string | ArrayBuffer | null>(getFullImageUrl(isCoach(user) ? user.bannerImageUrl : undefined))
  const [formData, setFormData] = useState<IFormData>({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    address: user?.address ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    yearsOfExperience: isCoach(user) ? user.yearsOfExperience ?? undefined : undefined,
    specialization: isCoach(user) ? user.specialization ?? '' : ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (type === 'avatar') setAvatar(reader.result)
        if (type === 'banner') setBanner(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateFormData = () => {
    if (!formData.firstName || formData.firstName === '') {
      setError('First name is required!')
      return false
    }

    if (!formData.lastName || formData.lastName === '') {
      setError('Last name is required!')
      return false
    }
    
    if (!formData.address || formData.address === '') {
      setError('Address is required!')
      return false
    }

    if (!formData.phoneNumber || formData.phoneNumber === '') {
      setError('Phone number is required!')
      return false
    }
    
    if (!formData.yearsOfExperience) {
      setError('Years of experience is required!')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const isFormDataValid = validateFormData()

    if (isFormDataValid) {
      const payload: UpdateCoachProfilePayloadDTO = {
        avatar: typeof avatar === "string" && !avatar.startsWith("http") ? avatar : null,
        banner: typeof banner === "string" && !banner.startsWith("http") ? banner : null,
        ...formData,
        // NOTE: assertion is safe because it is already validated in validate function
        yearsOfExperience: formData.yearsOfExperience as number
      }

      console.log('payload in coach profile update: ', payload)
      
      try {
        const res = await profileService.updateCoachProfile(payload)

        if (res.status === 200) {
          login(res.user)
        } else {
          setError(res.message)
        }
      } catch (error) {
        console.log('error in updating coach profile')
      } finally {
        setLoading(false)
      }

    } else {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-8 bg-white rounded-4xl w-full p-8 min-h-230'>
      <h2 className='text-black text-3xl font-600 w-full text-center mt-8 mb-12'>Personal Profile</h2>

      <div className='flex justify-center gap-20 w-full'>
        
        {/* Left Side - Banner Image */}
        <div className='flex flex-col gap-4 w-1/2 max-w-125'>
          <label className='block text-gray-500'>Banner Image</label>
          <div
            className='relative w-full h-125 bg-gray-bg rounded-lg flex items-center justify-center border border-dashed border-gray-300 cursor-pointer'
          >
            <input
              type='file'
              accept='image/*'
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              onChange={(e) => handleFileChange(e, 'banner')}
            />
            {banner && typeof banner === 'string' ? (
              <Image
                src={banner}
                alt="Banner Preview"
                layout="fill"
              />
            ) : (
              <p className="text-gray-30 text-xl font-medium">Drag and drop or click to upload</p>
            )}
          </div>
        </div>

        {/* Right Side - Avatar Image and Input Fields */}
        <div className='flex flex-col gap-4 w-1/2 max-w-125'>
          {/* <label className='block text-gray-500'>Avatar Image</label> */}
          <div
            className='relative w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border border-dashed border-gray-300 cursor-pointer'
          >
            <input
              type='file'
              accept='image/*'
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              onChange={(e) => handleFileChange(e, 'avatar')}
            />
            {avatar && typeof avatar === 'string' ? (
              <Image
                key={avatar}
                src={avatar}
                alt='Avatar Preview'
                fill
                className='rounded-full'
              />
            ) : (
              <p className='text-gray-30 text-md font-medium'>Upload Avatar</p>
            )}
          </div>

          {/* Text Inputs for User Info */}
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleInputChange}
            className='w-full p-2 border rounded-md'
          />
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleInputChange}
            className='w-full p-2 border rounded-md'
          />
          <input
            type='text'
            name='address'
            placeholder='Address'
            value={formData.address}
            onChange={handleInputChange}
            className='w-full p-2 border rounded-md'
          />
          <input
            type='text'
            name='phoneNumber'
            placeholder='Phone Number'
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className='w-full p-2 border rounded-md'
          />
          <input
            type='number'
            name='yearsOfExperience'
            placeholder='Years of Experience'
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            className='w-full p-2 border rounded-md'
          />
          <select
            name='specialization'
            value={formData.specialization}
            onChange={handleInputChange}
            className='w-full p-2 border rounded-md'
          >
            <option value=''>Select Specialization</option>
            <option value='fitness'>Fitness</option>
            <option value='nutrition'>Nutrition</option>
            <option value='life-coach'>Life Coach</option>
          </select>

          {error && <p className='text-red-500'>{error}</p>}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className='mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md'
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoachProfileUpdateForm
