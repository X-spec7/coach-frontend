import { TitleWithEllipsis } from '@/shared/components'
import { ICertification } from '@/shared/types/trainer.type'
import { FileTextSvg } from '@/shared/components/Svg'

interface ICertificationProps {
  certifications?: ICertification[]
}

const CertificationCard = ({ certificationTitle, year }: { certificationTitle: string; year: number }) => {
  return (
    <div className='flex justify-start items-center gap-2 p-3 rounded-20 border-stroke border'>
      <div className='flex justify-center items-center w-9 h-9 bg-yellow rounded-2xl'>
        <FileTextSvg width='18' height='18' color='#4D5260' />
      </div>

      <div className='flex flex-col items-start gap-1'>
        <p className='text-black text-xs font-medium'>{certificationTitle}</p>
        <p className='text-gray-20 text-xxs'>{year}</p>
      </div>
    </div>
  )
}

const Certification: React.FC<ICertificationProps> = ({ certifications }) => {
  return (
    <div className='flex flex-col w-full gap-3.5'>
      <TitleWithEllipsis title='Certifications' />

      {
        certifications?.map((certification, index) => (
          <CertificationCard key={index} certificationTitle={certification.title} year={certification.year} />
        ))
      }
    </div>
  )
}

export default Certification
