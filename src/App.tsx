import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import PlayCanvas from './PlayCanvas'
import PlayCanvasGLB from './PlayCanvasGLB'

function App() {
  const [count, setCount] = useState(0)
  // const modelUrl = process.env.PUBLIC_URL + `models/s15-jdm-free/source/s15_origin_free.glb`;

  return (
    <div className="App">
      <PlayCanvas width={800} height={600} />
      {/* <PlayCanvasGLB width={800} height={600} modelUrl={process.env.PUBLIC_URL + `models/s15-jdm-free/source/s15_origin_free.glb`} /> */}
    </div>
  )
}

export default App
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.')
}

