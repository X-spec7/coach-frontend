// hooks/useRoleGuard.ts
import { useRouter } from 'next/navigation'
import { useAuth } from '../provider'
import { IUserRoleGuard } from '../types'

export const useRoleGuard = (requiredRole: IUserRoleGuard) => {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    // Redirect to login if user is not logged in
    router.push('/login')
    return
  }

  switch (requiredRole) {
    case 'Admin':
      if (!user.isSuperuser) router.push('/403')
    case 'Coach':
      if (user.userType !== 'Coach') router.push('/403')
    case 'Client':
      if (user.userType !== 'Client') router.push('/403')
  }
}
