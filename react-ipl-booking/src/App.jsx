import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

const INITIAL_MATCHES = [
  {
    id: 1,
    teams: "Royal Challengers Bengaluru vs Chennai Super Kings",
    date: "20 April 2027",
    venue: "M. Chinnaswamy Stadium",
    price: 1500,
    seatsLeft: 100,
  },
  {
    id: 2,
    teams: "Mumbai Indians vs Kolkata Knight Riders",
    date: "22 April 2027",
    venue: "Wankhede Stadium",
    price: 1200,
    seatsLeft: 80,
  },
  {
    id: 3,
    teams: "Sunrisers Hyderabad vs Rajasthan Royals",
    date: "25 April 2027",
    venue: "Rajiv Gandhi Stadium",
    price: 1000,
    seatsLeft: 0,
  },
];

function App() {
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [bookingCount, setBookingCount] = useState(0);

  const handleBookTicket = (matchId) => {
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === matchId && match.seatsLeft > 0
          ? { ...match, seatsLeft: match.seatsLeft - 1 }
          : match
      )
    );
    setBookingCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="app-wrapper">
      <Navbar bookingCount={bookingCount} />
      <Hero />

      <main id="matches" className="matches-section">
        <h2>Upcoming IPL Matches</h2>
        <div className="matches-grid">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onBookTicket={handleBookTicket}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;