export default function Hero({ backgroundImage, tripCount }) {
  return (
    <section
      className={backgroundImage ? "travel-hero has-image" : "travel-hero"}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="travel-hero-overlay" />
      <div className="travel-hero-content">
        <p className="travel-hero-kicker">Travel log</p>
        <h1>Stories from the road</h1>
        <p className="travel-hero-lede">
          {tripCount > 0
            ? `${tripCount} trip${tripCount === 1 ? "" : "s"} logged so far — photos, notes and the odd bit of chaos.`
            : "Photos, notes and the odd bit of chaos — new trips coming soon."}
        </p>
      </div>
    </section>
  );
}
