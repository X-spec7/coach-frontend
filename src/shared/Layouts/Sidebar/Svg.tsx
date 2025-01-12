import React from 'react'
import { usePathname } from 'next/navigation'

import { BarbellSvg, BoulFoodSvg, CalendarSvg, ChartBarSvg, ChatTeardropDotsSvg, IdentificationBadgeSvg, MonitorSvg, SquaresFourSvg } from '@/shared/components/Svg'

export const LogoutSvg = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1518 4.27681C11.3959 4.03273 11.7916 4.03273 12.0357 4.27681L15.3169 7.55806C15.561 7.80214 15.561 8.19786 15.3169 8.44194L12.0357 11.7232C11.7916 11.9673 11.3959 11.9673 11.1518 11.7232C10.9077 11.4791 10.9077 11.0834 11.1518 10.8393L13.9911 8L11.1518 5.16069C10.9077 4.91661 10.9077 4.52089 11.1518 4.27681Z" fill="#757D83"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 8C5.5 7.65482 5.77982 7.375 6.125 7.375H14.875C15.2202 7.375 15.5 7.65482 15.5 8C15.5 8.34518 15.2202 8.625 14.875 8.625H6.125C5.77982 8.625 5.5 8.34518 5.5 8Z" fill="#757D83"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.866117 0.866117C1.10054 0.631696 1.41848 0.5 1.75 0.5H6.125C6.47018 0.5 6.75 0.779822 6.75 1.125C6.75 1.47018 6.47018 1.75 6.125 1.75L1.75 1.75L1.75 14.25H6.125C6.47018 14.25 6.75 14.5298 6.75 14.875C6.75 15.2202 6.47018 15.5 6.125 15.5H1.75C1.41848 15.5 1.10054 15.3683 0.866117 15.1339C0.631696 14.8995 0.5 14.5815 0.5 14.25V1.75C0.5 1.41848 0.631696 1.10054 0.866117 0.866117Z" fill="#757D83"/>
    </svg>
  )
}

interface NavbarSvgProps {
  route: string
  isItemActive: boolean
}

export const NavbarSvg = ({ route, isItemActive }: NavbarSvgProps) => {

    switch (route) {
      case '/dashboard':
        return (
          <SquaresFourSvg
            width='20'
            height='20'
            color={isItemActive ? '#212738' : '#757D83'}
          />
        )
      case '/statistics':
        return (
          <ChartBarSvg
            width='20'
            height='20'
            color={isItemActive ? '#212738' : '#757D83'}
          />
        )
      case '/exercises':
        return (
          <BarbellSvg
            width='20'
            height='20'
            color={isItemActive ? '#212738' : '#757D83'}
          />
        )
      case '/schedule':
        return (
          <CalendarSvg
            width='20'
            height='20'
            color={isItemActive ? '#212738' : '#757D83'}
          />
        )
      case '/classes':
        return (
          <MonitorSvg
            width='20'
            height='20'
            color={isItemActive ? '#212738' : '#757D83'}
          />
        )
      case '/trainers':
        return (
          <IdentificationBadgeSvg
            width='20'
            height='20'
            color={isItemActive ? '#212738' : '#757D83'}
          />
        )
      case '/messages':
        return (
          <ChatTeardropDotsSvg
            width='20'
            height='20'
            color={isItemActive ? '#212738' : '#757D83'}
          />
        )
      case '/meal-plan':
        return (
          <BoulFoodSvg
            width='20'
            height='20'
            color={isItemActive ? '#212738' : '#757D83'}
          />
        )
        

    }

}
