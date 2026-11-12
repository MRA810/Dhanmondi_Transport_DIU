import { useI, useNow, A } from "../utils";

export default function Hero() {
  const { t, lang } = useI(),
    now = useNow(),
    loc = lang === "bn" ? "bn-BD" : "en-GB";
  const time = new Intl.DateTimeFormat(loc, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Dhaka",
  }).format(now);
  const date = new Intl.DateTimeFormat(loc, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(now);

  return (
    <section className="hero" id="home">
      <div className="frame">
        <div className="sw">
          <div className="shot">
            <img
              className="bg"
              src={A("images/cover.jpg")}
              alt="Daffodil International University buses parked in a row"
            />
            <div className="scrim" />
            <div className="hc">
              <h3>{t("heroSub")}</h3>
              <h1>{t("heroH")}</h1>
              <p>{t("heroP")}</p>
              <div
                className="cta"
                style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
              >
                <a className="btn g" href="#schedule">
                  {t("ctaSch")}
                </a>
                <a className="btn" href="#notices">
                  {t("ctaNot")}
                </a>
                <a className="btn o" href="#routes">
                  {t("ctaRt")}
                </a>
              </div>
            </div>
          </div>
          <div
            className="notch tr"
            role="group"
            aria-label="Dhaka date and time"
          >
            <div className="clock">{time}</div>
            <div className="clock-d">{date}</div>
          </div>
          <div className="notch bl">
            <img
              src={A("logos/diu.png")}
              alt="Daffodil International University logo"
            />
            <span>{t("affilShort")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
