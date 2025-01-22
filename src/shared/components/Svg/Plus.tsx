import { ISvgProps } from "@/shared/types"

const Plus: React.FC<ISvgProps> = ({width, height, color}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.625 9C2.625 8.75838 2.78823 8.5625 2.98958 8.5625H11.0104C11.2118 8.5625 11.375 8.75838 11.375 9C11.375 9.24162 11.2118 9.4375 11.0104 9.4375H2.98958C2.78823 9.4375 2.625 9.24162 2.625 9Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 4.625C7.24162 4.625 7.4375 4.78823 7.4375 4.98958V13.0104C7.4375 13.2118 7.24162 13.375 7 13.375C6.75838 13.375 6.5625 13.2118 6.5625 13.0104V4.98958C6.5625 4.78823 6.75838 4.625 7 4.625Z"
        fill={color}
      />
    </svg>
  )
}

export default Plus
