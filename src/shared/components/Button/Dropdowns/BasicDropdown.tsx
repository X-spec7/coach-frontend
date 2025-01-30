'use client'

import React, { useState } from 'react'
import { CaretDownSvg, CaretUpSvg } from '../../Svg'

interface BasicDropdownProps {
  options: string[]
  onSelect?: (option: string | null) => void
}

const BasicDropdown: React.FC<BasicDropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
    if(onSelect) onSelect(option)
  }

  return (
    <div className='relative inline-block'>
      <button
        className='flex justify-center gap-2 items-center w-full px-3 py-2 bg-gray-bg rounded-20 focus:outline-none'
        onClick={toggleDropdown}
      >
        <span className='text-xs text-gray-30 font-medium'>{selectedOption}</span>
        {
          isOpen ?
            <CaretUpSvg width='14' height='18' color='#4D5260' />
          : <CaretDownSvg width='14' height='18' color='#4D5260' />
        }
      </button>
      {isOpen && (
        <ul className='absolute z-10 w-full mt-2 bg-gray-bg border border-gray-300 rounded shadow'>
          {options.map((option, index) => (
            <li
              key={index}
              className='px-3 py-2 text-xs text-gray-30 font-medium hover:bg-gray-200 cursor-pointer'
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BasicDropdown
