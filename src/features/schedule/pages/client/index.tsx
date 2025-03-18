import React from 'react'
import ContentHeader from './ContentHeader'
import Calendar from './Calendar'

const ClientSchedulePage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <ContentHeader />
      <Calendar />
    </div>
  )
}

export default ClientSchedulePage
