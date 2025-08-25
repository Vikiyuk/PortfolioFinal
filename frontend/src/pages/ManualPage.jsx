import { useState } from "react";

// Define your manual tree
const manualTree = {
    "Introduction": ["Purpose of Sarvat", "Who should use it", "Key features"],
    "Getting Started": ["Dashboard overview", "Navigation guide", "Profile settings"],
    "Core Features": {
        "Portfolio Management": ["Create portfolio", "Add/edit/remove assets", "Import/export data"],
        "Trading": ["Buy & sell stocks", "Order types", "Transaction history"],
        "Analytics & Insights": ["Portfolio performance", "Charts & visualizations", "Risk analysis"],
        "Alerts & Notifications": ["Price alerts", "Market news updates", "Custom reminders"]
    }
};

// Placeholder content for now
const manualContent = {
    "Purpose of Sarvat": "This is the purpose of Sarvat...",
    "Who should use it": "This is who should use Sarvat...",
    "Key features": "This is the key features description...",
    "Dashboard overview": "Dashboard overview details here...",
    "Navigation guide": "Navigation guide details here...",
    "Profile settings": "Profile settings details here...",
    "Create portfolio": "Instructions for creating portfolio...",
    "Add/edit/remove assets": "Instructions for managing assets...",
    "Import/export data": "Instructions for importing/exporting data...",
    "Buy & sell stocks": "Instructions for trading stocks...",
    "Order types": "Description of order types...",
    "Transaction history": "Transaction history instructions...",
    "Portfolio performance": "Portfolio performance details...",
    "Charts & visualizations": "Charts and visualization details...",
    "Risk analysis": "Risk analysis details...",
    "Price alerts": "Price alerts instructions...",
    "Market news updates": "Market news updates instructions...",
    "Custom reminders": "Custom reminders instructions..."
};

export default function ManualPage() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
                {Object.entries(manualTree).map(([section, content]) => (
                    <div key={section} className="mb-4">
                        <h2 className="font-bold text-lg">{section}</h2>
                        <ul className="ml-4 mt-2 space-y-1">
                            {Array.isArray(content) ? (
                                content.map(item => (
                                    <li
                                        key={item}
                                        className={`cursor-pointer hover:underline ${selected === item ? "font-semibold" : ""}`}
                                        onClick={() => setSelected(item)}
                                    >
                                        {item}
                                    </li>
                                ))
                            ) : (
                                Object.entries(content).map(([sub, items]) => (
                                    <div key={sub}>
                                        <p className="font-semibold mt-2">{sub}</p>
                                        <ul className="ml-4 space-y-1">
                                            {items.map(item => (
                                                <li
                                                    key={item}
                                                    className={`cursor-pointer hover:underline ${selected === item ? "font-semibold" : ""}`}
                                                    onClick={() => setSelected(item)}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            )}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                {selected ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{selected}</h1>
                        <p>{manualContent[selected]}</p>
                    </div>
                ) : (
                    <p className="text-gray-400">Select a topic from the left to view details.</p>
                )}
            </div>
        </div>
    );
}
