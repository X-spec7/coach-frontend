'use client'

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import { CaretLeftSvg, CaretRightSvg } from '@/shared/components/Svg'
import { capitalizeFirstLetter } from '@/shared/utils'
import { useState } from 'react'

function Calendar() {
  const today = startOfToday()
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const [currMonth, setCurrMonth] = useState(() => format(today, 'MMM-yyyy'))
  let firstDayOfMonth = parse(currMonth, 'MMM-yyyy', new Date())

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  })

  const getPrevMonth = () => {
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 })
    setCurrMonth(format(firstDayOfPrevMonth, 'MMM-yyyy'))
  }

  const getNextMonth = () => {
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 })
    setCurrMonth(format(firstDayOfNextMonth, 'MMM-yyyy'))
  }

  return (
    <div className='w-full flex items-center justify-center bg-white'>
      <div className='w-full'>
        <div className='flex items-center justify-between mb-4 px-1'>
          <p className='font-medium text-black'>
            {format(firstDayOfMonth, 'MMMM yyyy')}
          </p>
          <div className='flex items-center justify-end gap-2'>
            <button
              className='flex justify-center items-center w-7.5 h-7.5 bg-gray-bg rounded-full'
              onClick={() => getPrevMonth()}
            >
              <CaretLeftSvg width='18' height='18' color='#212738' />
            </button>
            <button
              className='flex justify-center items-center w-7.5 h-7.5 bg-gray-bg rounded-full'
              onClick={() => getNextMonth()}
            >
              <CaretRightSvg width='18' height='18' color='#212738' />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-7 place-items-center'>
          {days.map((day, idx) => {
            return (
              <div key={idx} className='text-gray-20 font-medium h-10'>
                {capitalizeFirstLetter(day)}
              </div>
            )
          })}
        </div>
        <div className='grid grid-cols-7 place-items-center'>
          {daysInMonth.map((day, idx) => {
            return (
              <div key={idx} className='flex justify-center items-center w-11 h-10'>
                <p
                  className={`cursor-pointer flex items-center justify-center font-semibold h-8.5 w-8.5 rounded-full ${
                    isSameMonth(day, firstDayOfMonth) ? 'text-gray-30' : 'text-gray-10'
                  } ${!isToday(day) && 'hover:bg-blue'} ${
                    isToday(day) && 'bg-yellow text-black'
                  }`}
                >
                  {format(day, 'd')}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Calendar
