import Tic from "./Components/Tic.jsx";
import { useState, useEffect } from "react";
import { lazy } from "react";
const Loader = lazy(()=> import('./components/Loader.jsx'))


function App() {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (or use your actual loading logic)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
<>
     <Tic/>
    <>
     <div>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (<></>)}
      </div>
    </>
</>
  )
}

export default App
