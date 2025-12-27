import { Stack, ScrollArea, Text, Group, ActionIcon, Menu } from '@mantine/core';
import { IconSortDescending, IconSortAscending, IconCalendar, IconAlphabetLatin, IconX } from '@tabler/icons-react';
import { SidebarEntry } from './SidebarEntry';
import { useStore, useSortedEntries } from '../../store/useStore';

export function Sidebar() {
    const entries = useSortedEntries();
    const currentEntry = useStore(state => state.currentEntry);
    const sortOrder = useStore(state => state.sortOrder);

    // Actions
    const selectEntry = useStore(state => state.selectEntry);
    const renameEntry = useStore(state => state.renameEntry);
    const deleteEntry = useStore(state => state.deleteEntry);
    const setSortOrder = useStore(state => state.setSortOrder);
    const closeMobile = useStore(state => state.closeMobile);
    const mobileOpened = useStore(state => state.mobileOpened);

    const handleSelect = (entry: any) => {
        selectEntry(entry);
        if (mobileOpened) closeMobile();
    };

    return (
        <ScrollArea h="100%">
            <Stack gap="xs" p="md">
                <Group
                    justify="space-between"
                    mb="xs"
                    h={50}
                    style={{ marginTop: -10 }}
                >
                    <Text size="sm" c="dimmed" fw={500}>
                        Journal Entries
                    </Text>
                    <Group gap={4}>
                        <Menu shadow="md" width={200} position="bottom-end">
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray" size="sm" title="Sort entries">
                                    {sortOrder.endsWith('desc') ? <IconSortDescending size={16} /> : <IconSortAscending size={16} />}
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>Sort by</Menu.Label>
                                <Menu.Item
                                    leftSection={<IconCalendar size={14} />}
                                    rightSection={sortOrder === 'date-desc' && <IconSortDescending size={14} />}
                                    onClick={() => setSortOrder('date-desc')}
                                >
                                    Newest First
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconCalendar size={14} />}
                                    rightSection={sortOrder === 'date-asc' && <IconSortAscending size={14} />}
                                    onClick={() => setSortOrder('date-asc')}
                                >
                                    Oldest First
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    leftSection={<IconAlphabetLatin size={14} />}
                                    rightSection={sortOrder === 'title-asc' && <IconSortAscending size={14} />}
                                    onClick={() => setSortOrder('title-asc')}
                                >
                                    Name (A-Z)
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconAlphabetLatin size={14} />}
                                    rightSection={sortOrder === 'title-desc' && <IconSortDescending size={14} />}
                                    onClick={() => setSortOrder('title-desc')}
                                >
                                    Name (Z-A)
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={closeMobile}
                            hiddenFrom="sm"
                            size="sm"
                        >
                            <IconX size={16} />
                        </ActionIcon>
                    </Group>
                </Group>
                {entries.length === 0 && (
                    <Text size="xs" c="dimmed">
                        No entries yet.
                    </Text>
                )}
                {entries.map((entry) => (
                    <SidebarEntry
                        key={entry.filename}
                        entry={entry}
                        isSelected={currentEntry?.filename === entry.filename}
                        onSelect={handleSelect}
                        onRename={renameEntry}
                        onDelete={deleteEntry}
                    />
                ))}
            </Stack>
        </ScrollArea>
    );
}
