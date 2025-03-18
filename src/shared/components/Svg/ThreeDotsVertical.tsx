import { ISvgProps } from '@/shared/types'

const ThreeDotsVertical: React.FC<ISvgProps> = ({ width, height, color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg >
    )
}

export default ThreeDotsVertical
