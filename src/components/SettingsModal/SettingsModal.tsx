import { Modal, Stack, Text, Group, Divider, SegmentedControl, Center, Box, Button, Alert, Slider } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop, IconList, IconFileText, IconNotebook, IconLetterCase, IconAlertTriangle, IconTrash } from '@tabler/icons-react';
import { useStore } from '../../store/useStore';
import { useState } from 'react';

interface SettingsModalProps {
    opened: boolean;
    onClose: () => void;
}

export function SettingsModal({ opened, onClose }: SettingsModalProps) {
    const theme = useStore(state => state.theme);
    const setTheme = useStore(state => state.setTheme);
    const viewMode = useStore(state => state.viewMode);
    const setViewMode = useStore(state => state.setViewMode);
    const fontFamily = useStore(state => state.fontFamily);
    const setFontFamily = useStore(state => state.setFontFamily);
    const uiFontFamily = useStore(state => state.uiFontFamily);
    const setUiFontFamily = useStore(state => state.setUiFontFamily);
    const fontSize = useStore(state => state.fontSize);
    const setFontSize = useStore(state => state.setFontSize);
    const resetData = useStore(state => state.resetData);

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleReset = async () => {
        await resetData();
        setConfirmDelete(false);
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title={<Text fw={700}>Settings</Text>} centered size="md">
            <Stack gap="xl">
                <Box>
                    <Text size="xs" fw={700} mb="sm" c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Appearance</Text>
                    <Stack gap="md">
                        <Group justify="space-between">
                            <Text size="sm">Theme</Text>
                            <SegmentedControl
                                value={theme}
                                onChange={(value) => setTheme(value as any)}
                                data={[
                                    { value: 'light', label: <Center><IconSun size={16} /><Box ml={8}>Light</Box></Center> },
                                    { value: 'dark', label: <Center><IconMoon size={16} /><Box ml={8}>Dark</Box></Center> },
                                    { value: 'auto', label: <Center><IconDeviceDesktop size={16} /><Box ml={8}>Auto</Box></Center> },
                                    { value: 'paper', label: <Center><IconNotebook size={16} /><Box ml={8}>Paper</Box></Center> },
                                ]}
                            />
                        </Group>

                        <Group justify="space-between">
                            <Text size="sm">Editor Font</Text>
                            <SegmentedControl
                                value={fontFamily}
                                onChange={(value) => setFontFamily(value as any)}
                                data={[
                                    {
                                        value: 'sans',
                                        label: <Center><IconLetterCase size={16} /><Box ml={8} style={{ fontFamily: 'sans-serif' }}>Sans</Box></Center>
                                    },
                                    {
                                        value: 'serif',
                                        label: <Center><IconLetterCase size={16} /><Box ml={8} style={{ fontFamily: 'serif' }}>Serif</Box></Center>
                                    },
                                    {
                                        value: 'mono',
                                        label: <Center><IconLetterCase size={16} /><Box ml={8} style={{ fontFamily: 'monospace' }}>Mono</Box></Center>
                                    },
                                ]}
                            />
                        </Group>

                        <Group justify="space-between">
                            <Text size="sm">UI Font</Text>
                            <SegmentedControl
                                value={uiFontFamily}
                                onChange={(value) => setUiFontFamily(value as any)}
                                data={[
                                    {
                                        value: 'sans',
                                        label: <Center><IconLetterCase size={16} /><Box ml={8} style={{ fontFamily: 'sans-serif' }}>Sans</Box></Center>
                                    },
                                    {
                                        value: 'serif',
                                        label: <Center><IconLetterCase size={16} /><Box ml={8} style={{ fontFamily: 'serif' }}>Serif</Box></Center>
                                    },
                                    {
                                        value: 'mono',
                                        label: <Center><IconLetterCase size={16} /><Box ml={8} style={{ fontFamily: 'monospace' }}>Mono</Box></Center>
                                    },
                                ]}
                            />
                        </Group>

                        <Box>
                            <Text size="sm" mb={4}>Editor Font Size ({fontSize}px)</Text>
                            <Slider
                                value={fontSize}
                                onChange={setFontSize}
                                min={12}
                                max={32}
                                step={1}
                                marks={[
                                    { value: 12, label: '12' },
                                    { value: 16, label: '16' },
                                    { value: 20, label: '20' },
                                    { value: 24, label: '24' },
                                    { value: 28, label: '28' },
                                    { value: 32, label: '32' },
                                ]}
                                mb="xl"
                            />
                        </Box>
                    </Stack>
                </Box>

                <Box>
                    <Text size="xs" fw={700} mb="sm" c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Layout</Text>
                    <Group justify="space-between">
                        <Text size="sm">Default View</Text>
                        <SegmentedControl
                            value={viewMode}
                            onChange={(value) => setViewMode(value as any)}
                            data={[
                                { value: 'feed', label: <Center><IconList size={16} /><Box ml={10}>Feed</Box></Center> },
                                { value: 'single', label: <Center><IconFileText size={16} /><Box ml={10}>Entry</Box></Center> },
                            ]}
                        />
                    </Group>
                </Box>

                <Box>
                    <Text size="xs" fw={700} mb="sm" c="red" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Danger Zone</Text>
                    {confirmDelete ? (
                        <Alert color="red" title="Are you absolutely sure?" icon={<IconAlertTriangle size={16} />}>
                            <Text size="sm" mb="md">
                                This will permanently delete all your journal entries. This action cannot be undone.
                            </Text>
                            <Group justify="flex-end">
                                <Button variant="subtle" color="gray" size="xs" onClick={() => setConfirmDelete(false)}>
                                    Cancel
                                </Button>
                                <Button color="red" size="xs" onClick={handleReset} leftSection={<IconTrash size={14} />}>
                                    Yes, delete everything
                                </Button>
                            </Group>
                        </Alert>
                    ) : (
                        <Button
                            fullWidth
                            variant="light"
                            color="red"
                            onClick={() => setConfirmDelete(true)}
                            leftSection={<IconTrash size={16} />}
                        >
                            Reset Data & Delete All Entries
                        </Button>
                    )}
                </Box>

                <Divider />

                <Box pb="xs">
                    <Text size="xs" c="dimmed" ta="center">
                        Journal App v0.1.0
                    </Text>
                </Box>
            </Stack>
        </Modal>
    );
}
