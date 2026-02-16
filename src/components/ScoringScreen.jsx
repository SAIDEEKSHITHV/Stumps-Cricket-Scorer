import { useState, useEffect } from 'react';
import ScoreDisplay from './ScoreDisplay';
import ThisOver from './ThisOver';
import RunButtons from './RunButtons';
import ActionButtons from './ActionButtons';
import OverHistory from './OverHistory';
import { requestWakeLock, releaseWakeLock } from '../utils/wakeLock';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog" onClick={onCancel}>
            <div className="confirmation-content" onClick={(e) => e.stopPropagation()}>
                <h3>{message}</h3>
                <div className="confirmation-buttons">
                    <button className="confirm-btn yes" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="confirm-btn no" onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

const ScoringScreen = ({ state, actions }) => {
    const [showEndInningsConfirm, setShowEndInningsConfirm] = useState(false);

    useEffect(() => {
        // Request wake lock when scoring screen mounts
        requestWakeLock();

        return () => {
            // Release wake lock when component unmounts
            releaseWakeLock();
        };
    }, []);

    const handleEndInnings = () => {
        setShowEndInningsConfirm(true);
    };

    const confirmEndInnings = () => {
        actions.endInnings();
        setShowEndInningsConfirm(false);
    };

    const canUndo = state.ballHistory.length > 0;

    return (
        <div className="scoring-screen">
            <ScoreDisplay state={state} />

            <ThisOver ballHistory={state.ballHistory} currentBalls={state.balls} />

            <OverHistory ballHistory={state.ballHistory} state={state} />

            <div className="main-score">
                <div className="main-score-value">{state.score}</div>
            </div>

            <RunButtons onRunClick={actions.addRuns} />

            <ActionButtons
                onWicket={actions.addWicket}
                onWide={actions.addWide}
                onNoBall={actions.addNoBall}
                onBye={actions.addBye}
            />

            <div className="utility-buttons">
                <button
                    className="utility-btn undo"
                    onClick={actions.undo}
                    disabled={!canUndo}
                    style={{ opacity: canUndo ? 1 : 0.5 }}
                >
                    Undo
                </button>
                <button
                    className="utility-btn end-innings"
                    onClick={handleEndInnings}
                >
                    End Innings
                </button>
            </div>

            {showEndInningsConfirm && (
                <ConfirmationDialog
                    message="Are you sure you want to end this innings?"
                    onConfirm={confirmEndInnings}
                    onCancel={() => setShowEndInningsConfirm(false)}
                />
            )}
        </div>
    );
};

export default ScoringScreen;
