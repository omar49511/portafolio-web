// TabContent.tsx
import { Project } from "@/types/project";
// import ChallengesContent from "@/components/ChallengesContent"; // Adjust the path as needed
// import TechContent from "@/components/TechContent"; // Adjust the path as needed
import ProcessContent from "@/components/ProcessContent"; // Adjust the path as needed
import OverviewContent from "@/components/OverviewContent"; // Adjust the path as needed

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
        // return <TechContent project={project} themeColor={themeColor} />;
        case "challenges":
        // return <ChallengesContent project={project} themeColor={themeColor} />;
        default:
            return null;
    }
}
