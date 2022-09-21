$('.search-button').on('click' , function(s) {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=2b182939&s=' + $('.input-keyword').val(),
        success: result => {
            const movieTitle = result.Search;
    
            let cards = '';
    
            movieTitle.forEach(m => {
                cards += `<div class="card col-md-4 my-3">
                <img src="${m.Poster}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <p class="card-text">${m.Type}</p>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}"">Details Movies</a>
                </div>
            </div>`
            })
            $('.movie-container').html(cards);
    
            $('.modal-detail-button').on('click' , function(m) {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=2b182939&i=' + $(this).data('imdbid'),
                    success: mt => {
                        let movieDetail = `<div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${mt.Poster}" alt="" class="img-fluid">
                            </div>
                            <div class="col-md">
                                <ul class="list-group">
                                    <li class="list-group-item"><strong>Movies Name: </strong>${mt.Title}</li>
                                    <li class="list-group-item"><strong>Director: </strong>${mt.Director}</li>
                                    <li class="list-group-item"><strong>Actors: </strong>${mt.Actors}</li>
                                    <li class="list-group-item"><strong>Writer: </strong>${mt.Writer}</li>
                                    <li class="list-group-item"><strong>Plot: </strong>${mt.Plot}</li>
                                  </ul>
                            </div>
                        </div>
                      </div>`;
                      $('.modal-body').html(movieDetail);
                    },
                    error : errorMessage => {
                        console.log(errorMessage.responseText);
                    }
                })
            })
        },
        error: errorMessage => {
            console.log(errorMessage.responseText);
        }
    })
});



