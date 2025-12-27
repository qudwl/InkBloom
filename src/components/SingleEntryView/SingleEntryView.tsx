import { Box, Text } from '@mantine/core';
import { useStore } from '../../store/useStore';
import { FeedEntry } from '../JournalFeed/FeedEntry';

export function SingleEntryView() {
    const currentEntry = useStore(state => state.currentEntry);
    const selectEntry = useStore(state => state.selectEntry);
    const saveEntry = useStore(state => state.saveEntry);

    if (!currentEntry) {
        return (
            <Box pt="xl">
                <Text ta="center" c="dimmed">No entry selected.</Text>
            </Box>
        );
    }

    return (
        <Box>
            <FeedEntry
                entry={currentEntry}
                isHighlighted={false}
                onSelect={selectEntry}
                onSaveGlobal={saveEntry}
                expanded={true}
                hideHeader={true}
                plain={true}
            />
        </Box>
    );
}
