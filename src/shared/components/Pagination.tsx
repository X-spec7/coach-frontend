'use client'

import Link from 'next/link'
import { CaretRightSvg, CaretLeftSvg } from './Svg'
import { usePathname, useSearchParams } from 'next/navigation'

interface PaginationProps {
  countPerPage: number
  totalCounts: number
}

const arrowDisableColor = '#BCBEC3'
const arrowAbleColor = '#212738'

const Pagination: React.FC<PaginationProps> = ({
  countPerPage,
  totalCounts
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const totalPages = Math.ceil(totalCounts / countPerPage)

  const getPaginationRange = () => {
    const range = []
    for (let i = 1; i <= totalPages; i++) {
      range.push(i)
    }
    return range
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const paginationRange = getPaginationRange()

  const showingStart = (currentPage - 1) * countPerPage + 1
  const showingEnd = totalCounts !== 0 ? Math.min(currentPage * countPerPage, totalCounts) : 0

  return (
    <div className='flex flex-col md:flex-row items-center justify-between w-full mt-4 space-y-2 md:space-y-0'>
      {/* Showing Text */}
      <span className='text-gray-20 text-xs'>
        Showing <span className='text-gray-30 p-2 bg-gray-bg rounded-20'>{showingStart} - {showingEnd}</span> out of {totalCounts}
      </span>

      {/* Pagination Controls */}
      <nav className='flex items-center justify-center space-x-2'>
        {/* Previous Button */}
        <PaginationArrow
          direction='left'
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        {/* Page Numbers */}
        {paginationRange.map((page) => (
          <PaginationNumber
            key={page}
            page={page}
            isActive={currentPage === page}
            href={createPageURL(page)}
          />
        ))}

        {/* Next Button */}
        <PaginationArrow
          direction='right'
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </nav>
    </div>
  )
}

const PaginationNumber = ({
  page,
  href,
  isActive,
}: {
  page: number | string
  href: string
  isActive: boolean
}) => {
  const className = `flex justify-center items-center w-10 h-10 rounded-full text-gray-30 ${
    isActive
      ? 'bg-green'
      : 'bg-gray-bg hover:text-black'
  }`

  return isActive ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

const PaginationArrow = ({
  href,
  direction,
  isDisabled,
}: {
  href: string
  direction: 'left' | 'right'
  isDisabled?: boolean
}) => {
  const className = `flex justify-center items-center w-10 h-10 rounded-full bg-gray-bg ${
    isDisabled
      ? 'cursor-not-allowed pointer-events-none'
      : ''
  }`
  const icon =
    direction === 'left' ? (
      <CaretLeftSvg width='14' height='14' color={isDisabled ? arrowDisableColor : arrowAbleColor}/>
    ) : (
      <CaretRightSvg width='14' height='14' color={isDisabled ? arrowDisableColor : arrowAbleColor}/>
    )

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link className={className} href={href}>
        {icon}
      </Link>
    )
}

export default Pagination
