import { memo } from "react";

export const TitleHeader = memo(() => {
  return (
    <header className="py-2 bg-gray-200">
      <span className="text-2xl font-bold">SRT Editor</span>
    </header>
  );
});
