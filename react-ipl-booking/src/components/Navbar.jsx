function Navbar({ bookingCount }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h2>IPL TICKETS</h2>
        </div>
        <nav>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#matches">Matches</a></li>
            <li><a href="#history">Booking History</a></li>
          </ul>
        </nav>
        <div className="booking-badge">
          Bookings: <strong>{bookingCount}</strong>
        </div>
      </div>
    </header>
  );
}

export default Navbar;