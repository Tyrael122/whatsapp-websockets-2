import { useRef } from "react";

export function useFileInput({
  accept,
  handleFileChange,
}: {
  accept: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  const FileInput = (
    <input
      type="file"
      ref={fileInputRef}
      style={{ display: "none" }}
      accept={accept}
      onChange={handleFileChange}
    />
  );

  return { openFileInput, FileInput };
}
