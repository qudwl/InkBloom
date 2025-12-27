import { Group, TextInput, ActionIcon } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

interface SidebarEntryEditProps {
    editValue: string;
    onEditValueChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export function SidebarEntryEdit({
    editValue,
    onEditValueChange,
    onSave,
    onCancel
}: SidebarEntryEditProps) {
    return (
        <Group gap="xs" wrap="nowrap">
            <TextInput
                size="xs"
                value={editValue}
                onChange={(e) => onEditValueChange(e.currentTarget.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onSave();
                    if (e.key === 'Escape') onCancel();
                }}
                autoFocus
                style={{ flex: 1 }}
            />
            <ActionIcon size="sm" color="green" onClick={onSave}>
                <IconCheck size={14} />
            </ActionIcon>
            <ActionIcon size="sm" color="red" onClick={onCancel}>
                <IconX size={14} />
            </ActionIcon>
        </Group>
    );
}
