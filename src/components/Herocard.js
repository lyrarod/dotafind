import React from "react";
import bgBtn from "./bg-btn.png";
import loader from "./loader.png";
import "./styles.css";

export default function Herocard({ allHeroes, loadingData }) {
  const [gridHeroes, setGridHeroes] = React.useState([]);
  const [randomHero, setRandomHero] = React.useState([]);
  const [myHero, setMyHero] = React.useState("");
  const [isAnimationEnd, setIsAnimationEnd] = React.useState(true);

  const BASE_URL = "https://steamcdn-a.akamaihd.net";

  const filterHeroes = React.useCallback((arr) => {
    let count = 20;
    const arrayAllHeroes = [];

    for (let i = 0; i < count; i++) {
      const heroStat = arr[Math.floor(Math.random() * arr.length)];

      !arrayAllHeroes.includes(heroStat)
        ? arrayAllHeroes.push(heroStat)
        : count++;
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

    console.log("RANDOM HERO:", { id, name });
  };

  const handleClickMyHero = (hero) => {
    const newGridRandomHeroes = [...gridHeroes];
    setGridHeroes(newGridRandomHeroes);

    setMyHero(hero);
    setIsAnimationEnd(false);

    console.log(hero);
  };

  return loadingData ? (
    <img src={loader} alt="loader" />
  ) : (
    <div className={"mainCard"}>
      <div className="heroesCard">
        <div className={"image_container"}>
          {!myHero && (
            <img
              src={BASE_URL + randomHero.img}
              alt={randomHero.name}
              onAnimationEnd={() => setIsAnimationEnd(true)}
              className={
                !isAnimationEnd && myHero.id !== randomHero.id
                  ? "animate__animated animate__flipInX"
                  : !isAnimationEnd && myHero.id === randomHero.id
                  ? "animate__animated animate__tada"
                  : null
              }
            />
          )}

          {myHero && (
            <img
              src={BASE_URL + myHero.img}
              alt={myHero.name}
              onAnimationEnd={() => setIsAnimationEnd(true)}
              className={
                !isAnimationEnd && myHero.id !== randomHero.id
                  ? "animate__animated animate__flipInX"
                  : !isAnimationEnd && myHero.id === randomHero.id
                  ? "animate__animated animate__tada"
                  : null
              }
            />
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "2.8rem",
        }}
      >
        <button
          onClick={() => filterHeroes(allHeroes)}
          disabled={
            isAnimationEnd && myHero.id === randomHero.id ? false : true
          }
          style={{
            width: "100%",
            height: "100%",
            border: "0",
            background:
              myHero && myHero.id === randomHero.id
                ? "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)"
                : "#ddd",
            color:
              myHero && myHero.id === randomHero.id
                ? "#111" //Certo
                : myHero && myHero.id !== randomHero.id
                ? "#555" //Errado
                : "#333", //Não Certo, Não Errado

            cursor: myHero.id === randomHero.id ? "pointer" : "default",
          }}
        >
          <div
            className={
              !isAnimationEnd && myHero.id === randomHero.id
                ? "animate__animated animate__tada"
                : null
            }
            style={{
              fontSize: "1.4rem",
              fontWeight: "700",
            }}
          >
            {myHero?.name || randomHero?.name}
          </div>
        </button>
      </div>

      <div className="btnIconHeroes">
        {gridHeroes.map((hero, i) => {
          // handleImageError Callback Function
          function handleImageError(e) {
            e.target.src = BASE_URL + hero.img;
            e.target.style.borderRadius = "50%";
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
                width: "30px",
                height: "30px",
                overflow: "hidden",
              }}
            />
          );

          return (
            <button
              key={hero.id}
              onClick={() => isAnimationEnd && handleClickMyHero(hero)}
            >
              {iconBtn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
