export interface ISession {
  // basic info
  title: string
  startDate: string
  duration: number // in minutes
  // coach info
  coachId: number
  coachFullname: string
  // session desc
  goal: string
  level: string
  description: string
  // booking info
  totalParticipantNumber: number
  currentParticipantNumber: number
  price: number
  // equip
  equipments: string[]
}
