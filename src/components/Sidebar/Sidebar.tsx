import { Stack, ScrollArea, Text, Group, ActionIcon, Menu, UnstyledButton, rem, Box } from '@mantine/core';
import { IconSortDescending, IconSortAscending, IconCalendar, IconAlphabetLatin, IconX, IconSettings } from '@tabler/icons-react';
import { SidebarEntry } from './SidebarEntry';
import { useStore, useSortedEntries } from '../../store/useStore';
import { useDisclosure } from '@mantine/hooks';
import { SettingsModal } from '../SettingsModal';

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
    const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);

    const handleSelect = (entry: any) => {
        selectEntry(entry);
        if (mobileOpened) closeMobile();
    };

    return (
        <Stack h="100%" gap={0}>
            <Box
                px="md"
                h={80}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--mantine-color-default-border)',
                }}
            >
                <Group justify="space-between" flex={1}>
                    <Text size="sm" c="dimmed" fw={600} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
            </Box>

            <ScrollArea flex={1}>
                <Stack gap="xs" p="md" pt="sm">
                    {entries.length === 0 && (
                        <Text size="xs" c="dimmed" p="md">
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

            <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}>
                <UnstyledButton
                    onClick={openSettings}
                    style={{
                        width: '100%',
                        padding: rem(8),
                        borderRadius: 'var(--mantine-radius-sm)',
                        '&:hover': {
                            backgroundColor: 'var(--mantine-color-default-hover)'
                        }
                    }}
                >
                    <Group>
                        <IconSettings size={18} />
                        <Text size="sm">Settings</Text>
                    </Group>
                </UnstyledButton>
            </Box>

            <SettingsModal opened={settingsOpened} onClose={closeSettings} />
        </Stack>
    );
}
