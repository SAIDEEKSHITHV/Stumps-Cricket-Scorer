import { useState } from 'react';

const TossScreen = ({ teamA, teamB, onTossComplete }) => {
    const [phase, setPhase] = useState('selection'); // selection, flipping, result, decision
    const [userChoice, setUserChoice] = useState(null);
    const [tossResult, setTossResult] = useState(null);
    const [tossWinner, setTossWinner] = useState(null);
    const [isFlipping, setIsFlipping] = useState(false);

    // Strategic toss logic - gives user's choice 55% win probability
    const flipCoin = (choice) => {
        setUserChoice(choice);
        setIsFlipping(true);
        setPhase('flipping');

        // Use timestamp for randomness with strategic bias
        const seed = Date.now();
        const random = (seed % 100) / 100;

        // 55% chance user wins, 45% chance user loses
        const userWins = random < 0.55;
        const result = userWins ? choice : (choice === 'heads' ? 'tails' : 'heads');

        // Determine winner
        const winner = userWins ? teamA : teamB;

        // Simulate coin flip animation duration
        setTimeout(() => {
            setTossResult(result);
            setTossWinner(winner);
            setIsFlipping(false);
            setPhase('result');
        }, 2000);
    };

    const handleDecision = (decision) => {
        // Determine which team bats first based on decision
        let battingFirstTeam;
        if (decision === 'bat') {
            battingFirstTeam = tossWinner;
        } else {
            battingFirstTeam = tossWinner === teamA ? teamB : teamA;
        }

        onTossComplete(tossWinner, decision, battingFirstTeam);
    };

    return (
        <div className="toss-screen">
            <div className="container">
                <h1>🪙 Toss Time</h1>
                <p className="toss-subtitle">{teamA} vs {teamB}</p>

                {phase === 'selection' && (
                    <div className="toss-selection">
                        <p className="toss-instruction">Choose your call:</p>
                        <div className="toss-choice-buttons">
                            <button
                                className="toss-choice-btn heads"
                                onClick={() => flipCoin('heads')}
                            >
                                <span className="coin-emoji">🟡</span>
                                <span>HEADS</span>
                            </button>
                            <button
                                className="toss-choice-btn tails"
                                onClick={() => flipCoin('tails')}
                            >
                                <span className="coin-emoji">⚪</span>
                                <span>TAILS</span>
                            </button>
                        </div>
                        <p className="toss-hint">💡 Choose wisely - your intuition matters!</p>
                    </div>
                )}

                {phase === 'flipping' && (
                    <div className="toss-flipping">
                        <p className="toss-call">You called: <strong>{userChoice.toUpperCase()}</strong></p>
                        <div className="coin-container">
                            <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
                                <div className="coin-face heads-face">H</div>
                                <div className="coin-face tails-face">T</div>
                            </div>
                        </div>
                        <p className="toss-status">Flipping...</p>
                    </div>
                )}

                {phase === 'result' && (
                    <div className="toss-result">
                        <div className="result-coin">
                            <div className={`coin result-${tossResult}`}>
                                <div className="coin-face">{tossResult === 'heads' ? 'H' : 'T'}</div>
                            </div>
                        </div>
                        <p className="result-text">It's <strong>{tossResult.toUpperCase()}!</strong></p>
                        <div className="winner-announcement">
                            <div className="trophy">🏆</div>
                            <h2>{tossWinner} won the toss!</h2>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => setPhase('decision')}
                        >
                            Continue
                        </button>
                    </div>
                )}

                {phase === 'decision' && (
                    <div className="toss-decision">
                        <div className="decision-header">
                            <div className="trophy-small">🏆</div>
                            <h2>{tossWinner}</h2>
                            <p>Choose to bat or bowl first</p>
                        </div>
                        <div className="decision-buttons">
                            <button
                                className="decision-btn bat"
                                onClick={() => handleDecision('bat')}
                            >
                                <span className="decision-icon">🏏</span>
                                <span className="decision-label">BAT FIRST</span>
                            </button>
                            <button
                                className="decision-btn bowl"
                                onClick={() => handleDecision('bowl')}
                            >
                                <span className="decision-icon">⚾</span>
                                <span className="decision-label">BOWL FIRST</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TossScreen;
