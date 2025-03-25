"use client"

import type React from "react"

interface FormTextareaProps {
    id: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string
    required?: boolean
    className?: string
    rows?: number
}

const FormTextarea: React.FC<FormTextareaProps> = ({
    id,
    label,
    value,
    onChange,
    placeholder = "",
    required = false,
    className = "",
    rows = 4,
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
        </div>
    )
}

export default FormTextarea

