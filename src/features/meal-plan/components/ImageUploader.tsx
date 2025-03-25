"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { FiUpload, FiX } from "react-icons/fi"

interface ImageUploaderProps {
    initialImage?: string
    onImageChange: (file: File | null) => void
    className?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ initialImage, onImageChange, className = "" }) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
            onImageChange(file)
        } else {
            setPreviewUrl(null)
            onImageChange(null)
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemoveImage = () => {
        setPreviewUrl(null)
        onImageChange(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <div className={`${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>

            {previewUrl ? (
                <div className="relative w-full h-48 mb-2">
                    <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Meal plan preview"
                        fill
                        className="object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        title="Remove image"
                    >
                        <FiX size={16} />
                    </button>
                </div>
            ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-2">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">Click to upload an image or drag and drop</p>
                </div>
            )}

            <div className="flex items-center">
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
                >
                    {previewUrl ? "Change" : "Upload Image"}
                </button>
                <span className="ml-3 text-sm text-gray-500">{previewUrl ? "Image uploaded" : "No file chosen"}</span>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" title="Upload image" />
        </div>
    )
}

export default ImageUploader

