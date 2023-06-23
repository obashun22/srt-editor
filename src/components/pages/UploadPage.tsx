import React, { memo } from "react";
import { UploadPanel } from "../molcules/UploadPanel";

type Props = {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadPage: React.VFC<Props> = memo(({ onUpload }) => {
  return (
    <div className="mt-16">
      <UploadPanel onChange={onUpload} />
    </div>
  );
});
