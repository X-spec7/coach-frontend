'use client'

import { profileService } from '@/features/user/services'
import { UpdateClientProfilePayloadDTO } from '@/features/user/types'
import { BACKEND_HOST_URL } from '@/shared/constants'
import { useAuth } from '@/shared/provider'
import { ChangeEvent, FormEvent, useState } from 'react'

const ClientProfileUpdateForm = () => {
  const { user, login } = useAuth()

  const getFullImageUrl = (path?: string) => (path ? `${BACKEND_HOST_URL}${path}?t=${new Date().getTime()}` : null)

  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(getFullImageUrl(user?.avatarImageUrl))
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    address: user?.address ?? '',
    phoneNumber: user?.phoneNumber ?? '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateFormData = () => {
    if (!formData.firstName || formData.firstName === '') {
      setError('First name is required')
      return false
    }

    if (!formData.lastName || formData.lastName === '') {
      setError('Last name is required')
      return false
    }

    if (!formData.address || formData.address === '') {
      setError('Address is required')
      return false
    }

    if (!formData.phoneNumber || formData.phoneNumber === '') {
      setError('Phone number is required')
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const isFormDataValid = validateFormData()

    if (isFormDataValid) {
      // Simulating an API call
      try {
        // Example: Replace with your API call
        const payload: UpdateClientProfilePayloadDTO = {
          avatar,
          ...formData
        }

        const res = await profileService.updateClientProfile(payload)
        if (res.status === 200) {
          setSuccess('Profile updated successfully!')
          login(res.user)
        } else {
          setError(res.message)
        }
      } catch (err) {
        setError('Failed to update profile. Please try again.')
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 bg-white rounded-4xl w-full p-8 min-h-203">
      <h2 className="text-2xl font-bold">Update Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 pt-10">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            id="client.profile.avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <div
            onClick={() => document.getElementById('client.profile.avatar')?.click()}
            className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 border-dashed cursor-pointer"
          >
            {avatar ? (
              <img src={avatar as string} alt="Avatar Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Avatar
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-5xl">
          {/* First Name */}
          <div className="w-full">
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div className="w-full">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="w-full">
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>

          {/* Phone Number */}
          <div className="w-full">
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error / Success Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 w-full"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClientProfileUpdateForm
