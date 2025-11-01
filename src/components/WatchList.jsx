import React, { useState, useEffect } from "react";
import genres from "../utility/genre";

const WatchList = ({ watchList, setWatchList, handleRemoveFromWatchlist }) => {
  const [searchText, setSearchText] = useState("");
  const [genreList, setGenreList] = useState(["All Genre"]);
  const [currGenre, setCurrGenre] = useState("All Genre");

  let handleSeach = (e) => {
    setSearchText(e.target.value);
  };

  let handleGenreFilter = (genre) => {
    console.log(genre);
    setCurrGenre(genre);
  };

  let sortAscending = () => {
    let sortAsc = watchList.sort((MovieA, MovieB) => {
      return MovieA.vote_average - MovieB.vote_average;
    });
    setWatchList([...sortAsc]);
  };

  let sortDiscending = () => {
    let sortDesc = watchList.sort((MovieA, MovieB) => {
      return MovieB.vote_average - MovieA.vote_average;
    });
    setWatchList([...sortDesc]);
  };

  useEffect(() => {
    let tmp = watchList.map((movieObj) => {
      return genres[movieObj.genre_ids[0]];
    });

    tmp = new Set(tmp);
    setGenreList(["All Genre", ...tmp]);
  }, [watchList]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => {
                handleGenreFilter(genre);
              }}
              key={genre}
              className={
                currGenre == genre
                  ? "flex justify-center items-center h-[3rem] w-[9rem]  rounded-xl text-white font-bold mx-4 my-4 bg-blue-400"
                  : "flex justify-center items-center h-[3rem] w-[9rem]  rounded-xl text-white font-bold mx-4 my-4 bg-gray-400"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSeach}
          value={searchText}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>
      <div className="border border-gray-200 m-8 ">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div className="p-2" onClick={sortAscending}>
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Rating</div>
                <div className="p-2" onClick={sortDiscending}>
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchList
              .filter((movieObj) => {
                if (currGenre == "All Genre") {
                  return true;
                } else {
                  return genres[movieObj.genre_ids[0]] == currGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genres[movieObj.genre_ids[0]]}</td>
                    <td
                      onClick={() => handleRemoveFromWatchlist(movieObj)}
                      className="text-red-800"
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
