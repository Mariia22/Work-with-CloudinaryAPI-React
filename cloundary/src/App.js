import { useState } from 'react'
import './App.css'
import images from './api-mock.json'

function App() {
  const [imageList, setImageList] = useState(images.resources);
  return (
    <div className="container">
      {imageList.map(image => <img src={image.url} alt={image.public_id} />)}
    </div>
  );
}

export default App;
