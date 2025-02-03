import { useRouter } from 'next/navigation'
import { useAuth } from '../provider'
import { IUserRoleGuard } from '../types'

export const useRoleGuard = (requiredRole: IUserRoleGuard) => {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) return router.push('/signin')
  if (requiredRole === 'Admin' && !user.isSuperuser) return router.push('/403')
  if (requiredRole !== user.userType) return router.push('/403')
}
