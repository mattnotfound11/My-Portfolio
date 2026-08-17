import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Stack } from './sections/Stack';
import { Work } from './sections/Work';
import { Credentials } from './sections/Credentials';
import { Contact } from './sections/Contact';
import './App.css';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
