import { useState, useEffect } from 'react'
import './App.css'
import { getImages } from './api';

function App() {
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
    }
    fetchData();
  }, []);
  return (
    <div className="container">
      {imageList.map(image => <img src={image.url} alt={image.public_id} />)}
    </div>
  );
}

export default App;
