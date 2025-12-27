import { Modal, Text, Group, Button } from '@mantine/core';

interface DeleteConfirmModalProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    entryName: string;
}

export function DeleteConfirmModal({ opened, onClose, onConfirm, entryName }: DeleteConfirmModalProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Delete Entry"
            centered
        >
            <Text size="sm" mb="md">
                Are you sure you want to delete <strong>"{entryName}"</strong>?
                This action cannot be undone.
            </Text>
            <Group justify="flex-end" gap="sm">
                <Button variant="default" onClick={onClose}>
                    Cancel
                </Button>
                <Button color="red" onClick={handleConfirm}>
                    Delete
                </Button>
            </Group>
        </Modal>
    );
}
