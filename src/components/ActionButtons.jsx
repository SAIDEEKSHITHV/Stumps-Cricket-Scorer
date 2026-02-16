import { useState } from 'react';

const ExtraRunsModal = ({ type, onConfirm, onCancel }) => {
    const extraOptions = [0, 1, 2, 3, 4, 5, 6, 7];

    const getTitle = () => {
        if (type === 'wide') return 'Wide + Extra Runs';
        if (type === 'noball') return 'No Ball + Extra Runs';
        if (type === 'bye') return 'Bye Runs';
        return 'Extra Runs';
    };

    return (
        <div className="extra-runs-modal" onClick={onCancel}>
            <div className="extra-runs-content" onClick={(e) => e.stopPropagation()}>
                <h3>{getTitle()}</h3>
                <div className="extra-runs-grid">
                    {extraOptions.map((extra) => (
                        <button
                            key={extra}
                            className="extra-run-btn"
                            onClick={() => onConfirm(extra)}
                        >
                            {type === 'bye' ? extra : `+${extra}`}
                        </button>
                    ))}
                </div>
                <button className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

const ActionButtons = ({ onWicket, onWide, onNoBall, onBye }) => {
    const [showExtraModal, setShowExtraModal] = useState(null);

    const handleWideClick = () => {
        setShowExtraModal('wide');
    };

    const handleNoBallClick = () => {
        setShowExtraModal('noball');
    };

    const handleByeClick = () => {
        setShowExtraModal('bye');
    };

    const handleExtraConfirm = (extraRuns) => {
        if (showExtraModal === 'wide') {
            onWide(extraRuns);
        } else if (showExtraModal === 'noball') {
            onNoBall(extraRuns);
        } else if (showExtraModal === 'bye') {
            onBye(extraRuns);
        }
        setShowExtraModal(null);
    };

    return (
        <>
            <div className="action-buttons">
                <button className="action-btn wicket" onClick={onWicket}>
                    Wicket
                </button>
                <button className="action-btn wide" onClick={handleWideClick}>
                    Wide
                </button>
                <button className="action-btn noball" onClick={handleNoBallClick}>
                    No Ball
                </button>
                <button className="action-btn bye" onClick={handleByeClick}>
                    Bye
                </button>
            </div>

            {showExtraModal && (
                <ExtraRunsModal
                    type={showExtraModal}
                    onConfirm={handleExtraConfirm}
                    onCancel={() => setShowExtraModal(null)}
                />
            )}
        </>
    );
};

export default ActionButtons;
