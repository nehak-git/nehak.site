import * as React from "react";
import type { Project } from "../../generated/prisma/client";
import { GitBranch, Github } from "lucide-react";
interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((project) => (
        <div className="bg-black/30 backdrop-blur-md p-2 flex flex-col gap-2">
          <p className="text-neutral-200/90">{project.name}</p>
          <p className="text-neutral-400/90 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore molestias voluptatem tempore suscipit quisquam. Corrupti id quos fugiat ipsam!</p>
          <div className="text-neutral-400/90">
            <a href="" className="flex items-center gap-2 text-sm">
              <Github size={14} />
              Repo
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
