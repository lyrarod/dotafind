import React from "react";
import bgBtn from "./bg-btn.png";
import loader from "./loader.png";
import "./styles.css";

export default function Herocard({ allHeroes, loadingData }) {
  const [gridHeroes, setGridHeroes] = React.useState([]);
  const [randomHero, setRandomHero] = React.useState([]);
  const [myHero, setMyHero] = React.useState("");
  const [isAnimationEnd, setIsAnimationEnd] = React.useState(true);

  const url = "https://steamcdn-a.akamaihd.net";

  const filterHeroes = React.useCallback((arr) => {
    let count = 20;
    const arrayAllHeroes = [];

    for (let i = 0; i < count; i++) {
      const heroStat = arr[Math.floor(Math.random() * arr.length)];
      heroStat.visible = false;

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
    const { id, name, img, icon } = arr[Math.floor(Math.random() * arr.length)];

    setRandomHero({
      id,
      name,
      img,
      icon,
    });

    // console.log("random hero:", { id, name });
  };

  const handleClickMyHero = (hero, index) => {
    const newGridRandomHeroes = [...gridHeroes];
    newGridRandomHeroes[index].visible = true;
    setGridHeroes(newGridRandomHeroes);

    setMyHero(hero);
    setIsAnimationEnd(false);

    // console.log(hero);
  };

  return loadingData ? (
    <img src={loader} alt="loader" />
  ) : (
    <div className={"mainCard"}>
      <div className="heroesCard">
        <div className={"image_container"}>
          {myHero ? (
            <img
              src={url + myHero.img}
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
          ) : (
            <img
              src={bgBtn}
              alt="Dota Find Hero"
              style={{ maxHeight: "80%", width: "auto" }}
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
            {!myHero.name ? "Dota Find Hero" : myHero.name}
          </div>
        </button>
      </div>

      <div className="btnIconHeroes">
        {gridHeroes.map((hero, i) => {
          const onImageError = (e) => {
            e.target.src = url + hero.img;
            e.target.style.borderRadius = "50%";
          };

          let iconBtn = (
            <>
              <img
                src={hero.visible ? url + hero.icon : bgBtn}
                alt={hero.visible ? hero.name : "DotaFindHero"}
                title={hero.visible ? hero.name : null}
                onError={onImageError}
                style={{
                  width: "32px",
                  height: "32px",
                  overflow: "hidden",
                }}
              />
            </>
          );

          return (
            <button
              key={hero.id}
              onClick={() => isAnimationEnd && handleClickMyHero(hero, i)}
              style={{
                background:
                  myHero === hero && hero.id !== randomHero.id
                    ? "white" // Selected hero
                    : hero.id === randomHero.id && hero.visible
                    ? "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)" //Correto
                    : hero.id !== randomHero.id && hero.visible
                    ? "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)" // Errado
                    : "transparent",
              }}
            >
              {iconBtn}
            </button>
          );
        })}
      </div>
    </div>
  );
}
