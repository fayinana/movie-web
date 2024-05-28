const apiKey = "51f7ecae";
const bigContainer = document.querySelector(".big-container");
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=Drama`;
const movieList = [];
let seeMore;
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    movieList.push(...data.Search);
    return movieList;
  })
  .then((movies) => {
    console.log(movies);
    movies.forEach((movie) => {
      const html = `
       <div
            class="w-120 h-48 m-auto flex flex-nowrap justify-between items-center pr-4 bg-slate-900 rounded-lg overflow-hidden z-30">
            <div class="w-3/7 h-full">
                <img src="${movie.Poster}" class="w-full h-full object-cover block" alt="">
            </div>
            <div class="w-4/7  h-full flex flex-wrap justify-center items-start pl-6 flex-col gap-2 relative">
        <p class="text-white capitalize font-bold text-2.5xl w-[200px] flex">
  <span class="whitespace-nowrap overflow-hidden text-ellipsis">${movie.Title}</span>
  <span class="text-gray-600 text-sm">(${movie.Year})</span>
</p> 
                <p class="text-1xl text-gray-500 font-bold">2h 5m</p>
                <p class="text-1xl text-yellow-500 font-semibold capitalize mb-4">${movie.Type}</p>
                <div class=" flex justify-center items-center gap-8 relative pl-10">
                    <p class="text-black bg-yellow-500 absolute left-[-65px] font-extrabold px-2 py-1 top-3 z-10">7.5
                    </p>
                    <p
                        class="text-white border-2 border-yellow-500 px-3 py-1 hover:bg-yellow-500 uppercase rounded cursor-pointer">
                        3d
                        max</p>
                    <p
                        class="text-white border-2 border-yellow-500 px-3 py-1 hover:bg-yellow-500 uppercase rounded cursor-pointer">
                        4d
                    </p>
                </div>

                <div class="absolute text-white text-6xl right-0 cursor-pointer top-1/2 -translate-y-1/2 see-more" data-id="${movie.imdbID}">>

                </div>
            </div>
        </div>
       
      
      `;
      bigContainer.insertAdjacentHTML("beforeend", html);
      seeMore = document.querySelectorAll(".see-more");
      seeMore.forEach((see) => {
        see.addEventListener("click", (e) => {
          e.preventDefault();
          const imdbID = see.dataset.id;
          overView.style.opacity = "1";
          overView.classList.add("translate-x-0");
          overView.classList.remove("translate-x-full");
          const img = overView.querySelector(".more-img");
          fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.Response === "True") {
                console.log(data);
                img.src = data.Poster;
              } else {
                console.log("Error:", data.Error);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const overView = document.querySelector(".over-view");
const exit = document.querySelector(".exit");

exit.addEventListener("click", (e) => {
  e.preventDefault();
  overView.style.opacity = "0";
  overView.classList.add("translate-x-full");
  overView.classList.remove("translate-x-0");
});
