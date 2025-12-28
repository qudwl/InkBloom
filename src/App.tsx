import { AppShell, useMantineColorScheme } from '@mantine/core';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { JournalFeed } from './components/JournalFeed';
import { SingleEntryView } from './components/SingleEntryView';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import './App.css';

function App() {
  const sidebarOpened = useStore(state => state.sidebarOpened);
  const mobileOpened = useStore(state => state.mobileOpened);
  const loadEntries = useStore(state => state.loadEntries);
  const viewMode = useStore(state => state.viewMode);
  const theme = useStore(state => state.theme);
  const fontFamily = useStore(state => state.fontFamily);
  const uiFontFamily = useStore(state => state.uiFontFamily);
  const fontSize = useStore(state => state.fontSize);
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    loadEntries();
  }, []);

  useEffect(() => {
    if (theme === 'paper') {
      setColorScheme('light');
    } else {
      setColorScheme(theme as 'light' | 'dark' | 'auto');
    }
    document.body.setAttribute('data-theme', theme);
    document.body.setAttribute('data-font', fontFamily);
    document.body.setAttribute('data-ui-font', uiFontFamily);
    document.body.style.setProperty('--journal-font-size', `${fontSize}px`);
  }, [theme, fontFamily, uiFontFamily, fontSize, setColorScheme]);

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !sidebarOpened },
      }}
      padding="md"
    >
      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main pt={0}>
        <Header />

        <div
          className="app-content-wrapper"
          style={{
            maxWidth: viewMode === 'feed' ? 800 : '100%',
            margin: '0 auto',
            minHeight: 'calc(100vh - 80px)' // Ensure it fills area
          }}
        >
          {viewMode === 'feed' ? <JournalFeed /> : <SingleEntryView />}
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
