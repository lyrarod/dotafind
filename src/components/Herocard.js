import React from "react";
import loader from "./loader.png";
import "./styles.css";

export default function Herocard({ allHeroes, loadingData }) {
  const [gridHeroes, setGridHeroes] = React.useState([]);
  const [randomHero, setRandomHero] = React.useState([]);
  const [myHero, setMyHero] = React.useState("");
  const [isAnimationEnd, setIsAnimationEnd] = React.useState(true);

  const BASE_URL = "https://steamcdn-a.akamaihd.net";

  const filterHeroes = React.useCallback((arr) => {
    let numHeros = 20;
    const arrayAllHeroes = [];

    for (let i = 0; i < numHeros; i++) {
      const heroStat = arr[Math.floor(Math.random() * arr.length)];

      !arrayAllHeroes.includes(heroStat)
        ? arrayAllHeroes.push(heroStat)
        : numHeros++;
    }

    setGridHeroes(arrayAllHeroes);
    getRandomHero(arrayAllHeroes);

    setMyHero("");
  }, []);

  React.useEffect(() => {
    allHeroes.length > 0 && filterHeroes(allHeroes);
  }, [filterHeroes, allHeroes]);

  const getRandomHero = (arr) => {
    const randomHero = arr[Math.floor(Math.random() * arr.length)];
    const { id, name, img, icon } = randomHero;

    setRandomHero(randomHero);

    // console.log("RANDOM HERO:", name);
  };

  const shuffleGridRandomHeroes = () => {
    const newGridRandomHeroes = [...gridHeroes];
    const shuffledArray = newGridRandomHeroes.sort(() => Math.random() - 0.5);
    setGridHeroes(shuffledArray);
    // console.log(shuffledArray);
  };

  let idInterval, idTimeOut;

  React.useEffect(() => {
    idInterval = setInterval(shuffleGridRandomHeroes, 3000);

    return () => clearInterval(idInterval);
  }, [shuffleGridRandomHeroes]);

  const handleClickMyHero = (hero) => {
    // clearTimeout(idTimeOut);
    if (randomHero?.id === hero?.id) {
      clearInterval(idInterval);
      console.log("MATCH !");
      // console.log("IdInterval", idInterval);
    } else {
      shuffleGridRandomHeroes();
      console.log("NOT MATCH !");
    }

    setMyHero(hero);
    setIsAnimationEnd(false);

    // console.log(hero);
  };

  const handleOnAnimationEnd = () => {
    setIsAnimationEnd(true);
    idTimeOut = setTimeout(() => filterHeroes(allHeroes), 3000);
    // console.log("onAnimationEnd...");
  };

  return loadingData ? (
    <img src={loader} alt="loader" />
  ) : (
    <div className={"mainCard"}>
      <div className="heroesCard">
        <div className={"image_container"}>
          {
            <img
              src={BASE_URL + randomHero.img}
              alt={randomHero.name}
              onAnimationEnd={handleOnAnimationEnd}
              className={
                // !isAnimationEnd && myHero.id !== randomHero.id
                //   ? "animate__animated animate__flipInX"
                !isAnimationEnd && myHero.id === randomHero.id
                  ? "animate__animated animate__tada"
                  : ""
              }
            />
          }
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "2.8rem",
        }}
      >
        <button
          style={{
            width: "100%",
            height: "100%",
            border: "0",
            background:
              myHero?.id === randomHero?.id
                ? "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)"
                : "",
            color:
              myHero && myHero.id === randomHero.id
                ? "#111" //Certo
                : myHero && myHero.id !== randomHero.id
                ? "#111" //Errado
                : "#111", //Não Certo, Não Errado
          }}
        >
          <div
            className={
              !isAnimationEnd && myHero?.id === randomHero?.id
                ? "animate__animated animate__tada"
                : ""
            }
            style={{
              fontSize: "1.4rem",
              fontWeight: "700",
            }}
          >
            {randomHero?.name}
          </div>
        </button>
      </div>

      <div className="btnIconHeroes">
        {gridHeroes.map((hero, i) => {
          // handleImageError Callback Function
          function handleImageError(e) {
            e.target.src = BASE_URL + hero.img;
            // e.target.style.borderRadius = "50%";
          }

          let iconBtn = (
            <img
              src={BASE_URL + hero.icon}
              // src={hero.isVisible ? BASE_URL + hero.icon : bgBtn}
              alt={hero.name}
              // alt={hero.isVisible ? hero.name : "DotaFindHero"}
              title={hero.name}
              // title={hero.isVisible ? hero.name : null}
              onError={handleImageError}
              style={{
                width: "32px",
                height: "32px",
                overflow: "hidden",
              }}
            />
          );

          return (
            <button
              key={hero.id}
              onClick={() => handleClickMyHero(hero)}
              disabled={myHero?.id === randomHero?.id}
            >
              {iconBtn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
