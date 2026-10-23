import { useCallback, useEffect, useState } from 'react';
import { usePath } from './router';
import { useTheme } from './theme';
import { Layout } from './components/Layout';
import { Loader, loaderAlreadySeen } from './components/Loader';
import { CommandPalette } from './components/CommandPalette';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Resume } from './pages/Resume';
import { Stack } from './pages/Stack';
import { Certifications } from './pages/Certifications';
import { Gear } from './pages/Gear';
import { Shop } from './pages/Shop';
import { NotFound } from './pages/NotFound';

const PAGES: Record<string, () => React.ReactElement> = {
  '/': Home,
  '/projects': Projects,
  '/resume': Resume,
  '/stack': Stack,
  '/certifications': Certifications,
  '/gear': Gear,
  '/shop': Shop,
};

export default function App() {
  const path = usePath();
  const [theme, setTheme] = useTheme();
  const [palette, setPalette] = useState(false);
  const [ready, setReady] = useState(loaderAlreadySeen);
  const onLoaded = useCallback(() => setReady(true), []);
  const closePalette = useCallback(() => setPalette(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const Page = PAGES[path] ?? NotFound;

  return (
    <>
      {!ready && <Loader onDone={onLoaded} />}
      <Layout theme={theme} setTheme={setTheme} openPalette={() => setPalette(true)}>
        <Page key={path} />
      </Layout>
      <CommandPalette open={palette} onClose={closePalette} setTheme={setTheme} />
    </>
  );
}
