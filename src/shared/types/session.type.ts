export interface ISession {
  id: number
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
  bannerImageUrl?: string
  // booking info
  totalParticipantNumber: number
  currentParticipantNumber: number
  price: number
  // equip
  equipments?: string[]
  // corresponding scheduled meeting
  meetingId: number
}

export interface IClassSession {
  title: string
  startDate: string
  duration: number
  description: string
  totalParticipantNumber: number
  calorie: number
  equipments?: string[]
}
