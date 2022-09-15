//create  a search bar that takes in the user input done
//use event listener for click and the enter key
//assign the serach variable to the api command  done
//create a card for each of the results to populate on 
//  let search = ''
let searchBar = '';
let id;
let mainBox = $('#main-container');

$('#submit').click(() => {
    searchBar = ($(':text').val())
    mainBox.empty();
     id = `https://api.jikan.moe/v4/anime?q=${searchBar}`
    
     fetch(id)
    .then((res) => res.json())
    .then((data) => {
        animeData(data);
     })
    //console.log(searchBar)
    //onsole.log(animeObj)
    
    
})
let animeData = (res) => {
    for(let i = 0;i<res.data.length;i++) {
        let anime = res.data[i];
        let animeObj = {
            title: anime.title_english,
            genres: anime.genres.map((genres) => genres.name).join(', '),
            img:anime.images.jpg.image_url,
            ep:anime.episodes,
            rating:anime.rating,
            url:anime.url,
            year:anime.year,
        }
       let $card = $(`<span class='card'></span>`)
       let $title = $(`<h2 class='main-title'></h2>`)
        let $img = $(`<img class='card-img'/>`)
        let $ep = $( `<p class='card-ep'> Episodes:</p>`)
        let $rating = $(`<h3 class='card-rating'>rating:</h3>`)
        let $genres = $( `<p class='card-genres'></p>`)
        let $year = $( `<p class='card-year'></p>`)
        let $url = $(`<a class='card-url'>view show </a>`)
        
        $title.text(animeObj.title);
        $card.append($title);

        $img.attr('src', animeObj.img);
        $img.attr('href', animeObj.url)
        $card.append($img);

        $ep.append(animeObj.ep);
        $card.append($ep);

        $rating.append(animeObj.rating);
         $card.append($rating);

         $genres.append(animeObj.genres);
         $card.append($genres);

         $year.append(animeObj.year);
         $card.append($year);

         $url.attr('href', animeObj.url);
         $card.append($url);
        console.log(animeObj.url)
        mainBox.append($card);
    }
   
 }


