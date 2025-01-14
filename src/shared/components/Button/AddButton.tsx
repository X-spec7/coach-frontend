import React from 'react'

interface AddButtonProps {
  title?: string
  onClick?: () => {}
}

const AddButton: React.FC<AddButtonProps> = ({title, onClick}) => {
  return (
    <button
      className={`flex justify-center items-center bg-green text-gray-30 text-xxs
        ${title ? 'px-2.5 py-1.5 rounded-20' : 'p-1.5 rounded-full'}
      `}
      onClick={onClick}
    >
      {/* Plus SVG */}
      <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V18" stroke="#212738" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12H18" stroke="#212738" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {
        title && <h4>{title}</h4>
      }
    </button>
  )
}

export default AddButton
