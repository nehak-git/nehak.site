import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import DarkVeil from "@/components/DarkVeil/DarkVeil";
import Header from "@/components/Header";
import { Github, Linkedin } from "lucide-react";
import ProjectList from "@/components/project-list";
import { prisma } from "@/utils/prisma";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export async function loader({ params }: Route.LoaderArgs) {
  const projects = await prisma.project.findMany();
  return projects;
}
export default function Home({ loaderData }: Route.ComponentProps) {
  const projects = loaderData;
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
            <Linkedin size={15} />
            LinkedIn
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Github size={15} />
            GitHub
          </div>
        </div>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
