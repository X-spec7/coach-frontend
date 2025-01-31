import { ICoachReview } from "@/shared/types"

interface IOverview {
  experience?: number
  members?: number
  reviews?: ICoachReview[]
}

// TODO: undefined data case
const Overview: React.FC<IOverview> = ({ experience, members, reviews }) => {
  const averageRating = reviews?.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0
  
  return (
    <div className='flex justify-between items-center bg-blue rounded-20 px-4 py-3.5'>
      {/* EXPERIENCE */}
      <div className='flex flex-col items-center justify-center'>
        <p className='text-black text-lg font-bold'>{experience} <span className='text-xs text-black font-medium'>yrs</span></p>
        <p className='text-gray-30 text-xs'>Experience</p>
      </div>

      {/* MEMBERS */}
      <div className='flex flex-col items-center justify-center'>
        <p className='text-black text-lg font-bold'>
          {
            members ? (
              members < 100
              ? members
              : `${Math.floor(members / 50) * 50}+`
            ) : (
              '0'
            )
          }
        </p>
        <p className='text-gray-30 text-xs'>Members</p>
      </div>

      {/* RAITING */}
      <div className='flex flex-col items-center justify-center'>
        <p className='text-black text-lg font-bold'>
          {averageRating}
          <span className='text-xs text-black font-medium'>/5.0</span>
        </p>
        <p className='text-gray-30 text-xs'>{reviews?.length ? 'Rating' : 'No review'}</p>
      </div>
    </div>
  )
}

export default Overview
