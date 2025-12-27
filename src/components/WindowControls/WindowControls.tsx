import { Group, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconMinus, IconSquare, IconX, IconWindowMaximize } from '@tabler/icons-react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useState, useEffect } from 'react';
import { useOS } from '../../hooks/useOS';

export function WindowControls() {
    const theme = useMantineTheme();
    const [isMaximized, setIsMaximized] = useState(false);
    const os = useOS();

    useEffect(() => {
        const checkMaximized = async () => {
            const win = getCurrentWindow();
            setIsMaximized(await win.isMaximized());
        };

        const unlisten = getCurrentWindow().onResized(async () => {
            checkMaximized();
        });

        checkMaximized();
        return () => {
            unlisten.then(f => f());
        }
    }, []);

    if (os === 'macos') return null;

    const minimize = async () => {
        await getCurrentWindow().minimize();
    };

    const toggleMaximize = async () => {
        await getCurrentWindow().toggleMaximize();
        const win = getCurrentWindow();
        setIsMaximized(await win.isMaximized());
    };

    const close = async () => {
        await getCurrentWindow().close();
    };

    return (
        <Group gap={0}>
            <ActionIcon
                variant="subtle"
                color="gray"
                onClick={minimize}
                size="lg"
                title="Minimize"
            >
                <IconMinus size={18} />
            </ActionIcon>
            <ActionIcon
                variant="subtle"
                color="gray"
                onClick={toggleMaximize}
                size="lg"
                title="Maximize"
            >
                {isMaximized ? <IconSquare size={16} /> : <IconWindowMaximize size={16} />}
            </ActionIcon>
            <ActionIcon
                variant="subtle"
                color="red"
                onClick={close}
                size="lg"
                title="Close"
                style={{
                    '&:hover': {
                        backgroundColor: 'red',
                        color: 'white'
                    }
                }}
            >
                <IconX size={18} />
            </ActionIcon>
        </Group>
    );
}
