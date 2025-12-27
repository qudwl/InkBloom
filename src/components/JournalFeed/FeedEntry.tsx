import { Paper, Title, Text, Group, Box, Loader } from '@mantine/core';
import { JournalEntry, StorageService } from '../../services/storage';
import { Editor } from '../Editor/Editor';
import { useState, useEffect, useCallback } from 'react';

interface FeedEntryProps {
    entry: JournalEntry;
    isHighlighted?: boolean;
}

export function FeedEntry({ entry, isHighlighted }: FeedEntryProps) {
    const [content, setContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, [entry.filename]);

    const loadContent = async () => {
        try {
            const data = await StorageService.loadEntry(entry.filename);
            setContent(data);
        } catch (error) {
            console.error(`Failed to load content for ${entry.filename}`, error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = useCallback(async (newContent: string) => {
        // Save content
        try {
            await StorageService.saveEntry(entry.filename, newContent);

            // Update metadata lastModified
            const lastModified = new Date();
            await StorageService.saveMetadata(
                entry.filename,
                entry.displayName,
                entry.date,
                lastModified
            );

            // Note: We might want a context or callback to update the global entries list 
            // with the new lastModified date for the sidebar to update strictly.
            // For now, let's focus on the save working.
        } catch (error) {
            console.error("Failed to save entry", error);
        }
    }, [entry]);

    return (
        <Paper
            shadow="xs"
            p="xl"
            withBorder
            mb="xl"
            style={{
                transition: 'border-color 0.3s',
                borderColor: isHighlighted ? 'var(--mantine-primary-color)' : undefined
            }}
        >
            <Box mb="md">
                <Title order={3}>{entry.displayName}</Title>
                <Text size="sm" c="dimmed">
                    {new Date(entry.date).toLocaleString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                    })}
                </Text>
            </Box>

            {isLoading ? (
                <Group justify="center" p="xl">
                    <Loader size="sm" type="dots" />
                </Group>
            ) : (
                <div style={{ minHeight: '200px' }}>
                    {/* Key is crucial to reset editor if entry changes (though usually component just unmounts) */}
                    <Editor
                        key={entry.filename}
                        initialContent={content || undefined}
                        onSave={handleSave}
                    />
                </div>
            )}
        </Paper>
    );
}
