import React from 'react';
import handloomSvg from '@/assets/handloom.svg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * HandloomBadge – a premium interactive badge displaying the handloom SVG.
 * It shows a tooltip with a brief description on hover.
 */
export const HandloomBadge: React.FC = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="flex items-center space-x-2 cursor-pointer">
        <img src={handloomSvg} alt="Handloom" className="w-6 h-6 animate-pulse" />
        <span className="font-semibold text-primary">Handloom</span>
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p className="text-sm">Traditional Tamil hand‑loom craft</p>
    </TooltipContent>
  </Tooltip>
);
