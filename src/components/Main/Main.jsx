import weatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <weatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F/ You may want to wear:
        </p>
        {/*TODO add cards*/}
      </section>
    </main>
  );
}

export default Main;
