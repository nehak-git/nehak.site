import GitHub from "@/components/icons/github";
import LinkedIn from "@/components/icons/linkedin";
import ProjectList from "@/components/proejct-list";
import { prisma } from "@/lib/prisma";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const projects = await prisma.project.findMany()
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 py-20">
        <p className="text-neutral-400/90">Hey There 👋, I am</p>
        <h1 className="text-4xl font-medium text-neutral-200/90">
          Neha Kumari.
        </h1>
        <p className="text-neutral-400/90">
          C.S Undergrad in Lovely Professional University. I am learning about
          Web Development with React and Next.js, backend with Node.js and
          Express. Along with that, I also love painting and travelling.
        </p>
        <div className="flex gap-8 mt-8">
          <div className="flex items-center gap-2 text-neutral-400">
            <LinkedIn />
            LinkedIn
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <GitHub />
            GitHub
          </div>
        </div>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
