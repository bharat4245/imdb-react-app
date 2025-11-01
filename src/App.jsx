import { useEffect, useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import { Routes, Route } from "react-router";

function App() {
  let [watchList, setWatchList] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchlist = [...watchList, movieObj];
    setWatchList(newWatchlist);
    localStorage.setItem("movieApp", JSON.stringify(newWatchlist));
    console.log(newWatchlist);
  };

  let handleRemoveFromWatchlist = (movieObj) => {
    let filterWatchlist = watchList.filter((movie) => {
      return movie.id != movieObj.id;
    });

    setWatchList(filterWatchlist);
    localStorage.setItem("movieApp", JSON.stringify(filterWatchlist));
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("movieApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                handleAddtoWatchlist={handleAddtoWatchlist}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchList={watchList}
              />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchList={watchList}
              setWatchList={setWatchList}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
