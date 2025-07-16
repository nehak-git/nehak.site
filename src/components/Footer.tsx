import { useRive } from "@rive-app/react-canvas";

export default function Footer() {
  const { rive, RiveComponent } = useRive({
    src: "/rive.riv",
    stateMachines: ["GirlState","Pupils_LR","Pupils_UD"],
    autoplay: true,
  });

  return (
    <div className="h-[400px] w-full items-center justify-center bg-transparent flex m-4">
      <RiveComponent
        style={{ width: "100%", height: "400px"}}
      />
    </div>
  );
}
