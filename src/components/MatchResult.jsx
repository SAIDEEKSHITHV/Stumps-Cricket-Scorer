const MatchResult = ({ state, onNewMatch, onSuperOver }) => {
    const { winner, teamA, teamB, firstInningsScore, score } = state;
    const isTie = winner && winner.isTie;

    return (
        <div className="match-result">
            <div className="container">
                <h1>Match Complete!</h1>

                <div className="result-winner">
                    {isTie ? (
                        'Match Tied!'
                    ) : (
                        `${winner.winner} won by ${winner.margin}`
                    )}
                </div>

                <div className="result-scores">
                    <div className="result-score-item">
                        <div className="result-team">{teamA}</div>
                        <div className="result-score">
                            {state.innings === 2 && state.currentBattingTeam === teamB
                                ? firstInningsScore
                                : score}/{state.wickets}
                        </div>
                    </div>

                    <div className="result-score-item">
                        <div className="result-team">{teamB}</div>
                        <div className="result-score">
                            {state.innings === 2 && state.currentBattingTeam === teamA
                                ? firstInningsScore
                                : score}/{state.wickets}
                        </div>
                    </div>
                </div>

                {isTie && (
                    <button className="btn btn-primary" onClick={onSuperOver} style={{ marginBottom: '16px' }}>
                        Play Super Over
                    </button>
                )}

                <button className="btn btn-primary" onClick={onNewMatch}>
                    New Match
                </button>
            </div>
        </div>
    );
};

export default MatchResult;
