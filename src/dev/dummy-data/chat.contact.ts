import { IContactUser } from '@/features/messages/types'

export const contactUserDummyData: IContactUser[] = [
  {
    id: 1,
    fullName: 'Alice Johnson',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'trainer',
    unreadCount: 2,
    lastMessage: {
      id: 1,
      content: 'Hey, how can I help you today?',
      isRead: false,
      isSent: true,
      sentDate: new Date().toISOString(), // Today
    },
  },
  {
    id: 2,
    fullName: 'Bob Smith',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'client',
    unreadCount: 0,
    lastMessage: {
      id: 2,
      content: 'Thanks for the session!',
      isRead: true,
      isSent: true,
      sentDate: new Date().toISOString(), // Today
    },
  },
  {
    id: 3,
    fullName: 'Charlie Davis',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'trainer',
    unreadCount: 5,
    lastMessage: {
      id: 3,
      content: 'Let me know your availability.',
      isRead: false,
      isSent: true,
      sentDate: new Date().toISOString(), // Today
    },
  },
  {
    id: 4,
    fullName: 'Dana Lee',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'client',
    unreadCount: 1,
    lastMessage: {
      id: 4,
      content: 'Looking forward to our next session.',
      isRead: false,
      isSent: true,
      sentDate: new Date().toISOString(), // Today
    },
  },
  {
    id: 5,
    fullName: 'Eve Martin',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'trainer',
    unreadCount: 3,
    lastMessage: {
      id: 5,
      content: 'Do you have any questions?',
      isRead: false,
      isSent: true,
      sentDate: new Date().toISOString(), // Today
    },
  },
  {
    id: 6,
    fullName: 'Frank Wilson',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'client',
    unreadCount: 0,
    lastMessage: {
      id: 6,
      content: 'Thanks for the update.',
      isRead: true,
      isSent: true,
      sentDate: '2024-12-20T10:30:00Z',
    },
  },
  {
    id: 7,
    fullName: 'Grace Thomas',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'trainer',
    unreadCount: 4,
    lastMessage: {
      id: 7,
      content: 'Can you confirm the schedule?',
      isRead: false,
      isSent: true,
      sentDate: '2024-12-20T15:45:00Z',
    },
  },
  {
    id: 8,
    fullName: 'Henry Carter',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'client',
    unreadCount: 1,
    lastMessage: {
      id: 8,
      content: 'I’ll get back to you soon.',
      isRead: false,
      isSent: true,
      sentDate: '2024-12-19T08:15:00Z',
    },
  },
  {
    id: 9,
    fullName: 'Ivy Baker',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'trainer',
    unreadCount: 0,
    lastMessage: {
      id: 9,
      content: 'Thank you!',
      isRead: true,
      isSent: true,
      sentDate: '2024-12-18T14:20:00Z',
    },
  },
  {
    id: 10,
    fullName: 'Jackie Lopez',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'client',
    unreadCount: 2,
    lastMessage: {
      id: 10,
      content: 'See you next week.',
      isRead: false,
      isSent: true,
      sentDate: '2024-12-17T19:00:00Z',
    },
  },
  {
    id: 11,
    fullName: 'Kyle Peterson',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'trainer',
    unreadCount: 3,
    lastMessage: {
      id: 11,
      content: 'Let’s discuss the plan.',
      isRead: false,
      isSent: true,
      sentDate: '2024-12-16T16:30:00Z',
    },
  },
  {
    id: 12,
    fullName: 'Liam Reynolds',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'client',
    unreadCount: 0,
    lastMessage: {
      id: 12,
      content: 'All clear. Thanks.',
      isRead: true,
      isSent: true,
      sentDate: '2024-12-15T09:45:00Z',
    },
  },
  {
    id: 13,
    fullName: 'Mia Sanchez',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'trainer',
    unreadCount: 1,
    lastMessage: {
      id: 13,
      content: 'Let me know your thoughts.',
      isRead: false,
      isSent: true,
      sentDate: '2024-12-14T18:10:00Z',
    },
  },
  {
    id: 14,
    fullName: 'Nina Collins',
    avatarUrl: '/media/avatar_images/7_avatar.webp',
    userType: 'client',
    unreadCount: 2,
    lastMessage: {
      id: 14,
      content: 'Sounds good. Thanks!',
      isRead: false,
      isSent: true,
      sentDate: '2024-12-13T20:25:00Z',
    },
  },
]

export default contactUserDummyData
