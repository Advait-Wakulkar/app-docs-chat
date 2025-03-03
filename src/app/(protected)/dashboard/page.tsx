"use client";

import useProject from "@/hooks/use-project";
import { ExternalLink, Github, GithubIcon } from "lucide-react";
import Link from "next/link"; // Correct Next.js Link import

export default function Dashboard() {
  const { project } = useProject();

  console.log("Project data:", project); // Debugging log

  if (!project) {
    return <p className="text-white">Loading project...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-y-4">
        {/* github link */}
        <div className="w-fit rounded-md bg-primary px-4 py-3">
          <div className="flex items-center">
          <Github className="size-5 text-white"/>
          <div className="ml-2">
          <p className="text-sm font-medium text-white">
            This project is linked to {' '}
            <Link href={project?.githubUrl ?? ""} className="inline-flex items-center text-white/80 hover:underline">
              {project?.githubUrl}
              <ExternalLink className="ml-1 size-4"></ExternalLink>
            </Link>
          </p>
        </div>
          </div>
        
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          AskQuestionCard
          MeetingCard
        </div>
      <div>

      <div className="mt-8">
        Commit Log
      </div>
      
        </div>
      </div>
      <div className="flex items-center gap-4">
        Team Members
        InviteButton
        ArchiveButton
      </div>
      </div>
  );
}
