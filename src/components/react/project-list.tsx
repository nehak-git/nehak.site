import * as React from "react";
import GitHub from "@/components/icons/github";

interface Project {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    url?: string;
    repo?: string;
    tech?: string[];
    featured: boolean;
  };
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white/50 backdrop-blur-md p-4 flex flex-col gap-2 rounded-lg border border-stone-200"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-stone-800 font-medium">{project.data.title}</h3>
            {project.data.url && (
              <a
                href={project.data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-stone-100 px-2 py-0.5 rounded-full text-stone-600 hover:bg-stone-200"
              >
                Visit
              </a>
            )}
          </div>
          <p className="text-stone-600 text-sm line-clamp-2">
            {project.data.description}
          </p>
          {project.data.tech && (
            <div className="flex flex-wrap gap-1 mt-1">
              {project.data.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-500"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="text-stone-600 mt-2">
            {project.data.repo && (
              <a
                href={project.data.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-stone-800 transition-colors"
              >
                <GitHub />
                Repo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
