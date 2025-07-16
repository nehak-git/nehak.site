import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

export default function AIPersonaButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="shine" className="cursor-pointer">
            <a href="/ai" className="flex items-center gap-2">
              <img src="/ai.png" className="w-4" alt="" />
              My AI Persona
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="font-gaegu">Crafted With ▲ Vercel AI SDK + Mistral</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
