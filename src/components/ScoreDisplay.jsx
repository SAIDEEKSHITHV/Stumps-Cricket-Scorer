import { getOversDisplay } from '../utils/matchLogic';

const ScoreDisplay = ({ state }) => {
    const runsNeeded = state.innings === 2 && state.target
        ? state.target - state.score
        : null;
    const ballsRemaining = state.innings === 2
        ? (state.totalOvers * 6) - state.balls
        : null;

    return (
        <div className="score-bar">
            <div className="score-bar-top">
                <div className="team-score">
                    {state.currentBattingTeam}: {state.score}/{state.wickets}
                </div>
                <div className="overs">
                    Overs: {getOversDisplay(state.balls)}
                </div>
            </div>

            {runsNeeded !== null && runsNeeded > 0 && (
                <div className="chase-info">
                    Need {runsNeeded} runs in {ballsRemaining} balls
                </div>
            )}
        </div>
    );
};

export default ScoreDisplay;
