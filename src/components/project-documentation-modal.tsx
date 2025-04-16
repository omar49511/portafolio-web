// // ProjectDocumentationModal.tsx
import ModalWrapper from "./ModalWrapper";
import ModalHeader from "./ModalHeader";
import NavigationTabs from "./NavigationTabs";
import TabContent from "./TabContent";
import { useState } from "react";
import { Project } from "@/types/project"; // Adjust the import path as needed

interface ProjectDocumentationModalProps {
  project: Project; // Ensure the project prop matches the Project type
  onClose: () => void;
  themeColor: string;
}

export default function ProjectDocumentationModal({
  project,
  onClose,
  themeColor,
}: ProjectDocumentationModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <ModalWrapper onClose={onClose}>
      <ModalHeader onClose={onClose} title={`Detrás del proyecto: ${project.title}`} themeColor={themeColor} />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} themeColor={themeColor} />
      <TabContent activeTab={activeTab} project={project} themeColor={themeColor} />
    </ModalWrapper>
  );
}
