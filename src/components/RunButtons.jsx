const RunButtons = ({ onRunClick }) => {
    const topRowRuns = [0, 1, 2, 3];
    const bottomRowRuns = [4, 5, 6];

    return (
        <div className="run-buttons">
            <div className="run-grid">
                {topRowRuns.map((run) => (
                    <button
                        key={run}
                        className="run-btn"
                        onClick={() => onRunClick(run)}
                    >
                        {run}
                    </button>
                ))}
            </div>
            <div className="run-grid-bottom">
                {bottomRowRuns.map((run) => (
                    <button
                        key={run}
                        className={`run-btn ${run === 4 ? 'four' : ''} ${run === 6 ? 'six' : ''}`}
                        onClick={() => onRunClick(run)}
                    >
                        {run}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RunButtons;
