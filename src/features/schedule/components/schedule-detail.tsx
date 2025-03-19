"use client"

import type React from "react"
import Image from "next/image"
import { PrimaryButton } from "@/shared/components"

interface ClassData {
    id: number
    name: string
    time: string
    day: string
    trainer: string
    duration?: string
    categoryId: string
    level?: string
    participants?: number
    image?: string
}

interface ScheduleDetailProps {
    classData: ClassData
    onClose: () => void
}

export default function ScheduleDetail({ classData, onClose }: ScheduleDetailProps) {
    return (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg border-l border-gray-200 z-50 overflow-y-auto rounded-4xl m-4">
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">Schedule Detail</h2>
                    <button onClick={onClose} className="text-gray-20 hover:text-gray-700" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 8.586l-4.293-4.293-1.414 1.414L8.586 10l-4.293 4.293 1.414 1.414L10 11.414l4.293 4.293 1.414-1.414L11.414 10l4.293-4.293-1.414-1.414L10 8.586z"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm text-gray-20 mb-1">Time</h3>
                        <p className="font-medium">August 5, {classData.time}</p>
                    </div>

                    <div>
                        <h3 className="text-sm text-gray-20 mb-1">Duration</h3>
                        <p className="font-medium">{classData.duration || "60 minutes"}</p>
                    </div>

                    <div>
                        <h3 className="text-sm text-gray-20 mb-1">Class Info</h3>
                        <div className="mt-2 bg-gray-bg-subtle p-4 rounded-4xl">
                            <Image
                                src={classData.image || "/images/background/2.jpg"}
                                alt={classData.name}
                                width={400}
                                height={300}
                                className="rounded-4xl w-full h-auto object-cover mb-3"
                            />

                            <h4 className="font-bold text-lg">{classData.name}</h4>
                            <p className="text-sm text-gray-600">
                                {classData.categoryId === "strength"
                                    ? "Strength Training"
                                    : classData.categoryId === "cardio"
                                        ? "Cardio Workout"
                                        : classData.categoryId === "flexibility"
                                            ? "Flexibility & Mobility"
                                            : classData.categoryId === "core"
                                                ? "Core Training"
                                                : classData.categoryId === "mind"
                                                    ? "Mind & Body"
                                                    : "Recovery & Relaxation"}
                            </p>
                            <div className="mt-4 space-y-2 border-t-2 border-gray-200 py-2 mb-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-20">Level</span>
                                    <span className="font-medium">{classData.level || "Intermediate"}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-20">Participants</span>
                                    <span className="font-medium">{classData.participants || 15}</span>
                                </div>
                            </div>

                            <PrimaryButton title="See Class" width="w-full" height="py-2" />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm text-gray-20 mb-3">Trainer Info</h3>
                        <div className="flex flex-col items-center justify-center gap-3 bg-gray-bg-subtle p-4 rounded-4xl">
                            <Image src="/images/avatar/default.png" alt="Trainer" width={48} height={48} className="rounded-full h-12 w-12" />
                            <div className="text-center mb-5">
                                <h4 className="font-medium">
                                    {classData.trainer}
                                </h4>
                                <p className="text-sm text-gray-20">Available</p>
                            </div>
                            <PrimaryButton title="See Details" width="w-full" height="py-2" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

