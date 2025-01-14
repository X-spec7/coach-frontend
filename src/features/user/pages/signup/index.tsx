'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hook'

import { registerAsync } from '../../slice/userSlice'
import { RegisterPayloadDTO } from '../../types/auth.type'

const SignUpPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'Coach',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name as keyof typeof formData]: value }))
  }

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword, userType } = formData
    if (!firstName || !lastName || !email || !password || !userType) {
      return 'All fields are required.'
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.'
    }
    return null
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setIsSubmitting(true)

      const registerPayload: RegisterPayloadDTO = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        user_type: formData.userType
      }

      dispatch(registerAsync(registerPayload))
        .unwrap()
        .then((result) => {
          router.push('/signin')
        })
      
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='border border-stroke bg-white rounded-20 shadow-default min-w-150'>
      <div className='flex flex-wrap items-center w-full'>
        <div className='w-full'>
          <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
            <span className='mb-1.5 block font-medium'>Start for free</span>
            <h2 className='mb-9 text-2xl font-bold text-black sm:text-title-xl2'>
              Sign Up to COA-CH
            </h2>

            <form onSubmit={handleRegister}>
              {error && <p className='text-red-500'>{error}</p>}
              {Object.keys(formData).map((key) => (
                key !== 'userType' ? (
                  <div className='mb-8 flex items-center gap-4' key={key}>
                    <label
                      className='font-medium text-black min-w-32'
                      htmlFor={key}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1).replace('Password', ' Password')}
                    </label>
                    <input
                      type={key.includes('password') || key.includes('Password') ? 'password' : 'text'}
                      id={key}
                      name={key}
                      placeholder={`Enter your ${key}`}
                      className='flex-1 rounded-lg border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary focus-visible:shadow-none'
                      value={formData[key as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className='mb-8 flex items-center gap-4' key={key}>
                    <label
                      className='font-medium text-black min-w-32'
                      htmlFor={key}
                    >
                      User Type
                    </label>
                    <select
                      id={key}
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                      className="flex-1 rounded-lg border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    >
                      <option value="Client" className="py-2">Client</option>
                      <option value="Coach" className="py-2">Coach</option>
                    </select>
                  </div>
                )
              ))}
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full cursor-pointer rounded-lg border border-green bg-green p-2 text-black text-lg font-medium transition hover:bg-opacity-90 disabled:opacity-50'
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>

              <div className='mt-6 text-center'>
                <p>
                  Already have an account?{' '}
                  <Link href='/signin' className='text-primary'>
                    Sign in
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
