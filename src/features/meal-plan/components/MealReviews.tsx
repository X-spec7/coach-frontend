import type React from "react"
import Image from "next/image"
import type { MealReview } from "../types/class.dto"
import { StarSvg } from "@/shared/components/Svg"

interface MealReviewsProps {
    reviews: MealReview[]
}

const MealReviews: React.FC<MealReviewsProps> = ({ reviews }) => {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Reviews</h2>
            <div className="flex md:flex-row flex-col gap-4 h-full">
                {reviews.map((review) => (
                    <div key={review.id} className="flex h-full flex-col gap-3 bg-white p-4 rounded-4xl shadow-md">
                        <div className="flex items-center gap-4">
                            <Image
                                src={review.userImage || "/images/meal/vegan_energy_boost.png"}
                                alt={review.userName}
                                width={40}
                                height={40}
                                className="rounded-full h-10 w-10 object-cover"
                            />
                            <div className="flex flex-col gap-1">
                                <h3 className="font-medium">{review.userName}</h3>
                                <div className="flex items-center gap-1">
                                    <StarSvg
                                        height="16"
                                        width="16"
                                        color="#FFD700"
                                    />
                                    <span className="text-gray-700 text-xs">{review.rating}/5</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 border-t-2 border-gray-bg pt-4">
                            <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MealReviews

