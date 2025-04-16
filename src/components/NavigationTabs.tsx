// NavigationTabs.tsx
type NavigationTabsProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    themeColor?: string;
};

export default function NavigationTabs({ activeTab, setActiveTab, themeColor }: NavigationTabsProps) {
    const tabs = [
        { label: "Visión general", value: "overview" },
        { label: "Proceso de desarrollo", value: "process" },
        { label: "Stack tecnológico", value: "tech" },
        { label: "Desafíos y aprendizajes", value: "challenges" },
    ];

    return (
        <div className="flex border-b border-[#2F2F2F] overflow-x-auto no-scrollbar min-h-[48px]">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`px-4 py-4 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.value
                        ? "border-b-2 text-white"
                        : "text-gray-400 hover:text-white"
                        }`}
                    style={{
                        borderColor: activeTab === tab.value ? themeColor : "transparent",
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
