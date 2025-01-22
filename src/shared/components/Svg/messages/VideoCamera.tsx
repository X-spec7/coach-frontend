import { ISvgProps } from '@/shared/types'

const VideoCamera: React.FC<ISvgProps> = ({width, height, color}) => {
  return (
    <svg width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M19.6695 5.70312C19.5699 5.6497 19.4576 5.62432 19.3446 5.62969C19.2317 5.63505 19.1223 5.67097 19.0281 5.73359L16.25 7.58203V5.625C16.25 5.29348 16.1183 4.97554 15.8839 4.74112C15.6495 4.5067 15.3315 4.375 15 4.375H2.5C2.16848 4.375 1.85054 4.5067 1.61612 4.74112C1.3817 4.97554 1.25 5.29348 1.25 5.625V14.375C1.25 14.7065 1.3817 15.0245 1.61612 15.2589C1.85054 15.4933 2.16848 15.625 2.5 15.625H15C15.3315 15.625 15.6495 15.4933 15.8839 15.2589C16.1183 15.0245 16.25 14.7065 16.25 14.375V12.4219L19.0281 14.2742C19.1313 14.3412 19.252 14.3763 19.375 14.375C19.5408 14.375 19.6997 14.3092 19.8169 14.1919C19.9342 14.0747 20 13.9158 20 13.75V6.25C19.9992 6.13755 19.9681 6.02739 19.9099 5.93114C19.8518 5.83489 19.7687 5.75612 19.6695 5.70312ZM15 14.375H2.5V5.625H15V14.375ZM18.75 12.582L16.25 10.9156V9.08437L18.75 7.42188V12.582Z' fill={color}/>
    </svg>

  )
}

export default VideoCamera
