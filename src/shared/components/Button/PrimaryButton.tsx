import { IPrimaryButtonProps } from '@/shared/types'

const PrimaryButton: React.FC<IPrimaryButtonProps> = ({width, height, title, onClick}) => {
  return (
    <button
      className={`bg-green text-gray-30 ${width} ${height}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default PrimaryButton
