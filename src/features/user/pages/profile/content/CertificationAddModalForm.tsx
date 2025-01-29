'use client'

import { ICertification } from '@/shared/types/trainer.type'
import { useState } from 'react'

interface ICertificationModalFormProps {
  onAddCertification: ({certificationTitle, certificationDetail}: ICertification) => void
  onClose: () => void
}

const CertificationAddModalForm: React.FC<ICertificationModalFormProps> = ({
  onAddCertification,
  onClose
}) => {
  const [certificationTitle, setCertificationTitle] = useState<string>('')
  const [certificationDetail, setCertificationDetail] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  
  const handleAddCertification = () => {
    if (!certificationTitle.trim() || !certificationDetail.trim()) {
      setError('Both fields are required!')
      return
    }

    onAddCertification({ certificationTitle, certificationDetail })
    setCertificationTitle('')
    setCertificationDetail('')
    setError(null)
    onClose()
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Add Certification</h2>
      <div className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Certification Title'
          value={certificationTitle}
          onChange={(e) => setCertificationTitle(e.target.value)}
          className='p-2 border rounded-md w-full'
        />
        <textarea
          placeholder='Certification Details'
          value={certificationDetail}
          onChange={(e) => setCertificationDetail(e.target.value)}
          className='p-2 border rounded-md w-full h-24 resize-none'
        />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>

      <div className='mt-6 flex justify-end gap-2'>
        <button onClick={onClose} className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400'>
          Cancel
        </button>
        <button onClick={handleAddCertification} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Add Certification
        </button>
      </div>
    </div>
  )
}

export default CertificationAddModalForm
