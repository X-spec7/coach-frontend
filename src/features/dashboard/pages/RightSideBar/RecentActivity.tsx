'use client'
import React, { useState } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'
import { formatTimeTo12Hour } from '@/shared/utils'
import { HeartBeatSvg, ClockSvg, FireSvg } from '@/shared/components/Svg'

const recentActivityDummyData = [
  {
    title: 'Completed Morning Cardio Session',
    description: 'A refreshing start to the day with a 20-minute cardio workout',
    time: '05 12 2024 06:30:00 GMT+9',
    duration: 20,
    calory: 150,
  },
  {
    title: 'Completed Strength Training Circuit',
    description: 'Engaged in a full-body strength training circuit for muscle building',
    time: '05 12 2024 12:00:00 GMT+9',
    duration: 20,
    calory: 150,
  },
  {
    title: 'Finished Yoga Flow Class',
    description: 'Flexibility and mobility session focused on deep stretches',
    time: '05 12 2024 14:00:00 GMT+9',
    duration: 20,
    calory: 150,
  },
  {
    title: 'Completed Core Strength Workout',
    description: 'Focused on core strength exercises to improve stability and balance',
    time: '05 12 2024 19:00:00 GMT+9',
    duration: 20,
    calory: 150,
  }
]

const RecentActivity = () => {
  const [open, setOpen] = useState<number>(0)

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value)
  
  return (
    <div className='flex flex-col gap-5 bg-[#F8F8F8] mt-4 mx-1.5 px-4 pt-4 pb-2 rounded-20'>
      {/* <!-- Title --> */}
      <div className='flex justify-between items-center'>
        <h3 className='text-black font-medium'>Recent Activity</h3>
        <button>...</button>
      </div>

      {/* <!-- Acitivity Accordions --> */}
      {
        recentActivityDummyData.map((activity, index) => {
          const formattedTime = formatTimeTo12Hour(activity.time)

          return (
            <div
              key={index}
              className={`flex justify-start items-start gap-3.5 ${open === index + 1 ? 'mb-4' : ''}`}
            >
              <div className='flex flex-col items-center justify-start w-9 h-full gap-1.5'>
                <div className='flex justify-center items-center w-9 h-9 bg-blue rounded-full'>
                  <HeartBeatSvg width='18' height='18' color='#212738' />
                </div>
                {
                  open === index + 1 && <div className='w-[2px] flex-1 mt-1.5 bg-stroke'/>
                }
              </div>
              <div className='flex flex-1'>
                <Accordion
                  open={open === (index + 1)}
                  className='p-0 border-0'
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(index + 1)}
                    className='p-0 border-0'
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <div className='flex flex-col flex-1 gap-1'>
                      {/* <!-- TIME WITH ARROW SVG --> */}
                      <div className={`flex items-center
                        ${open === index + 1 ? 'justify-between w-full' : 'justify-start gap-2'}
                      `}>
                        <p className='text-gray-20 text-xxs'>{formattedTime}</p>
                        {
                          open !== index + 1
                          ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M3.19064 5.37814C3.3615 5.20729 3.6385 5.20729 3.80936 5.37814L7 8.56878L10.1906 5.37814C10.3615 5.20729 10.6385 5.20729 10.8094 5.37814C10.9802 5.549 10.9802 5.826 10.8094 5.99686L7.30936 9.49686C7.1385 9.66771 6.8615 9.66771 6.69064 9.49686L3.19064 5.99686C3.01979 5.826 3.01979 5.549 3.19064 5.37814Z" fill="#878A94"/>
                            </svg>
                          : <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M3.19064 8.62186C3.3615 8.79271 3.6385 8.79271 3.80936 8.62186L7 5.43122L10.1906 8.62186C10.3615 8.79271 10.6385 8.79271 10.8094 8.62186C10.9802 8.451 10.9802 8.174 10.8094 8.00314L7.30936 4.50314C7.1385 4.33229 6.8615 4.33229 6.69064 4.50314L3.19064 8.00314C3.01979 8.174 3.01979 8.451 3.19064 8.62186Z" fill="#878A94"/>
                            </svg>
                        }
                      </div>

                      <p className='text-black font-medium text-sm'>{activity.title}</p>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className='pt-1.5 px-0 pb-0 border-0'>
                    <div className='text-gray-20 text-xs'>
                      <div className='flex items-center'>
                        <ClockSvg width='13' height='13' color='#878A94'/>
                        <p className='pl-1.5 pr-4'>{activity.duration}-minute</p>
                        <FireSvg width='16' height='16' color='#878A94'/>
                        <p className='pl-1.5'>{activity.calory} Cal</p>
                      </div>
                      <p className='break-word pt-1'>{activity.description}</p>
                    </div>
                  </AccordionBody>
                </Accordion>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecentActivity
