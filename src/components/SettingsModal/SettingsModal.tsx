import { Modal, Stack, Text, Group, Divider, useMantineColorScheme, SegmentedControl, Center, Box } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

interface SettingsModalProps {
    opened: boolean;
    onClose: () => void;
}

export function SettingsModal({ opened, onClose }: SettingsModalProps) {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    return (
        <Modal opened={opened} onClose={onClose} title="Settings" centered>
            <Stack gap="md">
                <Box>
                    <Text size="sm" fw={500} mb="xs">Appearance</Text>
                    <Group justify="space-between">
                        <Text size="sm" c="dimmed">Theme</Text>
                        <SegmentedControl
                            value={colorScheme}
                            onChange={(value) => setColorScheme(value as 'light' | 'dark' | 'auto')}
                            data={[
                                {
                                    value: 'light',
                                    label: (
                                        <Center>
                                            <IconSun size={16} />
                                            <Box ml={10}>Light</Box>
                                        </Center>
                                    ),
                                },
                                {
                                    value: 'dark',
                                    label: (
                                        <Center>
                                            <IconMoon size={16} />
                                            <Box ml={10}>Dark</Box>
                                        </Center>
                                    ),
                                },
                                {
                                    value: 'auto',
                                    label: (
                                        <Center>
                                            <IconDeviceDesktop size={16} />
                                            <Box ml={10}>Auto</Box>
                                        </Center>
                                    ),
                                },
                            ]}
                        />
                    </Group>
                </Box>

                <Divider />

                <Box>
                    <Text size="xs" c="dimmed" ta="center">
                        Journal App v0.1.0
                    </Text>
                </Box>
            </Stack>
        </Modal>
    );
}
