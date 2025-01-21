export interface ISvgProps {
  width: string
  height: string
  color: string
}

export interface ILayoutProps {
  children: React.ReactNode
}

export interface IContact {
  email?: string
  phone?: string
  address?: string
}

export interface IPrimaryButtonProps {
  width?: string
  height?: string
  title: string
  onClick?: () => void
}
