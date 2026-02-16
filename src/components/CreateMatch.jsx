import { useState } from 'react';
import { loadMatch } from '../utils/storage';

const CreateMatch = ({ onCreateMatch, onResumeMatch, onProceedToToss }) => {
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [overs, setOvers] = useState(6);
    const [wickets, setWickets] = useState(6);

    const savedMatch = loadMatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (teamA.trim() && teamB.trim()) {
            // Proceed to toss screen with match info
            onProceedToToss(teamA.trim(), teamB.trim(), parseInt(overs), parseInt(wickets));
        }
    };

    return (
        <div className="create-match">
            <div className="container">
                <h1>🏏 Stumps</h1>
                <p className="app-subtitle">Cricket Scorer</p>
                <p>Fast scoring for turf and street matches</p>

                {savedMatch && (
                    <button className="btn btn-secondary" onClick={onResumeMatch}>
                        Resume Match
                    </button>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Team A Name</label>
                        <input
                            type="text"
                            value={teamA}
                            onChange={(e) => setTeamA(e.target.value)}
                            placeholder="Enter team name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Team B Name</label>
                        <input
                            type="text"
                            value={teamB}
                            onChange={(e) => setTeamB(e.target.value)}
                            placeholder="Enter team name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Overs</label>
                        <input
                            type="number"
                            value={overs}
                            onChange={(e) => setOvers(e.target.value)}
                            min="1"
                            max="50"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Wickets</label>
                        <input
                            type="number"
                            value={wickets}
                            onChange={(e) => setWickets(e.target.value)}
                            min="1"
                            max="11"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Proceed to Toss 🪙
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateMatch;

