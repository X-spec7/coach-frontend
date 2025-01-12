import { ArrowLeftSvg } from '../Svg'

interface BackButtonProps {
  buttonTitle: string
  handleBack: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ buttonTitle, handleBack }) => {

  const handleBackClick = () => {
    handleBack()
  }

  return (
    <button
      onClick={handleBackClick}
      className='flex justify-start items-center gap-2 text-xs text-gray-20 cursor-pointer'
    >
      <ArrowLeftSvg width='16' height='16' color='#878A94' />
      <p>{buttonTitle}</p>
    </button>
  )
}

export default BackButton
