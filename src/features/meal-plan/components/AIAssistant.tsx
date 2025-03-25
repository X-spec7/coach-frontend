"use client"

import type React from "react"
import { useState } from "react"
import { FiMessageSquare, FiSend, FiLoader } from "react-icons/fi"

interface AIAssistantProps {
    onGenerateMealPlan: (prompt: string) => void
    isGenerating?: boolean
    className?: string
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onGenerateMealPlan, isGenerating = false, className = "" }) => {
    const [prompt, setPrompt] = useState("")
    const [isExpanded, setIsExpanded] = useState(true)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (prompt.trim() && !isGenerating) {
            onGenerateMealPlan(prompt)
        }
    }

    return (
        <div className={`bg-gray-bg rounded-xl p-4 ${className}`}>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <FiMessageSquare size={20} className="text-green" />
                <h3 className="text-lg font-medium">AI Meal Plan Assistant</h3>
            </div>

            {isExpanded && (
                <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-4">
                        Describe your dietary preferences, goals, or restrictions, and our AI will generate a personalized meal plan
                        for you.
                    </p>

                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="E.g., Create a high-protein meal plan for weight loss..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={isGenerating}
                        />
                        <button
                            type="submit"
                            disabled={isGenerating || !prompt.trim()}
                            className="px-4 py-2 bg-green text-black rounded-md hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? <FiLoader size={16} className="animate-spin" /> : <FiSend size={16} />}
                        </button>
                    </form>

                    {isGenerating && (
                        <div className="mt-4 p-3 bg-green-50 rounded-md">
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-500"></div>
                                <p className="text-sm">Generating your personalized meal plan...</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 text-sm text-gray-500">
                        <p>Example prompts:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setPrompt("Create a 2000 calorie meal plan with 40% carbs, 30% protein, and 30% fat")}
                                    className="text-blue-500 hover:underline"
                                    disabled={isGenerating}
                                >
                                    Create a 2000 calorie meal plan with 40% carbs, 30% protein, and 30% fat
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setPrompt("I need a vegetarian meal plan that's high in protein")}
                                    className="text-blue-500 hover:underline"
                                    disabled={isGenerating}
                                >
                                    I need a vegetarian meal plan that's high in protein
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setPrompt("Generate a low-carb meal plan for someone with diabetes")}
                                    className="text-blue-500 hover:underline"
                                    disabled={isGenerating}
                                >
                                    Generate a low-carb meal plan for someone with diabetes
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AIAssistant

