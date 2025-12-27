import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useEffect } from "react";
import { useComputedColorScheme } from "@mantine/core";

interface EditorProps {
    initialContent?: string;
    onSave: (content: string) => void;
}

const Editor = ({ initialContent, onSave }: EditorProps) => {
    const colorScheme = useComputedColorScheme('light');

    // Create a new editor instance
    const editor = useCreateBlockNote({
        initialContent: initialContent && initialContent !== '[]' ? JSON.parse(initialContent) : undefined,
    });

    // Handle content changes
    // We can use a debounce here in App or here, but for simplicity let's just expose the change
    // BlockNote's onChange is triggered on every edit.

    // Actually, useCreateBlockNote doesn't directly expose onChange in its options in all versions, 
    // but the editor instance does.

    useEffect(() => {
        if (editor) {
            const verifyContent = async () => {
                // Nothing specific needed here unless we want to reset content when initialContent changes
            }
            verifyContent();
        }
    }, [editor, initialContent]);

    return (
        <BlockNoteView
            editor={editor}
            theme={colorScheme === 'dark' ? 'dark' : 'light'}
            onChange={() => {
                // Get blocks directly from document
                onSave(JSON.stringify(editor.document));
            }}
        />
    );
}

export { Editor }