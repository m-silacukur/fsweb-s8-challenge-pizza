import { useHistory } from "react-router-dom";
import logo from "../../images/iteration-1-images/logo.svg";
import banner from "../../images/iteration-1-images/home-banner.png";
import "./Home.css";

export default function Home() {
  const history = useHistory();

  return (
    <main data-cy="home-page">
      <section className="hero" data-cy="hero" style={{ backgroundImage: `url(${banner})` }}>
        <header className="page-header">
          <div className="site-header">
            <img src={logo} alt="Teknolojik Yemekler logosu" />
          </div>
        </header>

        <div className="hero-content">
          <h1>
            KOD ACIKTIRIR <br /> PİZZA, DOYURUR
          </h1>

          <button
            className="hero-btn"
            data-cy="go-order"
            onClick={() => history.push("/siparis")}
          >
            ACIKTIM
          </button>
        </div>
      </section>
    </main>
  );
}