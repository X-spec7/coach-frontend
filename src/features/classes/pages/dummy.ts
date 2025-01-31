import { IClass } from "@/shared/types";

const myClasses: IClass[] = [
  {
    id: 1,
    coachId: 101,
    coachFullname: "John Doe",
    title: "Morning Yoga Flow",
    description: "A perfect way to start your day with gentle yoga movements.",
    classBannerImageUrl: "https://example.com/yoga1.jpg",
    category: "Yoga",
    intensity: "Low",
    level: "Beginner",
    price: 20,
    sessionCount: 5,
    durationPerSession: 45,
    caloriePerSession: 200,
    benefits: ["Flexibility", "Stress Relief", "Better Posture"],
    equipments: ["Yoga Mat"]
  },
  {
    id: 2,
    coachId: 102,
    coachFullname: "Jane Smith",
    title: "HIIT Burn",
    description: "High-Intensity Interval Training to get you sweating.",
    classBannerImageUrl: "https://example.com/hiit.jpg",
    category: "HIIT",
    intensity: "High",
    level: "Advanced",
    price: 25,
    sessionCount: 6,
    durationPerSession: 30,
    caloriePerSession: 500,
    benefits: ["Fat Burn", "Endurance", "Strength"],
    equipments: ["Dumbbells", "Jump Rope"]
  },
  {
    id: 3,
    coachId: 103,
    coachFullname: "Emily Carter",
    title: "Pilates Core Strength",
    description: "By combining strength training, cardio, and flexibility exercises, this class offers a well-rounded approach to fitness, targeting all major muscle groups while improving endurance and mobility.",
    classBannerImageUrl: "https://example.com/pilates.jpg",
    category: "Pilates",
    intensity: "Medium",
    level: "Intermediate",
    price: 22,
    sessionCount: 4,
    durationPerSession: 40,
    caloriePerSession: 300,
    benefits: ["Core Strength", "Flexibility", "Posture"],
    equipments: ["Resistance Band"]
  },
  {
    id: 4,
    coachId: 104,
    coachFullname: "Mike Johnson",
    title: "Strength Training Basics",
    description: "Learn the fundamentals of strength training with guided workouts.",
    classBannerImageUrl: "https://example.com/strength.jpg",
    category: "Strength Training",
    intensity: "Medium",
    level: "Beginner",
    price: 30,
    sessionCount: 8,
    durationPerSession: 50,
    caloriePerSession: 350,
    benefits: ["Muscle Gain", "Endurance", "Strength"],
    equipments: ["Dumbbells", "Barbell"]
  },
  {
    id: 5,
    coachId: 105,
    coachFullname: "Sophia Lee",
    title: "Dance Cardio Blast",
    description: "A fun, high-energy dance workout to keep you moving!",
    classBannerImageUrl: "https://example.com/dance.jpg",
    category: "Cardio",
    intensity: "High",
    level: "All Levels",
    price: 18,
    sessionCount: 7,
    durationPerSession: 35,
    caloriePerSession: 450,
    benefits: ["Weight Loss", "Endurance", "Fun Workout"],
    equipments: []
  }
];

const recommendedClasses: IClass[] = myClasses.slice(0, 4);

const featuredClass: IClass = myClasses[2];

const allClasses: IClass[] = myClasses.concat([
  {
    id: 6,
    coachId: 106,
    coachFullname: "Liam Brown",
    title: "Boxing Fundamentals",
    description: "Learn the basics of boxing with shadow drills and pad work.",
    classBannerImageUrl: "https://example.com/boxing.jpg",
    category: "Boxing",
    intensity: "Medium",
    level: "Beginner",
    price: 28,
    sessionCount: 6,
    durationPerSession: 40,
    caloriePerSession: 400,
    benefits: ["Agility", "Strength", "Endurance"],
    equipments: ["Gloves"]
  }
]);

export { myClasses, recommendedClasses, featuredClass, allClasses }
