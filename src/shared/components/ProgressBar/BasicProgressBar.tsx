interface BasicProgressBarProps {
  bgColor: string
  progressColor: string
  radius: string
  height: string
  progress: number
}

const BasicProgressBar: React.FC<BasicProgressBarProps> = ({
  bgColor,
  progressColor,
  radius,
  height,
  progress,
}) => {
  return (
    <div className={`${bgColor} ${height} ${radius} w-full`}>
      <div
        className={`${progressColor} ${radius} h-full`}
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  )
}

export default BasicProgressBar
