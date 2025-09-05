import { Welcome } from "../welcome/welcome";
import DarkVeil from "@/components/DarkVeil/DarkVeil";
import Header from "@/components/Header";
import { Outlet } from "react-router";
import '@fontsource-variable/rethink-sans';



export default function Home() {
  return (
    <div className="relative w-full h-screen">
      {/* Dark veil behind everything */}
      <div className="absolute inset-0 z-0">
        <DarkVeil hueShift={30} noiseIntensity={0.15} speed={0.75} />
      </div>

      <div className="relative z-10">
        <Header />
        <main className="max-w-3xl mx-auto py-5 px-5 md:px-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
