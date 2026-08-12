export default function Hero({ backgroundImage, sectionCount }) {
  return (
    <section
      className={backgroundImage ? "health-hero has-image" : "health-hero"}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className="health-hero-overlay" />
      <div className="health-hero-content">
        <p className="health-hero-kicker">Off the clock</p>
        <h1>Health & Wellbeing</h1>
        <p className="health-hero-lede">
          {sectionCount > 0
            ? `${sectionCount} area${sectionCount === 1 ? "" : "s"} I try to keep in balance.`
            : "Notes on staying balanced, on and off the field."}
        </p>
      </div>
    </section>
  );
}
