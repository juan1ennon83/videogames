import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const DETAIL_VIDEOGAMES = 'DETAIL_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const FILTER_GENRE = 'FILTER_GENRE';
export const ALL_GENRE = 'ALL_GENRE';
export const SORT_VIDEOGAMES_ASC_DESC = 'SORT_VIDEOGAMES_ASC_DESC';
export const SORT_VIDEOGAMES_RATING = 'SORT_VIDEOGAMES_RATING';
export const RESET_FILTER_GENRES = 'RESET_FILTER_GENRES';
export const RESET_ORDER = 'RESET_ORDER';
export const SET_PAGE = 'SET_PAGE';

// conexión par traer todas las cartas 
export const getVideogames = () => {
  return async (dispatch) => {
  //conectamos con la ruta de mi back-end
    const apiData = await axios.get('/videogames');
    const Videogames = apiData.data;
    dispatch({
      type: GET_VIDEOGAMES,
      payload: Videogames,
    });
  }
};

// traigo el detalle de la carta seleccionada por su id
export const detailVideogames = (id) => {
  return async (dispatch) => {
    const apiData = await axios.get(`/videogames/${id}`);
    const DetailGame = apiData.data;
    dispatch({
      type: DETAIL_VIDEOGAMES,
      payload: DetailGame,
    });
  }
};

// traigo las cartas que coincidan con el nombre ingresado
export const searchVideogames = (name) => {
  return async (dispatch) => {
    const apiData = await axios.get(`/videogames/name?name=${name}`);
    const Videogames = apiData.data; 
    dispatch({
      type: SEARCH_VIDEOGAMES,
      payload: Videogames,
    })
  }
};

export const AllGenres = () => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get('/genres');
      const genres = apiData.data;
      dispatch({
        type: ALL_GENRE,
        payload: genres,
      })
    } catch (error) {
      console.log(error.message, 'error en géneros');
    }
  }
}

// filtro por genero
export const filterGenre = (payload) => {
  return{
    type: FILTER_GENRE,
    payload
  }
}

// ordenamiento de juegos alfabético
export const orderVideogamesAscDesc = (payload) => {
  return {
    type: SORT_VIDEOGAMES_ASC_DESC,
    payload
  }
}

// ordenamiento de juegos por rating
export const orderVideogamesByRating = (payload) => {
  return {
    type: SORT_VIDEOGAMES_RATING,
    payload
  }
};

//reseteo de los filtros
export const resetGenres = (payload) => {
  return {
    type: RESET_FILTER_GENRES,
    payload
  }
}

//reset de los ordenes
export const resetOrder = (payload) => {
  return {
    type: RESET_ORDER,
    payload
  }
}

//seteo de pagina 1 al aplicar los filtros
export const setPage = (page) =>{
  return {
    type: SET_PAGE,
    payload: page
  }
}