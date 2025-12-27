import { useState, useEffect, useRef } from 'react';
import { StorageService, JournalEntry } from '../services/storage';

export function useJournal() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
    const [editorContent, setEditorContent] = useState<string | undefined>(undefined);
    const initialLoadDone = useRef(false);

    useEffect(() => {
        loadEntries();
    }, []);

    useEffect(() => {
        // Update window title when current entry changes
        const updateTitle = async () => {
            const { getCurrentWindow } = await import('@tauri-apps/api/window');
            const appWindow = getCurrentWindow();
            const title = currentEntry?.displayName
                ? `${currentEntry.displayName} - Journal`
                : 'Journal';
            await appWindow.setTitle(title);
        };
        updateTitle();
    }, [currentEntry]);

    async function loadEntries() {
        try {
            const list = await StorageService.listEntries();
            setEntries(list);

            // On initial load only, try to open the last opened entry
            if (!initialLoadDone.current) {
                initialLoadDone.current = true;

                const lastOpenedFilename = await StorageService.loadLastOpenedEntry();

                if (lastOpenedFilename) {
                    // Try to find and open the last opened entry
                    const lastEntry = list.find(e => e.filename === lastOpenedFilename);
                    if (lastEntry) {
                        await selectEntry(lastEntry);
                        return;
                    }
                }

                // If no last opened entry or it doesn't exist, create a new one if no entries exist
                if (list.length === 0) {
                    await createEntry();
                }
            }
        } catch (error) {
            console.error('Failed to load entries:', error);
        }
    }

    async function selectEntry(entry: JournalEntry) {
        try {
            const content = await StorageService.loadEntry(entry.filename);
            setCurrentEntry(entry);
            setEditorContent(content);

            // Save this as the last opened entry
            await StorageService.saveLastOpenedEntry(entry.filename);
        } catch (error) {
            console.error('Failed to load entry content:', error);
        }
    }

    async function createEntry() {
        try {
            const now = new Date();
            const filename = `entry_${now.getTime()}.json`;

            // Format date as "Jan 27, 2025 6:01 PM"
            const displayName = now.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });

            const newEntry: JournalEntry = {
                filename,
                displayName,
                content: '',
                date: now,
                lastModified: now
            };

            // Save empty content and metadata
            await StorageService.saveEntry(filename, '[]');
            await StorageService.saveMetadata(filename, displayName, now, now);

            setCurrentEntry(newEntry);
            setEditorContent(undefined);

            // Save this as the last opened entry
            await StorageService.saveLastOpenedEntry(filename);

            await loadEntries(); // Refresh list
        } catch (error) {
            console.error('Failed to create new entry:', error);
            alert(`Failed to create new entry: ${error}`);
        }
    }

    async function saveEntry(content: string) {
        if (!currentEntry) return;

        try {
            await StorageService.saveEntry(currentEntry.filename, content);

            const lastModified = new Date();
            await StorageService.saveMetadata(
                currentEntry.filename,
                currentEntry.displayName,
                currentEntry.date,
                lastModified
            );

            // Update local state to reflect new lastModified
            setEntries(prev => prev.map(e =>
                e.filename === currentEntry.filename
                    ? { ...e, lastModified }
                    : e
            ));

            // Update current entry
            setCurrentEntry({ ...currentEntry, lastModified });

        } catch (error) {
            console.error("Failed to save", error);
        }
    }

    async function renameEntry(entry: JournalEntry, newName: string) {
        try {
            await StorageService.renameEntry(entry.filename, newName);

            // Update local state
            setEntries(prev => prev.map(e =>
                e.filename === entry.filename
                    ? { ...e, displayName: newName }
                    : e
            ));

            // Update current entry if it's the one being renamed
            if (currentEntry?.filename === entry.filename) {
                setCurrentEntry({ ...currentEntry, displayName: newName });
            }
        } catch (error) {
            console.error('Failed to rename entry:', error);
            alert(`Failed to rename entry: ${error}`);
        }
    }

    async function deleteEntry(entry: JournalEntry) {
        try {
            await StorageService.deleteEntry(entry.filename);

            // Update local state
            const newEntries = entries.filter(e => e.filename !== entry.filename);
            setEntries(newEntries);

            // If the deleted entry was selected, clear selection
            if (currentEntry?.filename === entry.filename) {
                setCurrentEntry(null);
                setEditorContent(undefined);
            }
        } catch (error) {
            console.error('Failed to delete entry:', error);
            alert(`Failed to delete entry: ${error}`);
        }
    }

    return {
        entries,
        currentEntry,
        editorContent,
        createEntry,
        selectEntry,
        renameEntry,
        deleteEntry,
        saveEntry
    };
}
