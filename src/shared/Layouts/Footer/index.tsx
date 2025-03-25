import React from 'react'
import Link from 'next/link'
import Socials from './Socials'

const Footer = () => {
  return (
    <div className='flex flex-wrap justify-between items-center w-full mt-4 gap-4'>
      <div className='flex items-center text-sm'>
        <h2 className='text-gray-20 font-medium mr-6'>Copyright ©{new Date().getFullYear()} Coa-ch</h2>
        <div className='flex justify-start items-center gap-4 text-gray-10'>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Term and conditions</Link>
          <Link href="#">Contact</Link>
        </div>
      </div>

      <Socials />

    </div>
  )
}

export default Footer
