import './Loader.component.css'

const Loader = () => {
  return (
    <div className="loader-container">

      {/* NAVBAR */}
      <div className="loader-navbar">
        <div className="loader-logo"></div>
        <div className="loader-menu">
          <div className="loader-item"></div>
          <div className="loader-item"></div>
          <div className="loader-item"></div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="loader-hero"></div>

      {/* CARDS GRID */}
      <div className="loader-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="loader-card"></div>
        ))}
      </div>

    </div>
  );
};

export default Loader;