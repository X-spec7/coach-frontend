import { ISvgProps } from '@/shared/types/common.type'

const PaperClip: React.FC<ISvgProps> = ({width, height, color}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.4081 2.49411C10.9431 2.00935 11.644 1.74889 12.3657 1.76666C13.0875 1.78443 13.7748 2.07907 14.2853 2.58957C14.7958 3.10007 15.0904 3.78734 15.1082 4.50908C15.1259 5.23082 14.8655 5.93176 14.3807 6.46677C14.3754 6.47263 14.37 6.47839 14.3644 6.48403L7.38237 13.5645C7.37497 13.572 7.36735 13.5793 7.35954 13.5864C7.03853 13.8772 6.61797 14.0335 6.18493 14.0229C5.75189 14.0122 5.33952 13.8354 5.03322 13.5291C4.72692 13.2228 4.55014 12.8104 4.53948 12.3774C4.52881 11.9444 4.68509 11.5238 4.97595 11.2028C4.98109 11.1971 4.98636 11.1915 4.99174 11.1861L10.8488 5.23059C11.0666 5.0091 11.4227 5.00613 11.6442 5.22396C11.8657 5.4418 11.8687 5.79794 11.6509 6.01943L5.80329 11.9653C5.71041 12.0713 5.66066 12.2085 5.66414 12.3497C5.66769 12.4941 5.72662 12.6315 5.82872 12.7336C5.93082 12.8357 6.06827 12.8946 6.21262 12.8982C6.3526 12.9016 6.48866 12.8528 6.59435 12.7614L13.5544 5.70318C13.8405 5.38323 13.9941 4.96614 13.9835 4.53677C13.9728 4.10373 13.7961 3.69137 13.4898 3.38507C13.1835 3.07876 12.7711 2.90198 12.3381 2.89132C11.9099 2.88078 11.494 3.03342 11.1744 3.31798L4.20148 10.3892C3.6748 10.9159 3.37891 11.6302 3.37891 12.375C3.37891 13.1198 3.67479 13.8342 4.20147 14.3609C4.72815 14.8875 5.44248 15.1834 6.18732 15.1834C6.93215 15.1834 7.64648 14.8875 8.17316 14.3609L13.9463 8.60178C14.1662 8.38238 14.5224 8.38281 14.7418 8.60275C14.9612 8.82269 14.9608 9.17884 14.7408 9.39824L8.96866 15.1564C8.231 15.894 7.23052 16.3084 6.18732 16.3084C5.14411 16.3084 4.14363 15.894 3.40598 15.1564C2.66832 14.4187 2.25391 13.4182 2.25391 12.375C2.25391 11.3325 2.66777 10.3326 3.40452 9.59513L10.3852 2.516C10.3926 2.50849 10.4002 2.50119 10.4081 2.49411Z" fill={color}/>
    </svg>
  )
}

export default PaperClip
