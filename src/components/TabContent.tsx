// TabContent.tsx
import { Project } from "@/types/project";
import dynamic from "next/dynamic";

const OverviewContent = dynamic(() => import("@/components/OverviewContent"));
const ProcessContent = dynamic(() => import("@/components/ProcessContent"));
const TechContent = dynamic(() => import("@/components/TechContent"));
const ChallengesContent = dynamic(() => import("@/components/ChallengesContent"));


type TabContentProps = {
    activeTab: string;
    project: Project;
    themeColor?: string;
};

export default function TabContent({ activeTab, project, themeColor }: TabContentProps) {
    switch (activeTab) {
        case "overview":
            return <OverviewContent project={project} themeColor={themeColor} />;
        case "process":
            return <ProcessContent project={project} themeColor={themeColor} />;
        case "tech":
            return <TechContent project={project} themeColor={themeColor} />;
        case "challenges":
            return <ChallengesContent project={project} themeColor={themeColor} />;
        default:
            return null;
    }
}
