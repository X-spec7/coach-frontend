import { IPrimaryButtonProps } from '@/shared/types'

const PrimaryButton: React.FC<IPrimaryButtonProps> = ({width, height, title, onClick, fontSize}) => {
  return (
    <button
      className={`bg-green text-gray-30 rounded-20 ${width} ${height} ${fontSize}`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default PrimaryButton
