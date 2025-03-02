"use client";

import useProject from "@/hooks/use-project";
import { ExternalLink, Github, Link } from "lucide-react";

export default function Dashboard() {
  const { project } = useProject();

  console.log("Project data:", project); // Debugging log

  if (!project) {
    return <p className="text-white">Loading project...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-y-4">
        <Github className="size text-white" />
        <div className="ml-2">
          <p className="text-sm font-medium text-white">
            This project is linked to{" "}
            <Link
              href={project?.githubUrl ?? "#"}
              className="inline-flex items-center text-white/80 hover:underline">
              {project?.name || "Unnamed Project"}
              <ExternalLink className="ml-1 size-4"></ExternalLink>
            </Link>
          </p>
        </div>
      </div>
    </div> 
  );
}
