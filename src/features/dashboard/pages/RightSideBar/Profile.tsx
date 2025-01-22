'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TitleWithEllipsis } from '@/shared/components'
import { BACKEND_HOST_URL } from '@/shared/constants'
import { useAuth } from '@/shared/provider'

interface ProfileProps {
  fullname: string
  level: string
  // TODO: should figure out what this number means, and give reasonable name
  number: number
  weight: number
  height: number
  age: number
}

interface ProfileDetailProps {
  label: Label;
  value: number;
}

type Label = 'Weight' | 'Height' | 'Age'

const getUnitByLabel = (label: Label): string => {
  switch (label) {
    case 'Weight':
      return 'kg'
    case 'Height':
      return 'cm'
    case 'Age':
      return 'yrs'
  }
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ label, value }) => {

  const unit = getUnitByLabel(label)

  return (
    <div className='flex flex-col justify-center items-center gap-1'>
      <span className='text-gray-20 text-xxs'>{label}</span>
      <span className='text-black font-medium'>{value} {unit}</span>
    </div>
  )
}

const profileAvatarUrl = '/images/user/user-01.png'

const Profile: React.FC<ProfileProps> = ({ fullname, level, number, weight, height, age }) => {
  const { user } = useAuth()
  const router = useRouter()


  const onLogout = () => {
    localStorage.removeItem("access_token")
    router.push('/signin')
  }

  const [isUserLoaded, setIsUserLoaded] = useState(() => !!(user && user.firstName !== ''))

  useEffect(() => {
    setIsUserLoaded(!!(user && user.firstName !== ''))
  }, [user])

  const onClickEllipsis = (menu: string) => {
    const routerName = menu.toLowerCase()
    router.push(`/${routerName}`)
  }

  return (
    <div className='flex flex-col justify-start gap-5 pb-2 px-1.5'>
      <TitleWithEllipsis
        title='My Profile'
        menus={['Profile']}
        onClick={onClickEllipsis}
      />

      {/* <!-- Profile Overview --> */}
      <div className='flex justify-center items-center gap-4'>
        {!isUserLoaded ? (
          <div className='h-9 w-9 bg-gray-300 animate-pulse rounded-full'></div>
        ) : (user?.avatarImageUrl ? (
          <Image
            width={36}
            height={36}
            src={BACKEND_HOST_URL + user.avatarImageUrl}
            style={{
              width: 'auto',
              height: 'auto',
            }}
            alt='User'
            className='rounded-full'
          />
        ) : (
          <Image
            width={36}
            height={36}
            src={profileAvatarUrl}
            style={{
              width: 'auto',
              height: 'auto',
            }}
            alt='User'
          />
        ))}

        {/* Assertion is Okay, cause it is checked in the layout */}
        <div>
          <h4 className='text-lg text-black font-medium'>{user!.firstName} {user!.lastName}</h4>
          {/* TODO: add svg images here */}
          <div className='flex justify-start items-center gap-1 text-gray-20 text-xs'>
            <p>{level}</p>
            <span className='w-1 h-1 rounded-full bg-gray-20'></span>
            <p>{number.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* <!-- Profile Detail --> */}
      <div className='flex justify-between items-center px-6 py-3 rounded-20 bg-blue-subtle'>
        <ProfileDetail label='Weight' value={weight} />
        <ProfileDetail label='Height' value={height} />
        <ProfileDetail label='Age' value={age} />
      </div>
    </div>
  )
}

export default Profile
