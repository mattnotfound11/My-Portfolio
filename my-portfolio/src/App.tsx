import { useCallback, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader, introAlreadySeen } from './components/Preloader';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/Motion';
import { FloatingDock } from './components/FloatingDock';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Stack } from './sections/Stack';
import { Work } from './sections/Work';
import { Credentials } from './sections/Credentials';
import { Contact } from './sections/Contact';
import './App.css';

function App() {
  const [ready, setReady] = useState(() => introAlreadySeen());
  const onIntroDone = useCallback(() => setReady(true), []);

  return (
    <>
      {!introAlreadySeen() && <Preloader onDone={onIntroDone} />}
      <SmoothScroll />
      <ScrollProgress />

      <div className={`stage ${ready ? 'is-ready' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Stack />
          <Work />
          <Credentials />
          <Contact />
        </main>
        <Footer />
        <FloatingDock />
      </div>
    </>
  );
}

export default App;
