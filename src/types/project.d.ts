export interface Project {
  id: number;
  name: string;
  description: string;
  about: string;
  url: string;
  image: string;
  imageId: number;
  techStack: string[];
  techDefinition: string;
  sourceUrl: string;
  duration: string;
  owners: string[];
  roles: string[];
}