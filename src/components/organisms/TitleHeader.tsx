import { memo } from "react";

export const TitleHeader = memo(() => {
  return (
    <header className="py-2">
      <p className="left text-2xl" style={{ color: "darkgray" }}>
        SRT Editor
      </p>
    </header>
  );
});
