import type React from "react"

interface FormSectionProps {
    title: string
    children: React.ReactNode
    className?: string
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, className = "" }) => {
    return (
        <div className={`mb-6 ${className}`}>
            <h3 className="text-lg font-medium mb-3">{title}</h3>
            <div className="bg-gray-bg rounded-xl p-4">{children}</div>
        </div>
    )
}

export default FormSection

