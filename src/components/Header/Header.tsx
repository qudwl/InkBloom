import { Group, Burger, ActionIcon, Button, TextInput, Title, Box, Stack, Text } from '@mantine/core';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react';
import { useState } from 'react';
import { useStore } from '../../store/useStore';

export function Header() {
    const sidebarOpened = useStore(state => state.sidebarOpened);
    const toggleSidebar = useStore(state => state.toggleSidebar);
    const mobileOpened = useStore(state => state.mobileOpened);
    const toggleMobile = useStore(state => state.toggleMobile);
    const currentEntry = useStore(state => state.currentEntry);
    const renameEntry = useStore(state => state.renameEntry);
    const createEntry = useStore(state => state.createEntry);

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleEditValue, setTitleEditValue] = useState('');

    function startEditingTitle() {
        if (currentEntry) {
            setTitleEditValue(currentEntry.displayName);
            setIsEditingTitle(true);
        }
    }

    function saveTitle() {
        if (currentEntry && titleEditValue.trim() && titleEditValue !== currentEntry.displayName) {
            renameEntry(currentEntry, titleEditValue.trim());
        }
        setIsEditingTitle(false);
    }

    function cancelTitleEdit() {
        setIsEditingTitle(false);
        setTitleEditValue('');
    }

    return (
        <>
            <Box
                h={80}
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    backgroundColor: 'var(--mantine-color-body)',
                    borderBottom: '1px solid var(--mantine-color-default-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Group justify="space-between" h="100%">
                    <Group>
                        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <ActionIcon
                            onClick={toggleSidebar}
                            variant="subtle"
                            size="lg"
                            visibleFrom="sm"
                            aria-label="Toggle sidebar"
                        >
                            {sidebarOpened ? <IconLayoutSidebarLeftCollapse size={20} /> : <IconLayoutSidebarLeftExpand size={20} />}
                        </ActionIcon>
                        <Stack gap={0}>
                            <Box h={32} style={{ display: 'flex', alignItems: 'center' }}>
                                {isEditingTitle && currentEntry ? (
                                    <TextInput
                                        variant="unstyled"
                                        value={titleEditValue}
                                        onChange={(e) => setTitleEditValue(e.currentTarget.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') saveTitle();
                                            if (e.key === 'Escape') cancelTitleEdit();
                                        }}
                                        onBlur={saveTitle}
                                        autoFocus
                                        styles={{
                                            input: {
                                                fontSize: '1.25rem',
                                                fontWeight: 600,
                                                lineHeight: 1,
                                                height: '32px',
                                                padding: 0
                                            }
                                        }}
                                    />
                                ) : (
                                    <Title
                                        order={3}
                                        onClick={startEditingTitle}
                                        style={{
                                            cursor: currentEntry ? 'pointer' : 'default',
                                            userSelect: 'none',
                                            transition: 'opacity 0.2s',
                                            fontSize: '1.25rem', // Match TextInput
                                            lineHeight: 1,
                                            height: '32px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        onMouseEnter={(e) => currentEntry && (e.currentTarget.style.opacity = '0.7')}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                    >
                                        {currentEntry?.displayName || 'My Journal'}
                                    </Title>
                                )}
                            </Box>
                            {currentEntry && (
                                <Text size="xs" c="dimmed" style={{ lineHeight: 1.2 }}>
                                    {new Date(currentEntry.date).toLocaleString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit'
                                    })}
                                </Text>
                            )}
                        </Stack>
                    </Group>
                    <Group>
                        <Button onClick={createEntry}>New Entry</Button>
                    </Group>
                </Group>
            </Box>
        </>
    );
}
