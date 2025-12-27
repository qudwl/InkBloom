import { platform } from '@tauri-apps/plugin-os';
import { useState, useEffect } from 'react';

export type OSType = 'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'unknown';

export function useOS() {
    const [os, setOs] = useState<OSType>('unknown');

    useEffect(() => {
        try {
            const currentPlatform = platform();
            setOs(currentPlatform);
        } catch (error) {
            console.error('Failed to get platform:', error);
            setOs('unknown');
        }
    }, []);

    return os;
}
