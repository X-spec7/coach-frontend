"use client"

import type React from "react"
import { useState } from "react"
import type { Client } from "../types/client.dto"

interface ClientDetailTabsProps {
    client: Client
}

const ClientDetailTabs: React.FC<ClientDetailTabsProps> = ({ client }) => {
    const [activeTab, setActiveTab] = useState("overview")

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "programs", label: "Programs" },
        { id: "metrics", label: "Metrics" },
        { id: "notes", label: "Notes" },
    ]

    return (
        <div className="bg-white shadow rounded-lg mb-6">
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? "border-green-500 text-green-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-6">
                {activeTab === "overview" && (
                    <div>
                        <h3 className="text-lg font-medium mb-4">Client Overview</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Personal Information</h4>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Coach</p>
                                            <p className="font-medium">{client.coach}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Member Since</p>
                                            <p className="font-medium">{client.memberSince}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Activated On</p>
                                            <p className="font-medium">{client.activatedOn}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Last Online</p>
                                            <p className="font-medium">{client.lastOnline}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {client.metrics && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-2">Metrics</h4>
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <div className="grid grid-cols-2 gap-4">
                                            {client.metrics.height && (
                                                <div>
                                                    <p className="text-xs text-gray-500">Height</p>
                                                    <p className="font-medium">{client.metrics.height} cm</p>
                                                </div>
                                            )}
                                            {client.metrics.weight && (
                                                <div>
                                                    <p className="text-xs text-gray-500">Weight</p>
                                                    <p className="font-medium">{client.metrics.weight} kg</p>
                                                </div>
                                            )}
                                            {client.metrics.bodyFat && (
                                                <div>
                                                    <p className="text-xs text-gray-500">Body Fat</p>
                                                    <p className="font-medium">{client.metrics.bodyFat}%</p>
                                                </div>
                                            )}
                                            {client.metrics.bmi && (
                                                <div>
                                                    <p className="text-xs text-gray-500">BMI</p>
                                                    <p className="font-medium">{client.metrics.bmi}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {client.goals && client.goals.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Goals</h4>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <ul className="list-disc pl-5 space-y-1">
                                        {client.goals.map((goal, index) => (
                                            <li key={index}>{goal}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {client.address && (
                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Address</h4>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p>{client.address}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "programs" && (
                    <div>
                        <h3 className="text-lg font-medium mb-4">Client Programs</h3>

                        {client.programs && client.programs.length > 0 ? (
                            <div className="space-y-4">
                                {client.programs.map((program) => (
                                    <div key={program.id} className="border rounded-md p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium">{program.name}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {program.startDate} - {program.endDate}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {program.progress}% Complete
                                            </span>
                                        </div>

                                        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${program.progress}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">No programs assigned yet</div>
                        )}
                    </div>
                )}

                {activeTab === "metrics" && (
                    <div>
                        <h3 className="text-lg font-medium mb-4">Client Metrics</h3>

                        {client.metrics ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {client.metrics.height && (
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Height</h4>
                                        <p className="text-2xl font-bold">{client.metrics.height} cm</p>
                                    </div>
                                )}

                                {client.metrics.weight && (
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Weight</h4>
                                        <p className="text-2xl font-bold">{client.metrics.weight} kg</p>
                                    </div>
                                )}

                                {client.metrics.bodyFat && (
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Body Fat</h4>
                                        <p className="text-2xl font-bold">{client.metrics.bodyFat}%</p>
                                    </div>
                                )}

                                {client.metrics.bmi && (
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">BMI</h4>
                                        <p className="text-2xl font-bold">{client.metrics.bmi}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">No metrics recorded yet</div>
                        )}
                    </div>
                )}

                {activeTab === "notes" && (
                    <div>
                        <h3 className="text-lg font-medium mb-4">Client Notes</h3>

                        {client.notes ? (
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p>{client.notes}</p>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">No notes recorded yet</div>
                        )}

                        <div className="mt-4">
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows={4}
                                placeholder="Add a note..."
                            ></textarea>
                            <div className="mt-2 flex justify-end">
                                <button className="px-4 py-2 bg-green text-black rounded-md hover:bg-green-dark">Save Note</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClientDetailTabs

