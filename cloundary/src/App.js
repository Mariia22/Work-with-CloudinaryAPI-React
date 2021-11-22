import { useState, useEffect } from 'react'
import './App.css'
import { getImages, searchImages } from './api';

function App() {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [value, setValue] = useState('');
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

  const handleSearch = async (event) => {
    event.preventDefault();
    const responseJson = await searchImages(value, nextCursor);
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor)
  }

  const clearSearchForm = async () => {
    const responseJson = await getImages();
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
    setValue('');
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <input type='text' placeholder="Enter a search value" value={value} onChange={(event) => { setValue(event.target.value) }} />
        <button type='submit' >Search</button>
        <button type='button' onClick={clearSearchForm}>Clear</button>
      </form>
      <div className="container">
        {imageList.map(image => <img src={image.url} alt={image.public_id} />)}
      </div>
      <div className="footer"> {nextCursor && <button onClick={handleClickLoadMore}>Load More</button>}</div>
    </>
  );

}


export default App;
