import { ISvgProps } from '@/shared/types'

const ArrowLeft: React.FC<ISvgProps> = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M14 8C14 8.27614 13.7761 8.5 13.5 8.5L2.5 8.5C2.22386 8.5 2 8.27614 2 8C2 7.72386 2.22386 7.5 2.5 7.5L13.5 7.5C13.7761 7.5 14 7.72386 14 8Z' fill={color}/>
      <path fillRule='evenodd' clipRule='evenodd' d='M7.35355 3.14645C7.54882 3.34171 7.54882 3.65829 7.35355 3.85355L3.20711 8L7.35355 12.1464C7.54881 12.3417 7.54881 12.6583 7.35355 12.8536C7.15829 13.0488 6.84171 13.0488 6.64645 12.8536L2.14645 8.35355C1.95118 8.15829 1.95118 7.84171 2.14645 7.64645L6.64645 3.14645C6.84171 2.95118 7.15829 2.95118 7.35355 3.14645Z' fill={color}/>
    </svg>
  )
}

export default ArrowLeft
