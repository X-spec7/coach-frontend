import { ISvgProps } from '@/shared/types'

const Check: React.FC<ISvgProps> = ({width, height, color}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1219 3.62814C12.2927 3.799 12.2927 4.076 12.1219 4.24686L5.99686 10.3719C5.826 10.5427 5.549 10.5427 5.37814 10.3719L2.31564 7.30936C2.14479 7.1385 2.14479 6.8615 2.31564 6.69064C2.4865 6.51979 2.7635 6.51979 2.93436 6.69064L5.6875 9.44378L11.5031 3.62814C11.674 3.45729 11.951 3.45729 12.1219 3.62814Z" fill={color} />
    </svg>

  )
}

export default Check
