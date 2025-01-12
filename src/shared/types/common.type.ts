export interface ISvgProps {
  width: string
  height: string
  color: string
}

export interface ILayoutProps {
  children: React.ReactNode
}

export interface Contact {
  email?: string
  phone?: string
  address?: string
}

export interface PrimaryButtonProps {
  width?: string
  height?: string
  title: string
  onClick?: () => void
}
