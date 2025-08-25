import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const manualTree = {
    "Introduction": ["PurposeOfSarvat", "WhoShouldUseIt", "KeyFeatures"],
    "Getting Started": ["DashboardOverview", "NavigationGuide", "ProfileSettings"],
    "Core Features": {
        "Portfolio Management": ["CreatePortfolio", "AddEditRemoveAssets", "ImportExportData"],
        "Trading": ["BuySellStocks", "OrderTypes", "TransactionHistory"],
        "Analytics & Insights": ["PortfolioPerformance", "ChartsVisualizations", "RiskAnalysis"],
        "Alerts & Notifications": ["PriceAlerts", "MarketNewsUpdates", "CustomReminders"]
    }
};

export default function ManualPage() {
    const [selected, setSelected] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (selected) {
            import(`../assets/manualContent/${selected}.md?raw`)
                .then(res => setContent(res.default || res))
                .catch(() => setContent("Content not found."));
        }
    }, [selected]);

    return (
        <div className="flex h-screen bg-black text-white">

            <div className="w-64 p-4 overflow-y-auto" style={{ backgroundColor: "#150127FF" }}>
                {Object.entries(manualTree).map(([section, content]) => (
                    <div key={section} className="mb-4">
                        <h2 className="font-bold text-lg">{section}</h2>
                        <ul className="ml-4 mt-2 space-y-1">
                            {Array.isArray(content) ? (
                                content.map(item => (
                                    <li
                                        key={item}
                                        className={`cursor-pointer hover:text-purple-400 ${selected === item ? "font-semibold text-purple-300" : ""}`}
                                        onClick={() => setSelected(item)}
                                    >
                                        {item.replace(/([A-Z])/g, " $1").trim()} {}
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
                                                    className={`cursor-pointer hover:text-purple-400 ${selected === item ? "font-semibold text-purple-300" : ""}`}
                                                    onClick={() => setSelected(item)}
                                                >
                                                    {item.replace(/([A-Z])/g, " $1").trim()}
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

            {}
            <div className="flex-1 p-6 overflow-y-auto prose prose-invert">
                {selected ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                ) : (
                    <p className="text-gray-400">Select a topic from the left to view details.</p>
                )}
            </div>
        </div>
    );
}
