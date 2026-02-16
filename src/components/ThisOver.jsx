import { getBallsInOver } from '../utils/matchLogic';

const ThisOver = ({ ballHistory, currentBalls }) => {
    const ballsInCurrentOver = getBallsInOver(currentBalls);
    const startIndex = ballHistory.length - ballsInCurrentOver;
    const currentOverBalls = ballHistory.slice(Math.max(0, startIndex));

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

    return (
        <div className="this-over">
            <div className="this-over-label">This Over</div>
            <div className="over-balls">
                {currentOverBalls.length === 0 ? (
                    <div className="ball-item">-</div>
                ) : (
                    currentOverBalls.map((ball, index) => (
                        <div key={index} className={`ball-item ${getBallClass(ball)}`}>
                            {getBallDisplay(ball)}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ThisOver;
