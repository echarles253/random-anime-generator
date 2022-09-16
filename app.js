//create  a search bar that takes in the user input done
//use event listener for click and the enter key
//assign the serach variable to the api command  done
//create a card for each of the results to populate on 

let searchBar = '';
let id;
let randomId;
let random;
let mainBox = $('#main-container');
let homeId;
$('#search').keyup((event) => {
   
    if (event.which === 13) {
        $('#submit').click();
    }
    });
    
    $('#submit').click(() => {
        searchBar = ($(':text').val())
        if(searchBar === '') {
            alert('Please enter an anime')
        }
        mainBox.empty();
        id = `https://api.jikan.moe/v4/anime?q=${searchBar}`;
        
        fetch(id)
        .then((res) => res.json())
        .then((data) => {
            if(data.pagination.items.total === 0) {
                alert('Please spell the anime correctly')
                homepage();S
            } else {
                animeData(data);

            }
        });
        
        
        
    });
    let animeData = (res) => {
        for(let i = 0;i<res.data.length;i++) {
            let anime = res.data[i];
            let animeObj = {
                title: anime.title,
                genres: anime.genres.map((genres) => genres.name).join(', '),
                img:anime.images.jpg.image_url,
                ep:anime.episodes,
                rating:anime.rating,
                url:anime.url,
                year:anime.year,
                sum:anime.synopsis,
            }
            if(!animeObj.year) {
                animeObj.year = 'Unsure of publish year'
            }
            if(animeObj.rating.includes('x') || !animeObj.rating) {
                delete animeObj.rating
            } else {
                let $card = $(`<span class='card'></span>`);
                let $title = $(`<h2 class='main-title' >${animeObj.title}</h2>`);
                let $img = $(`<img class='card-img' src="${animeObj.img}"/>`);
                let $ep = $( `<h3 class='card-ep'> Episodes:${animeObj.ep} Year: ${animeObj.year}</h3>`);
                let $genres = $( `<h4 class='card-genres' >${animeObj.genres}</h4>`);
                let $rating = $(`<p class='card-rating'>rating: ${animeObj.rating}</p>`);
                let $sum = $( `<p class='card-sum' >${animeObj.sum}</p>`);
                let $url = $(`<a class='card-url' href="${animeObj.url}">view show </a>`);
                
                $card.append($title);
                
                $card.append($img);
                
                $card.append($ep);
                
                $card.append($genres);
                
                $card.append($rating);
                
                $card.append($sum);
                
                $card.append($url);
                
                mainBox.append($card);
 
            } 
        }
        
    }
    
    
    let randomAnime = () => {
        
        randomId = `https://api.jikan.moe/v4/random/anime`; 
        fetch(randomId)
        .then((res) => res.json())
        .then((data) => {
            
            for(let key in data) {
                let randomData = data[key];
                
                let randomObj = {
                    title: randomData.title,
                    genres: randomData.genres.map((genres) => genres.name).join(', '),
                    img:randomData.images.jpg.image_url,
                    ep:randomData.episodes,
                    rating:randomData.rating,
                    url:randomData.url,
                    year:randomData.year,
                    sum:randomData.synopsis,
                }
                if(!randomObj.year) {
                    randomObj.year = 'Unsure of publish year';
                }
                if(randomObj.rating.includes('x') || !randomObj.rating) {
                    delete randomObj.rating;
                    randomAnime();
                } else {
                    let $randomCard = $(`<span class='card'></span>`);
                    let $randomTitle = $(`<h2 class='main-title' >${randomObj.title}</h2>`);
                    let $randomImg = $(`<img class='card-img' src="${randomObj.img}"/>`);
                    let $randomEp = $( `<h3 class='card-ep'> Episodes:${randomObj.ep} Year: ${randomObj.year}</h3>`);
                    let $randomGenres = $( `<h4 class='card-genres' >${randomObj.genres}</h4>`);
                    let $randomRating = $(`<p class='card-rating'>rating: ${randomObj.rating}</p>`);
                    let $randomSum = $( `<p class='card-sum' >${randomObj.sum}</p>`);
                    let $randomUrl = $(`<a class='card-url' href="${randomObj.url}">view show </a>`);
                    
                    $randomCard.append($randomTitle);
                    
                    $randomCard.append($randomImg);
                    
                    $randomCard.append($randomEp);
                    
                    $randomCard.append($randomGenres);
                    
                    $randomCard.append($randomRating);
                    
                    $randomCard.append($randomSum);
                    
                    $randomCard.append($randomUrl);
                    
                    $('#random-card').append($randomCard);

                    mainBox.append($randomCard);
                    
            }
            
        }
        
        
        
    });
}
$('#random').click(() => {
    mainBox.empty();
    randomAnime();
})

let homepage = () => {
    homeId = `https://api.jikan.moe/v4/recommendations/anime`
    fetch(homeId)
    .then((res) => res.json())
    .then((data) => {
        
        for(let k in data) {
            
            for(l = 0;l<data[k].length;l++) {
                let home = data[k][l].entry;
                
                let homeAnime = {
                    homeImg:home[0].images.jpg.image_url,
                    homeTitle:home[0].title,
                    homeUrl:home[0].url, 
                }
                
                let homeCard = $(`<span class='card'></span>`);

                let $homeTitle0 = $(`<h2 class='main-title' >${homeAnime.homeTitle}</h2>`);
                
                let $img0 = $(`<img class='card-img' src="${homeAnime.homeImg}"/>`);
                
                let $url0 = $(`<a class='card-url' href="${homeAnime.homeUrl}">view show </a>`);

                let $empty = $(`<p class="empty"> </p>`);

                homeCard.append($homeTitle0);
                
            homeCard.append($img0);

            homeCard.append($empty)

            homeCard.append($url0);
            
            $('#home-card').append(homeCard);
            
            mainBox.append(homeCard);
            
        }
    }      
});
}   
$('#home-page').click(()=> {
    mainBox.empty()
    homepage();
})
homepage();

