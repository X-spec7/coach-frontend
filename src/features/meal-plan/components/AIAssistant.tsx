"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FiMessageSquare, FiSend, FiLoader, FiChevronRight, FiChevronLeft, FiCheck } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { UserData } from "../types/class.dto"

interface AIAssistantProps {
    onGenerateMealPlan: (prompt: string, userData: UserData) => void
    isGenerating?: boolean
    className?: string
}

// Initial user data
const initialUserData: UserData = {
    sex: "",
    age: null,
    height: null,
    weight: null,
    sleepHours: null,
    jobActivity: "",
    freeTimeActivity: "",
    mainGoal: "",
    weightLossTarget: null,
    bmr: null,
    calorieNeed: null,
    calorieDeficit: null,
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onGenerateMealPlan, isGenerating = false, className = "" }) => {
    const [prompt, setPrompt] = useState("")
    const [isExpanded, setIsExpanded] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [userData, setUserData] = useState<UserData>(initialUserData)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [calculatedValues, setCalculatedValues] = useState({
        bmr: 0,
        calorieNeed: 0,
        calorieDeficit: 0,
        dailyEnergyAdvice: "",
    })

    const totalSteps = 4

    // Calculate BMR and calorie needs when user data changes
    useEffect(() => {
        let bmr = 0
        let calorieNeed = 0
        let calorieDeficit = 0
        let dailyEnergyAdvice = ""

        if (userData.sex && userData.age && userData.height && userData.weight) {
            // Calculate BMR using Mifflin-St Jeor Equation
            if (userData.sex === "male") {
                bmr = 10 * (userData.weight || 0) + 6.25 * (userData.height || 0) - 5 * (userData.age || 0) + 5
            } else {
                bmr = 10 * (userData.weight || 0) + 6.25 * (userData.height || 0) - 5 * (userData.age || 0) - 161
            }

            // Activity multiplier based on job and free time
            let activityMultiplier = 1.2 // Base: sedentary

            // Job activity contribution
            if (userData.jobActivity === "sedentary") {
                activityMultiplier += 0
            } else if (userData.jobActivity === "light") {
                activityMultiplier += 0.1
            } else if (userData.jobActivity === "moderate") {
                activityMultiplier += 0.2
            } else if (userData.jobActivity === "active") {
                activityMultiplier += 0.3
            }

            // Free time activity contribution
            if (userData.freeTimeActivity === "sedentary") {
                activityMultiplier += 0
            } else if (userData.freeTimeActivity === "light") {
                activityMultiplier += 0.1
            } else if (userData.freeTimeActivity === "moderate") {
                activityMultiplier += 0.2
            } else if (userData.freeTimeActivity === "active") {
                activityMultiplier += 0.3
            }

            // Sleep adjustment (7-8 hours is neutral)
            if (userData.sleepHours && userData.sleepHours < 7) {
                activityMultiplier -= 0.05 // Less sleep can increase calorie needs
            } else if (userData.sleepHours && userData.sleepHours > 8) {
                activityMultiplier -= 0.05 // More sleep can decrease calorie needs
            }

            // Calculate daily calorie need
            calorieNeed = Math.round(bmr * activityMultiplier)

            // Calculate calorie deficit based on goal
            calorieDeficit = 0
            dailyEnergyAdvice = ""

            if (userData.mainGoal === "lose_weight") {
                calorieDeficit = -500 // Standard deficit for weight loss
                dailyEnergyAdvice = "Calorie deficit for steady weight loss"
            } else if (userData.mainGoal === "maintain_weight") {
                calorieDeficit = 0
                dailyEnergyAdvice = "Balanced calories for weight maintenance"
            } else if (userData.mainGoal === "gain_muscle") {
                calorieDeficit = 300 // Surplus for muscle gain
                dailyEnergyAdvice = "Slight calorie surplus for muscle growth"
            }

            // Adjust deficit based on weight loss target if applicable
            if (userData.mainGoal === "lose_weight" && userData.weightLossTarget) {
                // More aggressive deficit for higher targets, but capped for safety
                const targetAdjustment = Math.min(userData.weightLossTarget * 100, 300)
                calorieDeficit = -500 - targetAdjustment
                dailyEnergyAdvice = `${Math.abs(calorieDeficit)} calorie deficit for ${userData.weightLossTarget}kg weight loss goal`
            }

            setCalculatedValues({
                bmr: Math.round(bmr),
                calorieNeed,
                calorieDeficit,
                dailyEnergyAdvice,
            })

            // Update user data with calculated values
            setUserData((prev) => ({
                ...prev,
                bmr: Math.round(bmr),
                calorieNeed,
                calorieDeficit,
            }))
        } else {
            setCalculatedValues({
                bmr: 0,
                calorieNeed: 0,
                calorieDeficit: 0,
                dailyEnergyAdvice: "",
            })
        }
    }, [
        userData.sex,
        userData.age,
        userData.height,
        userData.weight,
        userData.jobActivity,
        userData.sleepHours,
        userData.freeTimeActivity,
        userData.mainGoal,
        userData.weightLossTarget,
    ])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }

        // Handle numeric inputs
        if (type === "number") {
            setUserData((prev) => ({
                ...prev,
                [name]: value ? Number(value) : null,
            }))
        } else {
            setUserData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {}

        if (step === 1) {
            if (!userData.sex) newErrors.sex = "Please select your sex"
            if (!userData.age) newErrors.age = "Please enter your age"
            if (!userData.height) newErrors.height = "Please enter your height"
            if (!userData.weight) newErrors.weight = "Please enter your weight"
        } else if (step === 2) {
            if (!userData.sleepHours) newErrors.sleepHours = "Please enter your average sleep hours"
            if (!userData.jobActivity) newErrors.jobActivity = "Please select your job activity level"
            if (!userData.freeTimeActivity) newErrors.freeTimeActivity = "Please select your free time activity level"
        } else if (step === 3) {
            if (!userData.mainGoal) newErrors.mainGoal = "Please select your main goal"
            if (userData.mainGoal === "lose_weight" && !userData.weightLossTarget) {
                newErrors.weightLossTarget = "Please enter your weight loss target"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (prompt.trim() || !isGenerating) {
            // Generate a comprehensive prompt based on user data
            const generatedPrompt = `
        Create a personalized meal plan for a ${userData.age} year old ${userData.sex} with the following details:
        - Height: ${userData.height}cm, Weight: ${userData.weight}kg
        - BMR: ${calculatedValues.bmr} calories
        - Daily calorie need: ${calculatedValues.calorieNeed} calories
        - Goal: ${userData.mainGoal.replace("_", " ")}${userData.mainGoal === "lose_weight" ? `, targeting ${userData.weightLossTarget}kg weight loss` : ""}
        - Daily calorie target: ${calculatedValues.calorieNeed + calculatedValues.calorieDeficit} calories
        - Sleep: ${userData.sleepHours} hours per day
        - Job activity: ${userData.jobActivity}
        - Free time activity: ${userData.freeTimeActivity}
        
        Additional notes: ${prompt}
      `.trim()

            onGenerateMealPlan(generatedPrompt, userData)
            setShowForm(false)
            setCurrentStep(1)
        }
    }

    const startForm = () => {
        setShowForm(true)
        setUserData(initialUserData)
        setErrors({})
    }

    // Animation variants for form steps
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    }

    return (
        <div className={`bg-white shadow-md rounded-xl overflow-hidden ${className}`}>
            <div
                className="flex items-center gap-2 p-4 cursor-pointer border-b border-gray-200 bg-gray-50"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <FiMessageSquare size={20} className="text-green-600" />
                <h3 className="text-lg font-medium flex-1">AI Meal Plan Assistant</h3>
                {isExpanded ? (
                    <FiChevronLeft size={20} className="text-gray-500" />
                ) : (
                    <FiChevronRight size={20} className="text-gray-500" />
                )}
            </div>

            {isExpanded && (
                <div className="p-4">
                    {!showForm ? (
                        <>
                            <p className="text-sm text-gray-600 mb-4">
                                Our AI assistant can create a personalized meal plan based on your specific needs and goals. Tell us
                                about yourself to get started.
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={startForm}
                                    className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FiMessageSquare size={18} />
                                    <span>Create Personalized Meal Plan</span>
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">or use quick prompt</span>
                                    </div>
                                </div>

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
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isGenerating ? <FiLoader size={16} className="animate-spin" /> : <FiSend size={16} />}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white rounded-lg">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-medium">Personalize Your Meal Plan</h4>
                                    <div className="text-sm text-gray-500">
                                        Step {currentStep} of {totalSteps}
                                    </div>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <form onSubmit={(e) => e.preventDefault()}>
                                <AnimatePresence initial={false} custom={currentStep}>
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            custom={currentStep}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h5 className="font-medium text-gray-700">Basic Information</h5>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="sex"
                                                            value="male"
                                                            checked={userData.sex === "male"}
                                                            onChange={handleInputChange}
                                                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                                                        />
                                                        <span className="ml-2">Male</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="sex"
                                                            value="female"
                                                            checked={userData.sex === "female"}
                                                            onChange={handleInputChange}
                                                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                                                        />
                                                        <span className="ml-2">Female</span>
                                                    </label>
                                                </div>
                                                {errors.sex && <p className="mt-1 text-sm text-red-600">{errors.sex}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Age
                                                </label>
                                                <input
                                                    type="number"
                                                    id="age"
                                                    name="age"
                                                    value={userData.age || ""}
                                                    onChange={handleInputChange}
                                                    min="18"
                                                    max="100"
                                                    className={`w-full px-3 py-2 border ${errors.age ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                />
                                                {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Height (cm)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="height"
                                                    name="height"
                                                    value={userData.height || ""}
                                                    onChange={handleInputChange}
                                                    min="100"
                                                    max="250"
                                                    className={`w-full px-3 py-2 border ${errors.height ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                />
                                                {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Weight (kg)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="weight"
                                                    name="weight"
                                                    value={userData.weight || ""}
                                                    onChange={handleInputChange}
                                                    min="30"
                                                    max="300"
                                                    className={`w-full px-3 py-2 border ${errors.weight ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                />
                                                {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            custom={currentStep}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h5 className="font-medium text-gray-700">Lifestyle Information</h5>

                                            <div>
                                                <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-700 mb-1">
                                                    On average, how many hours do you sleep?
                                                </label>
                                                <input
                                                    type="number"
                                                    id="sleepHours"
                                                    name="sleepHours"
                                                    value={userData.sleepHours || ""}
                                                    onChange={handleInputChange}
                                                    min="4"
                                                    max="12"
                                                    step="0.5"
                                                    className={`w-full px-3 py-2 border ${errors.sleepHours ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                />
                                                {errors.sleepHours && <p className="mt-1 text-sm text-red-600">{errors.sleepHours}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="jobActivity" className="block text-sm font-medium text-gray-700 mb-1">
                                                    What kind of job do you have?
                                                </label>
                                                <select
                                                    id="jobActivity"
                                                    name="jobActivity"
                                                    value={userData.jobActivity}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border ${errors.jobActivity ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                >
                                                    <option value="">Select job activity level</option>
                                                    <option value="sedentary">Sedentary (desk job, minimal movement)</option>
                                                    <option value="light">Light activity (standing, retail, teaching)</option>
                                                    <option value="moderate">Moderate activity (regular walking, nursing)</option>
                                                    <option value="active">Active (physical labor, construction)</option>
                                                </select>
                                                {errors.jobActivity && <p className="mt-1 text-sm text-red-600">{errors.jobActivity}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="freeTimeActivity" className="block text-sm font-medium text-gray-700 mb-1">
                                                    In your free time, you are mostly:
                                                </label>
                                                <select
                                                    id="freeTimeActivity"
                                                    name="freeTimeActivity"
                                                    value={userData.freeTimeActivity}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border ${errors.freeTimeActivity ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                >
                                                    <option value="">Select free time activity level</option>
                                                    <option value="sedentary">Sedentary (reading, TV, computer)</option>
                                                    <option value="light">Light activity (walking, casual cycling)</option>
                                                    <option value="moderate">Moderate activity (regular exercise 3-5 days/week)</option>
                                                    <option value="active">Very active (intense exercise 6-7 days/week)</option>
                                                </select>
                                                {errors.freeTimeActivity && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.freeTimeActivity}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            custom={currentStep}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h5 className="font-medium text-gray-700">Goals</h5>

                                            <div>
                                                <label htmlFor="mainGoal" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Your main goal is to:
                                                </label>
                                                <select
                                                    id="mainGoal"
                                                    name="mainGoal"
                                                    value={userData.mainGoal}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border ${errors.mainGoal ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                >
                                                    <option value="">Select your main goal</option>
                                                    <option value="lose_weight">Lose weight</option>
                                                    <option value="maintain_weight">Maintain weight</option>
                                                    <option value="gain_muscle">Gain muscle</option>
                                                </select>
                                                {errors.mainGoal && <p className="mt-1 text-sm text-red-600">{errors.mainGoal}</p>}
                                            </div>

                                            {userData.mainGoal === "lose_weight" && (
                                                <div>
                                                    <label htmlFor="weightLossTarget" className="block text-sm font-medium text-gray-700 mb-1">
                                                        How much weight do you want to lose? (kg)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="weightLossTarget"
                                                        name="weightLossTarget"
                                                        value={userData.weightLossTarget || ""}
                                                        onChange={handleInputChange}
                                                        min="1"
                                                        max="50"
                                                        className={`w-full px-3 py-2 border ${errors.weightLossTarget ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                                    />
                                                    {errors.weightLossTarget && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.weightLossTarget}</p>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {currentStep === 4 && (
                                        <motion.div
                                            key="step4"
                                            custom={currentStep}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            <h5 className="font-medium text-gray-700">Your Calculated Metrics</h5>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="text-sm text-gray-500">Your BMR (calories burned at rest)</div>
                                                    <div className="text-xl font-bold">{calculatedValues.bmr} calories</div>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="text-sm text-gray-500">Your daily calorie need</div>
                                                    <div className="text-xl font-bold">{calculatedValues.calorieNeed} calories</div>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="text-sm text-gray-500">Daily calorie adjustment</div>
                                                    <div className="text-xl font-bold">
                                                        {calculatedValues.calorieDeficit > 0 ? "+" : ""}
                                                        {calculatedValues.calorieDeficit} calories
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="text-sm text-gray-500">Recommended daily intake</div>
                                                    <div className="text-xl font-bold">
                                                        {calculatedValues.calorieNeed + calculatedValues.calorieDeficit} calories
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                <div className="text-sm font-medium text-green-800">Daily energy advice</div>
                                                <div className="text-gray-700 mt-1">{calculatedValues.dailyEnergyAdvice}</div>
                                            </div>

                                            <div>
                                                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Additional notes or preferences (optional)
                                                </label>
                                                <textarea
                                                    id="additionalNotes"
                                                    value={prompt}
                                                    onChange={(e) => setPrompt(e.target.value)}
                                                    rows={3}
                                                    placeholder="Any dietary restrictions, food preferences, or specific requests..."
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                ></textarea>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex justify-between mt-6">
                                    {currentStep > 1 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            Back
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    )}

                                    {currentStep < totalSteps ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Continue
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={isGenerating}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <FiLoader className="animate-spin" />
                                                    <span>Generating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiCheck />
                                                    <span>Generate Meal Plan</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}

                    {isGenerating && (
                        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-600"></div>
                                <p className="text-sm text-green-800">Generating your personalized meal plan...</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AIAssistant

