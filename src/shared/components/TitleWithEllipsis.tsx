import { EllipsisMenu } from './Menu'

interface TitleWithEllipsisProps {
  title: string
  menus?: string[]
  onClick?: (menu: string) => void
}

const TitleWithEllipsis: React.FC<TitleWithEllipsisProps> = ({ title, menus, onClick }) => {
  return (
    <div className='flex justify-between items-center w-full'>
      <h2 className='text-black font-medium'>{title}</h2>
      <EllipsisMenu menus={menus ?? []} onClick={onClick} />
    </div>
  )
}

export default TitleWithEllipsis
