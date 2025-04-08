// types/project.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  process: {
    title: string;
    description: string;
    image?: string;
  }[];
  challenges: string[];
  learnings: string[];
  featured?: boolean;
  imageHeight?: number;
}
