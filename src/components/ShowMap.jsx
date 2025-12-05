export default function ShowMap({ setShowMap }) {
  return (
    <div className="modal-overlay" onClick={() => setShowMap(false)}>
      <div className="map-modal">
        <button className="close-btn" onClick={() => setShowMap(false)}>
          ×
        </button>

        <h3>Seleccionar ubicación</h3>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.789028717316!2d-75.57659882419352!3d6.244203793746268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428f1d4b2b78f%3A0x4a80c3e9e6b06852!2sMedell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1733433300000!5m2!1ses!2sco"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
