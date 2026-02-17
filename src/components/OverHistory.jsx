import { useState } from 'react';
import { getCompletedOvers } from '../utils/matchLogic';

const OverHistory = ({ ballHistory, state }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Group balls by over with innings tracking
    const groupBallsByOver = () => {
        const overs = [];
        let currentOver = [];
        let legalBallCount = 0;
        let overNumber = 1;
        let currentInnings = 1;

        ballHistory.forEach((ball, index) => {
            // Track innings changes
            if (ball.innings && ball.innings !== currentInnings) {
                // Close current over if it exists before switching innings
                if (currentOver.length > 0) {
                    overs.push({
                        balls: currentOver,
                        innings: currentInnings,
                        overNumber: overNumber
                    });
                    currentOver = [];
                }

                currentInnings = ball.innings;
                overNumber = 1; // Reset over number for new innings
                legalBallCount = 0;
            }

            currentOver.push(ball);

            if (ball.legalBall) {
                legalBallCount++;

                if (legalBallCount === 6) {
                    overs.push({
                        balls: [...currentOver],
                        innings: currentInnings,
                        overNumber: overNumber
                    });
                    currentOver = [];
                    legalBallCount = 0;
                    overNumber++;
                }
            }
        });

        // Add incomplete over if exists
        if (currentOver.length > 0) {
            overs.push({
                balls: currentOver,
                innings: currentInnings,
                overNumber: overNumber
            });
        }

        return overs;
    };

    const getBallDisplay = (ball) => {
        if (ball.wicket) return 'W';
        if (ball.type === 'wide') return `WD${ball.runs > 1 ? '+' + (ball.runs - 1) : ''}`;
        if (ball.type === 'noball') return `NB${ball.runs > 1 ? '+' + (ball.runs - 1) : ''}`;
        if (ball.type === 'bye') return `${ball.runs}b`;
        return ball.runs.toString();
    };

    const getBallClass = (ball) => {
        if (ball.wicket) return 'wicket';
        if (ball.runs === 4) return 'boundary';
        if (ball.runs === 6) return 'six';
        return '';
    };

    const getOverRuns = (balls) => {
        return balls.reduce((total, ball) => total + ball.runs, 0);
    };

    const overs = groupBallsByOver();
    const completedOvers = overs.filter((over) => {
        const legalBalls = over.balls.filter(b => b.legalBall).length;
        return legalBalls === 6;
    });

    if (ballHistory.length === 0) {
        return null;
    }

    // Group overs by innings for display
    let currentDisplayInnings = 0;

    return (
        <div className="over-history">
            <button
                className="over-history-toggle"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span>📊 Over History ({completedOvers.length} overs)</span>
                <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
            </button>

            {isExpanded && (
                <div className="over-history-content">
                    {overs.map((over, index) => {
                        const legalBalls = over.balls.filter(b => b.legalBall).length;
                        const isComplete = legalBalls === 6;
                        const overRuns = getOverRuns(over.balls);

                        // Show innings header when innings changes
                        const showInningsHeader = over.innings !== currentDisplayInnings;
                        if (showInningsHeader) {
                            currentDisplayInnings = over.innings;
                        }

                        return (
                            <div key={index}>
                                {showInningsHeader && (
                                    <div className="innings-header">
                                        {over.innings === 1 ? '1st Innings' : '2nd Innings'}
                                    </div>
                                )}
                                <div className="over-item">
                                    <div className="over-header">
                                        <span className="over-number">
                                            Over {over.overNumber} {!isComplete && '(Incomplete)'}
                                        </span>
                                        <span className="over-runs">{overRuns} runs</span>
                                    </div>
                                    <div className="over-balls-list">
                                        {over.balls.map((ball, ballIndex) => (
                                            <div
                                                key={ballIndex}
                                                className={`ball-item ${getBallClass(ball)}`}
                                            >
                                                {getBallDisplay(ball)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default OverHistory;

