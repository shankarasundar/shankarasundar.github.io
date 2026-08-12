import { useEffect } from "react";
import { personal as personalData, stravaActivities as stravaActivitiesData } from "../data/content";
import yosemite from "../assets/images/yosemite.jpg";
import { useEditableCollection, EditableText, ItemControls, AddItemButton } from "edit-kit";

export default function Activities() {
  const personal = useEditableCollection("personal", personalData);
  const stravaActivities = useEditableCollection("stravaActivities", stravaActivitiesData);

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
        <EditableText as="p" className="activities-blurb" value={personal.items.blurb} onChange={(v) => personal.updateField("blurb", v)} />
      </div>

      <div className="activities-grid">
        {stravaActivities.items.map((a) => (
          <div className="activity-card" key={a.id}>
            <div
              className="strava-embed-placeholder"
              data-embed-type="activity"
              data-embed-id={a.id}
              data-style="standard"
              data-from-embed="false"
              data-token={a.token}
            />
            <ItemControls onDelete={() => stravaActivities.removeItem(a.id)} />
          </div>
        ))}
      </div>
      <AddItemButton
        label="Add Strava activity"
        onClick={() => {
          const id = window.prompt("Strava activity ID (from the embed code's data-embed-id):");
          if (!id) return;
          const token = window.prompt("Strava embed token (from the embed code's data-token):");
          if (!token) return;
          stravaActivities.addItem({ id, token });
        }}
      />
    </section>
  );
}
