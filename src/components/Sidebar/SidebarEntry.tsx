import { JournalEntry } from '../../services/storage';
import { useState } from 'react';
import { SidebarEntryItem } from './SidebarEntryItem';
import { SidebarEntryEdit } from './SidebarEntryEdit';
import { DeleteConfirmModal } from '../DeleteConfirmModal';

interface SidebarEntryProps {
    entry: JournalEntry;
    isSelected: boolean;
    onSelect: (entry: JournalEntry) => void;
    onRename: (entry: JournalEntry, newName: string) => void;
    onDelete: (entry: JournalEntry) => void;
}

export function SidebarEntry({
    entry,
    isSelected,
    onSelect,
    onRename,
    onDelete
}: SidebarEntryProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const startEditing = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        setEditValue(entry.displayName);
    };

    const saveEdit = () => {
        if (editValue.trim() && editValue !== entry.displayName) {
            onRename(entry, editValue.trim());
        }
        setIsEditing(false);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditValue('');
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteModalOpened(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(entry);
    };

    return (
        <>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isEditing ? (
                    <SidebarEntryEdit
                        editValue={editValue}
                        onEditValueChange={setEditValue}
                        onSave={saveEdit}
                        onCancel={cancelEdit}
                    />
                ) : (
                    <SidebarEntryItem
                        entry={entry}
                        isSelected={isSelected}
                        isHovered={isHovered}
                        onSelect={() => onSelect(entry)}
                        onEdit={startEditing}
                        onDelete={handleDeleteClick}
                    />
                )}
            </div>
            <DeleteConfirmModal
                opened={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                onConfirm={handleDeleteConfirm}
                entryName={entry.displayName}
            />
        </>
    );
}
