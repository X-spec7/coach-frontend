import { IPrimaryButtonProps } from '@/shared/types'

const PrimaryButton: React.FC<IPrimaryButtonProps> = ({
  width,
  height,
  title,
  onClick,
  fontSize,
  disabled,
}) => {
  return (
    <button
      className={`bg-green text-gray-30 rounded-20 ${width} ${height} ${fontSize}`}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default PrimaryButton
