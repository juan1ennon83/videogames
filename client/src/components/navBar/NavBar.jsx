import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import SecondaryButton from '../buttons/secondaryButton/SecondaryButton';
const welcomeImageUrl = 'https://i.gifer.com/8SMy.gif';
const NavBar = () => {
  return (
    <div className={styles.NavBarContainer}>
      <div className={styles.WelcomeContainer}>
        <h2>Welcome to</h2>
        <img src={welcomeImageUrl} alt="Welcome" className={styles.WelcomeImage} />
        <h3>juan1ennon's Videogame app</h3>
      </div>
      <SecondaryButton>
        <NavLink to="/home">Home</NavLink>
      </SecondaryButton>
    </div>
  );
};

export default NavBar;