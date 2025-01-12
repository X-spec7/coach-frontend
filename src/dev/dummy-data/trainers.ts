import { Trainer } from '@/shared/types'

export const trainersDummyData: Trainer[] = [
  {
    name: 'Louis Hansen',
    expertise: 'Strength Training',
    id: '1',
    avatarUrl: '/images/avatar/default.png',
    bannerUrl: '/images/banner/banner1.png',
    experience: 10,
    members: 278,
    rating: 4.8,
    classes: [
      {
        category: 'Strength Training',
        title: 'Strength & Conditioning',
        tutor: 'Louis Hansen'
      }
    ],
    contact: {
      email: 'the.trainer@coa-ch.com',
      phone: '+1 (555) 123-4567',
      address: '123 Fitness Street, Suite 200, Wellness City, CA 90210'
    },
    certification: [
      {
        title: 'Certified Strength and Conditioning Specialist (CSCS)',
        year: 2015,
      },
      {
        title: 'NASM Certified Personal Trainer (CPT)',
        year: 2013,
      }
    ],
    reviews: [
      {
        name: 'Sarah Johnson',
        avatarUrl: '/images/user/user-07.png',
        rating: 5,
        review: `Jordan's classes are challenging but rewarding. I've made great progress in strength and fitness, and his positive energy keeps me motivated!`
      },
      {
        name: 'Michael Brown',
        avatarUrl: '/images/user/user-05.png',
        rating: 4.7,
        review: `Jordan is a fantastic trainer whose knowledge and motivation make sessions productive. I've significantly improved my endurance with him.`
      },
      {
        name: 'Lisa Parker',
        avatarUrl: '/images/user/user-10.png',
        rating: 4.9,
        review: `Jordan's training programs have transformed my fitness journey with personalized, attentive classes that truly cater to my needs.`
      }
    ]
  },
  {
    name: 'Jordan Reed',
    id: '2',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner2.png',
    expertise: 'Strength Training',
    classes: [
      {
        category: 'Strength Training',
        title: 'Strength & Conditioning',
        tutor: 'Jordan Reed'
      }
    ],
  },
  {
    name: 'Emily Thompson',
    id: '3',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner3.png',
    expertise: 'Cardio',
    classes: [
      {
        category: 'Cardio Workouts',
        title: 'Ultimate Cardio Challenge',
        tutor: 'Emily Thompson'
      }
    ],
  },
  {
    name: 'Emily Davis',
    id: '4',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner4.png',
    expertise: 'Mind',
    classes: [
      {
        category: 'Mind & Body',
        title: 'Mindfulness Meditation',
        tutor: 'Emily Davis'
      }
    ],
  },
  {
    name: 'Chris Williams',
    id: '5',
    expertise: 'Cardio',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner5.png',
    classes: [
      {
        category: 'Cardio Workouts',
        title: 'Advanced HIIT',
        tutor: 'Chris Williams'
      }
    ],
  },
  {
    name: 'Alex Morgan',
    id: '6',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner4.png',
    expertise: 'Mind',
    classes: [
      {
        category: 'Core Training',
        title: 'Core Strength Builder',
        tutor: 'Alex Morgan'
      }
    ],
  },
  {
    name: 'Sarah Lee',
    id: '7',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner3.png',
    expertise: 'Flexibility',
    classes: [
      {
        category: 'Flexibility & Mobility',
        title: 'Yoga Flow',
        tutor: 'Sarah Lee'
      }
    ],
  },
  {
    name: 'Jessica Turner',
    id: '8',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner6.png',
    expertise: 'Strength Training',
    classes: [
      {
        category: 'Strength Training',
        title: 'Functional Training',
        tutor: 'Jessica Turner'
      }
    ],
  },
  {
    name: 'Chris Johnson',
    id: '9',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner1.png',
    expertise: 'Cardio',
    classes: [
      {
        category: 'Cardio Workouts',
        title: 'HIIT Power Session',
        tutor: 'Chris Johnson'
      }
    ],
  },
  { 
    name: 'Jordan Blake',
    id: '10',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner7.png',
    expertise: 'Strength',
    classes: [
      {
        category: 'Strength Training',
        title: 'Full-Body Strength',
        tutor: 'Jordan Blake '
      }
    ],
  },
  {
    name: 'Mark Davis',
    id: '11',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner1.png',
    expertise: 'Cardio',
    classes: [
      {
        category: 'Cardio Workouts',
        title: 'Endurance Cycling',
        tutor: 'Mark Davis'
      }
    ],
  },
  {
    name: 'Michael Johnson',
    id: '12',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner2.png',
    expertise: 'Strength',
    classes: [
      {
        category: 'Strength Training',
        title: 'Powerlifting Basics',
        tutor: 'Michael Johnson'
      }
    ],
  },
  {
    name: 'Lisa Carter',
    id: '13',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner8.png',
    expertise: 'Flexibility',
    classes: [
      {
        category: 'Flexibility & Mobility',
        title: 'Pilates Stretch',
        tutor: 'Lisa Carter'
      }
    ],
  },
  {
    name: 'Alex Martinez',
    id: '14',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner6.png',
    expertise: 'Flexibility',
    classes: [
      {
        category: 'Core Training',
        title: 'Core Fusion',
        tutor: 'Alex Martinez'
      }
    ],
  },
  {
    name: 'Ava Taylor',
    id: '15',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner4.png',
    expertise: 'Mind',
    classes: [
      {
        category: 'Mind & Body',
        title: 'Prenatal Yoga',
        tutor: 'Ava Taylor '
      }
    ],
  },
  {
    name: 'Sarah Lee',
    id: '16',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner1.png',
    expertise: 'Flexibility',
    classes: [
      {
        category: 'Flexibility & Mobility',
        title: 'Yoga Flow',
        tutor: 'Sarah Lee'
      }
    ],
  },
  {
    name: 'Jessica Turner',
    id: '17',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner3.png',
    expertise: 'Strength',
    classes: [
      {
        category: 'Strength Training',
        title: 'Functional Training',
        tutor: 'Jessica Turner'
      }
    ],
  },
  {
    name: 'Chris Johnson',
    id: '18',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner7.png',
    expertise: 'Cardio',
    classes: [
      {
        category: 'Cardio Workouts',
        title: 'HIIT Power Session',
        tutor: 'Chris Johnson'
      }
    ],
  },
  {
    name: 'Mark Davis',
    id: '19',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner5.png',
    expertise: 'Cardio',
    classes: [
      {
        category: 'Cardio Workouts',
        title: 'Endurance Cycling',
        tutor: 'Mark Davis'
      }
    ],
  },
  {
    name: 'Michael Johnson',
    id: '20',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner8.png',
    expertise: 'Strength',
    classes: [
      {
        category: 'Strength Training',
        title: 'Powerlifting Basics',
        tutor: 'Michael Johnson'
      }
    ],
  },
  {
    name: 'Lisa Carter',
    id: '21',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner2.png',
    expertise: 'Flexibility',
    classes: [
      {
        category: 'Flexibility & Mobility',
        title: 'Pilates Stretch',
        tutor: 'Lisa Carter'
      }
    ],
  },
  {
    name: 'Alex Martinez',
    id: '22',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner4.png',
    expertise: 'Flexibility',
    classes: [
      {
        category: 'Core Training',
        title: 'Core Fusion',
        tutor: 'Alex Martinez'
      }
    ],
  },
  {
    name: 'Ava Taylor',
    id: '23',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner4.png',
    expertise: 'Mind',
    classes: [
      {
        category: 'Mind & Body',
        title: 'Prenatal Yoga',
        tutor: 'Ava Taylor '
      }
    ],
  },
  {
    name: 'Sarah Lee',
    id: '24',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner1.png',
    expertise: 'Flexibility',
    classes: [
      {
        category: 'Flexibility & Mobility',
        title: 'Yoga Flow',
        tutor: 'Sarah Lee'
      }
    ],
  },
  {
    name: 'Jessica Turner',
    id: '25',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner3.png',
    expertise: 'Strength',
    classes: [
      {
        category: 'Strength Training',
        title: 'Functional Training',
        tutor: 'Jessica Turner'
      }
    ],
  },
  {
    name: 'Chris Johnson',
    id: '26',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner7.png',
    expertise: 'Cardio',
    classes: [
      {
        category: 'Cardio Workouts',
        title: 'HIIT Power Session',
        tutor: 'Chris Johnson'
      }
    ],
  },
  {
    name: 'Mark Davis',
    id: '27',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner5.png',
    expertise: 'Cardio',
    classes: [
      {
        category: 'Cardio Workouts',
        title: 'Endurance Cycling',
        tutor: 'Mark Davis'
      }
    ],
  },
  {
    name: 'Michael Johnson',
    id: '28',
    avatarUrl: '',
    bannerUrl: '/images/banner/banner8.png',
    classes: [
      {
        category: 'Strength Training',
        title: 'Powerlifting Basics',
        tutor: 'Michael Johnson'
      }
    ],
  },
]
