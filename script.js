$('.search-button').on('click' , function() {

    $.ajax ({
        url: 'http://www.omdbapi.com/?apikey=2b182939&s=' + $('.input-keyword').val(),
        success: result => {
            const moviesTitle = result.Search;
    
            let cards = '';
            moviesTitle.forEach(m => {
                cards += showCards(m);
            })
    
            $('.movie-container').html(cards);
            
            $('.modal-detail-button').on('click',function(m){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=2b182939&i=' + $(this).data('imdbid'),
                    success: mt => {
                        movieDetail = showMovieDetail(mt);
                    $('.modal-body').html(movieDetail);
                    },
                    
                })
            })
        
        
        } , 
        error: errorMessage => {
            console.log(errorMessage.responseText);
        }
    })
})


function showCards (m) {
    return ` <div class="col-md-4 my-3">
    <div class="card">
        <img src="${m.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <h5 class="card-title">${m.Type}</h5>
            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
        </div>
    </div>
</div>`;
}

function showMovieDetail (mt) {
            return  `<div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${mt.Poster}" class="img-fluid" alt="${mt.Poster}">
                        </div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Judul Film : </strong>${mt.Title}</li>
                                <li class="list-group-item"><strong>Sutradara : </strong>${mt.Director}</li>
                                <li class="list-group-item"><strong>Pemeran: </strong>${mt.Actors}</li>
                                <li class="list-group-item"><strong>Writer : </strong>${mt.Writer}</li>
                                <li class="list-group-item"><strong>Plot : </strong>${mt.Plot}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
}