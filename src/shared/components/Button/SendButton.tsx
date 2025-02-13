import { SendButtonSvg } from '../Svg'
import { IPrimaryButtonProps } from '@/shared/types'

const SendButton: React.FC<IPrimaryButtonProps> = ({width, height, title, onClick}) => {
  return (
    <button
      className={`flex justify-center items-center rounded-20 gap-2 bg-green text-gray-30 font-medium ${width} ${height}`}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <SendButtonSvg width='16' height='20' color='#4D5260' />
    </button>
  )
}

export default SendButton
