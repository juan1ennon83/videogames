import { NavLink } from "react-router-dom";
import PrimaryButton from "../../components/buttons/primaryButton/PrimaryButton";
import styles from "./LandingPage.module.css";
//import backgroundLanding from "../LandingPage/GowLandingPage0.jpg"

const LandingPage = () => {
  return (
    <div className={styles.landingPageContainer}>

      <div className={styles.landingPageText}>
        <p>Welcome</p>
        <p>to my</p>
        <p>Videogames App</p>
      </div>

      <div className={styles.landingPageButton}>
        <PrimaryButton>
          <NavLink to="/home">Go to Home</NavLink>
        </PrimaryButton>
      </div>

      {/* <div className={styles.backgroundImage}>
        <img src={backgroundLanding} alt="" />
      </div> */}

    </div>
  );
};

export default LandingPage;
