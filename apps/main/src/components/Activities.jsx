import { useEffect } from "react";
import { personal, stravaActivities } from "../data/content";
import yosemite from "../assets/images/yosemite.jpg";

export default function Activities() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://strava-embeds.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="activities" className="section">
      <p className="section-kicker">Off the clock</p>
      <h2 className="section-title">Personal activities</h2>

      <div className="activities-intro">
        <img className="activities-photo" src={yosemite} alt="Sankara on a trail run" />
        <p className="activities-blurb">{personal.blurb}</p>
      </div>

      <div className="activities-grid">
        {stravaActivities.map((a) => (
          <div className="activity-card" key={a.id}>
            <div
              className="strava-embed-placeholder"
              data-embed-type="activity"
              data-embed-id={a.id}
              data-style="standard"
              data-from-embed="false"
              data-token={a.token}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
