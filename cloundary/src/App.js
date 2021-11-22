import { useState, useEffect } from 'react'
import './App.css'
import { getImages } from './api';

function App() {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const responseJson = await getImages();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
    }
    fetchData();
  }, []);

  const handleClickLoadMore = async () => {
    const responseJson = await getImages(nextCursor);
    setImageList((currentImageList) => [...currentImageList, ...responseJson.resources]);
    setNextCursor(responseJson.next_cursor)
  }
  return (
    <>
      <div className="container">
        {imageList.map(image => <img src={image.url} alt={image.public_id} />)}
      </div>
      <div className="footer"> {nextCursor && <button onClick={handleClickLoadMore}>Load More</button>}</div>
    </>
  );
}

export default App;
