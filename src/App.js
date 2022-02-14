import React from "react";
import Herocard from "./components/Herocard";
import "./styles.css";

function App() {
  const [allHeroes, setAllHeroes] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(false);
  const [windowLoaded, setWindowLoaded] = React.useState(false);

  window.addEventListener("load", () => setWindowLoaded(true));

  React.useEffect(() => {
    (async () => {
      setLoadingData(true);
      const response = await fetch("https://api.opendota.com/api/heroStats");
      const dataJson = await response.json();
      // console.log(dataJson);

      const data = await dataJson.map(({ id, localized_name, img, icon }) => {
        return {
          id,
          name: localized_name,
          img,
          icon,
        };
      });

      if (data.length > 0) {
        setTimeout(() => {
          setAllHeroes(data);
          setLoadingData(false);
          // console.log(data);
          // console.log(data[Math.floor(Math.random() * data.length)]);
        }, 1000);
      }
    })();
  }, []);

  return (
    <div className="App">
      {windowLoaded && (
        <Herocard
          allHeroes={allHeroes}
          loadingData={loadingData}
          windowLoaded={windowLoaded}
        />
      )}
    </div>
  );
}

export default App;
