import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import SearchBar from '../../components/searchBar/SearchBar';
import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { getVideogames, orderVideogamesAscDesc, orderVideogamesByRating } from '../../redux/actions/actions';
import GenderFilter from '../../components/genderFilter/GenderFilter';
import Pagination from '../../components/pagination/Pagination';
import Card from '../../components/card/Card';
import PrimaryButton from '../../components/buttons/primaryButton/PrimaryButton';
import { NavLink } from 'react-router-dom';
import ResetFilters from '../../components/resetButtons/ResetFilters';
import Loading from '../../components/loading/Loading';  //TO BE CHANGED

const HomePage = () => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  const allVideogames = useSelector((state) => state.Videogames);
  const numPage = useSelector((state) => state.numPage);

  //estados locales para el paginado
  const [gamesPerPage] = useState(15);

  //obtener el indice del ultimo game
  const indexOfLastGame = numPage * gamesPerPage;

  //obtener el indice del primer game
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  //obtener el corte de los games por pagina
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);


  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

// orden alfabético Asc y Desc
  const handleOrderAscDesc = (e) => {
    e.preventDefault();
    dispatch(orderVideogamesAscDesc(e.target.value))
    setAux(!aux);
  }
// orden por rating
  const handleOrderRating = (e) => {
    e.preventDefault();
    dispatch(orderVideogamesByRating(e.target.value))
    setAux(!aux);
  }

  return (
    <div className={styles.homePageContainer}>

      <div className={styles.orderContainer}>
        
        <SearchBar />

        {/* filtro por genero */}
        <GenderFilter />
        {/* orden alfabético */}
        <div className={styles.orderAscDesc}>
          <select onChange={(e)=> handleOrderAscDesc(e)}>
            <option value="default" >Select by order</option>
            <option value="asc" >Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
        </div>

        {/* boton de reseteo de filtros */}
        <div className={styles.orderByRating}>
          <select onChange={(e)=> handleOrderRating(e)}>
            <option value="default" >Select by rating</option>
            <option value="best" >Best</option>
            <option value="worst">Worst</option>
          </select>
        </div>

      {/* orden por rating */}
        <ResetFilters />

        <PrimaryButton>
          <NavLink to="/form">Create game</NavLink>
        </PrimaryButton>
        
      </div>

      <div className={styles.paginationContainer}>
        <Pagination 
          gamesPerPage={gamesPerPage} /* juegos por paginas */
          allVideogames={allVideogames.length} /* todos los juegos */
        />
      </div>
      
      <div className={styles.paginationContainerCards}>
        {
          currentGames[0] ? (
            currentGames?.map(game => {
              return (
                <Card
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  image={game.image}
                  genres={game.genres}
                  rating={game.rating}
                />
              )
            })
          ) : (
            <Loading/>
          )
        }
      </div>

      {/* paginado */}
      <div className={styles.paginationContainer}>
        <Pagination 
          gamesPerPage={gamesPerPage} /* juegos por paginas */
          allVideogames={allVideogames.length} /* todos los juegos */
        />
      </div>
    </div>
  )
};

export default HomePage;