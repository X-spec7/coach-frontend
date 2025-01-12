'use client'

import { useState } from 'react'
import Link from 'next/link'
import ClickOutside from '@/shared/components/ClickOutside'

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifying, setNotifying] = useState(true)

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className='relative'>
      <Link
        onClick={() => {
          setNotifying(false)
          setDropdownOpen(!dropdownOpen)
        }}
        href='#'
        className='relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] bg-green border-stroke bg-gray hover:text-primary'
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-30 ${notifying === false ? 'hidden' : 'inline'
            }`}
        >
          <span className='absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-30 opacity-75'></span>
        </span>
        <svg
          className='duration-300 ease-in-out'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
        </svg>
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute z-999 -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
        >
          <div className='px-4.5 py-3'>
            <h5 className='text-sm font-medium text-bodydark2'>
              Notification
            </h5>
          </div>

          <ul className='flex h-auto flex-col overflow-y-auto'>
            <li>
              <Link
                className='flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
                href='#'
              >
                <p className='text-sm'>
                  <span className='text-black dark:text-white'>
                    Edit your information in a swipe
                  </span>{' '}
                  Sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim.
                </p>

                <p className='text-xs'>12 May, 2025</p>
              </Link>
            </li>
            <li>
              <Link
                className='flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
                href='#'
              >
                <p className='text-sm'>
                  <span className='text-black dark:text-white'>
                    It is a long established fact
                  </span>{' '}
                  that a reader will be distracted by the readable.
                </p>

                <p className='text-xs'>24 Feb, 2025</p>
              </Link>
            </li>
            <li>
              <Link
                className='flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
                href='#'
              >
                <p className='text-sm'>
                  <span className='text-black dark:text-white'>
                    There are many variations
                  </span>{' '}
                  of passages of Lorem Ipsum available, but the majority have
                  suffered
                </p>

                <p className='text-xs'>04 Jan, 2025</p>
              </Link>
            </li>
            <li>
              <Link
                className='flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4'
                href='#'
              >
                <p className='text-sm'>
                  <span className='text-black dark:text-white'>
                    There are many variations
                  </span>{' '}
                  of passages of Lorem Ipsum available, but the majority have
                  suffered
                </p>

                <p className='text-xs'>01 Dec, 2024</p>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  )
}

export default DropdownNotification
