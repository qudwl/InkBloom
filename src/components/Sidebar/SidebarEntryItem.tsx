import { NavLink, Group, Text, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { JournalEntry } from '../../services/storage';

interface SidebarEntryItemProps {
    entry: JournalEntry;
    isSelected: boolean;
    isHovered: boolean;
    onSelect: () => void;
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
}

export function SidebarEntryItem({
    entry,
    isSelected,
    isHovered,
    onSelect,
    onEdit,
    onDelete
}: SidebarEntryItemProps) {
    return (
        <NavLink
            label={
                <Group justify="space-between" wrap="nowrap">
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <Text size="sm" truncate>
                            {entry.displayName}
                        </Text>
                        <Text size="xs" c="dimmed" truncate>
                            {(entry.lastModified || entry.date).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                            })}
                        </Text>
                    </div>
                    {isHovered && (
                        <Group gap={4}>
                            <ActionIcon
                                size="xs"
                                variant="subtle"
                                onClick={onEdit}
                            >
                                <IconEdit size={14} />
                            </ActionIcon>
                            <ActionIcon
                                size="xs"
                                variant="subtle"
                                color="red"
                                onClick={onDelete}
                            >
                                <IconTrash size={14} />
                            </ActionIcon>
                        </Group>
                    )}
                </Group>
            }
            active={isSelected}
            onClick={onSelect}
            variant="light"
        />
    );
}
