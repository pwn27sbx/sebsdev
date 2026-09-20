import React from 'react';
import { ARCHIVE_PROJECTS } from '../../data/projects';
import { usePortfolio } from '../../context/PortfolioContext';

interface ProjectsMinimalProps {
  limit?: number;
}

const ProjectsMinimal: React.FC<ProjectsMinimalProps> = ({ limit }) => {
  const { setIsHovering } = usePortfolio();

  const displayedProjects = limit ? ARCHIVE_PROJECTS.slice(0, limit) : ARCHIVE_PROJECTS;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
        {displayedProjects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group block"
          >
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white transition-colors group-hover:text-primary">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {project.category}
                </p>
              </div>
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {project.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsMinimal;
