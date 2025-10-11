import { useState, useEffect, Suspense, lazy } from "react";
import { Check, X, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));
const MarkdownPreview = lazy(() => import("@uiw/react-md-editor").then((mod) => ({ default: mod.default.Markdown })));

import { useTheme } from "../theme-provider";

export type ItemContentEditorProps = {
  content: string;
  isSaving: boolean;
  onSave: (newContent: string) => Promise<void>;
};

export default function ItemContentEditor({ content, isSaving, onSave }: ItemContentEditorProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [localContent, setLocalContent] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    if (!isEditMode) setLocalContent(content);
  }, [content, isEditMode]);

  async function handleSave() {
    if (isSaving) return;

    await onSave(localContent);
    setIsEditMode(false);
  }

  function handleCancel() {
    if (isEditMode) {
      setLocalContent(content);
    }
    setIsEditMode((v) => !v);
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg">Content</h2>

        <div className="flex space-x-2">
          {isEditMode && (
            <Button onClick={handleSave} type="button" disabled={isSaving}>
              {isSaving ? <Spinner className="mr-2 inline-block" /> : <Check />}
            </Button>
          )}
          <Button type="button" variant="outline" onClick={handleCancel}>
            {isEditMode ? <X /> : <Edit />}
          </Button>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="h-[400px] flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        {isEditMode ? (
          <div className="mt-2">
            <MDEditor
              value={localContent}
              onChange={(value) => setLocalContent(value || "")}
              preview="edit"
              height={400}
              data-color-mode={theme === "dark" ? "dark" : "light"}
              className="rounded-md border"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
              }}
              hideToolbar
            />
          </div>
        ) : (
          <div className="prose max-w-full p-3 rounded-md wmde-markdown">
            <MarkdownPreview source={content} />
          </div>
        )}
      </Suspense>
    </div>
  );
}
