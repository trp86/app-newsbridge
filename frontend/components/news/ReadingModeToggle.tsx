"use client";

import { ReadingMode } from "@/lib/types/news";
import { READING_MODES } from "@/lib/constants/reading-modes";
import { cn } from "@/lib/utils/cn";

interface ReadingModeToggleProps {
  value: ReadingMode;
  onChange: (mode: ReadingMode) => void;
  className?: string;
}

export function ReadingModeToggle({ value, onChange, className }: ReadingModeToggleProps) {
  return (
    <div className={cn("inline-flex gap-1 bg-[#efeeea] rounded-lg p-1", className)}>
      {Object.values(READING_MODES).map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded transition-all",
            value === mode.id
              ? "bg-[#000000] text-[#fbf9f5] shadow-sm"
              : "text-[#1b1c1a] hover:bg-[#eae8e4]"
          )}
        >
          <div className="flex flex-col items-center">
            <span className="font-semibold">{mode.label}</span>
            <span className="text-xs opacity-70">{mode.words}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
