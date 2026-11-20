function MatchCard({ match, onBookTicket }) {
  const isSoldOut = match.seatsLeft === 0;

  return (
    <article className="match-card">
      <h3>{match.teams}</h3>
      <p className="match-date">{match.date}</p>
      <p className="match-venue">{match.venue}</p>
      <p className="match-meta">
        ₹{match.price} | {match.seatsLeft} seats left
      </p>
      <button
        type="button"
        className={isSoldOut ? "btn-sold-out" : "btn-book"}
        disabled={isSoldOut}
        onClick={() => onBookTicket(match.id)}
      >
        {isSoldOut ? "Sold Out" : "Book Tickets"}
      </button>
    </article>
  );
}

export default MatchCard;