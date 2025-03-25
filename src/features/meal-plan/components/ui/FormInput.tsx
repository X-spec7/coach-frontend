"use client"

import type React from "react"

interface FormInputProps {
    id: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    className?: string
    type?: string
}

const FormInput: React.FC<FormInputProps> = ({
    id,
    label,
    value,
    onChange,
    placeholder = "",
    required = false,
    className = "",
    type = "text",
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
        </div>
    )
}

export default FormInput

