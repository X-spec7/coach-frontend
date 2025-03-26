"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Client, ClientStatus } from "../types/client.dto"
import { ClientService } from "../services/client.service"

interface ClientFormProps {
    initialData?: Partial<Client>
    isEditing?: boolean
}

const ClientForm: React.FC<ClientFormProps> = ({ initialData = {}, isEditing = false }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Partial<Client>>({
        name: "",
        email: "",
        phone: "",
        coach: "Any",
        status: "active" as ClientStatus,
        address: "",
        notes: "",
        ...initialData,
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.name?.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email?.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
            newErrors.phone = "Phone number is invalid"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setLoading(true)

        try {
            // Get current date in MM/DD/YYYY format
            const today = new Date()
            const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

            // Add default values for new clients
            const clientData = {
                ...formData,
                memberSince: formData.memberSince || formattedDate,
                activatedOn: formData.activatedOn || formattedDate,
                lastOnline: formData.lastOnline || formattedDate,
            }

            if (isEditing && formData.id) {
                await ClientService.updateClient(formData.id, clientData)
            } else {
                await ClientService.addClient(clientData as Omit<Client, "id">)
            }

            router.push("/clients")
        } catch (error) {
            console.error("Error saving client:", error)
            alert("There was an error saving the client. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-medium mb-6">{isEditing ? "Edit Client" : "Add New Client"}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Basic Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label htmlFor="coach" className="block text-sm font-medium text-gray-700 mb-1">
                                        Coach
                                    </label>
                                    <select
                                        id="coach"
                                        name="coach"
                                        value={formData.coach || "Any"}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="Any">Any</option>
                                        <option value="John Doe">John Doe</option>
                                        <option value="Jane Smith">Jane Smith</option>
                                        <option value="Mike Johnson">Mike Johnson</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status || "active"}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Additional Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address || ""}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                        Notes
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={4}
                                        value={formData.notes || ""}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                                        Goals (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        id="goals"
                                        name="goals"
                                        value={formData.goals?.join(", ") || ""}
                                        onChange={(e) => {
                                            const goalsArray = e.target.value
                                                .split(",")
                                                .map((goal) => goal.trim())
                                                .filter((goal) => goal)

                                            setFormData((prev) => ({
                                                ...prev,
                                                goals: goalsArray,
                                            }))
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Section */}
                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">Client Metrics</h3>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                                    Height (cm)
                                </label>
                                <input
                                    type="number"
                                    id="height"
                                    name="metrics.height"
                                    value={formData.metrics?.height || ""}
                                    onChange={(e) => {
                                        const value = e.target.value ? Number(e.target.value) : undefined
                                        setFormData((prev) => ({
                                            ...prev,
                                            metrics: {
                                                ...prev.metrics,
                                                height: value,
                                            },
                                        }))
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                                    Weight (kg)
                                </label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="metrics.weight"
                                    value={formData.metrics?.weight || ""}
                                    onChange={(e) => {
                                        const value = e.target.value ? Number(e.target.value) : undefined
                                        setFormData((prev) => ({
                                            ...prev,
                                            metrics: {
                                                ...prev.metrics,
                                                weight: value,
                                            },
                                        }))
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-700 mb-1">
                                    Body Fat (%)
                                </label>
                                <input
                                    type="number"
                                    id="bodyFat"
                                    name="metrics.bodyFat"
                                    value={formData.metrics?.bodyFat || ""}
                                    onChange={(e) => {
                                        const value = e.target.value ? Number(e.target.value) : undefined
                                        setFormData((prev) => ({
                                            ...prev,
                                            metrics: {
                                                ...prev.metrics,
                                                bodyFat: value,
                                            },
                                        }))
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="bmi" className="block text-sm font-medium text-gray-700 mb-1">
                                    BMI
                                </label>
                                <input
                                    type="number"
                                    id="bmi"
                                    name="metrics.bmi"
                                    value={formData.metrics?.bmi || ""}
                                    onChange={(e) => {
                                        const value = e.target.value ? Number(e.target.value) : undefined
                                        setFormData((prev) => ({
                                            ...prev,
                                            metrics: {
                                                ...prev.metrics,
                                                bmi: value,
                                            },
                                        }))
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-green text-black rounded-md hover:bg-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : isEditing ? "Update Client" : "Add Client"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ClientForm

