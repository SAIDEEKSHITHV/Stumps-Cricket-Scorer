// Core cricket scoring logic

export const createInitialState = (teamA, teamB, overs, wickets, battingFirstTeam = null) => ({
    teamA,
    teamB,
    totalOvers: overs,
    totalWickets: wickets,
    innings: 1,
    currentBattingTeam: battingFirstTeam || teamA,
    score: 0,
    wickets: 0,
    balls: 0,
    ballHistory: [],
    firstInningsScore: null,
    target: null,
    matchComplete: false,
    winner: null,
});

export const getBallsInOver = (balls) => balls % 6;
export const getCompletedOvers = (balls) => Math.floor(balls / 6);
export const getOversDisplay = (balls) => {
    const completed = getCompletedOvers(balls);
    const ballsInOver = getBallsInOver(balls);
    return `${completed}.${ballsInOver}`;
};

export const isOverComplete = (balls) => balls > 0 && balls % 6 === 0;
export const isInningsComplete = (state) => {
    const oversComplete = getCompletedOvers(state.balls) >= state.totalOvers;
    const wicketsComplete = state.wickets >= state.totalWickets;
    const targetChased = state.innings === 2 && state.score >= state.target;
    return oversComplete || wicketsComplete || targetChased;
};

export const calculateResult = (state) => {
    if (state.innings === 1) {
        return null; // First innings just ended, no result yet
    }

    // Second innings
    if (state.score >= state.target) {
        const wicketsRemaining = state.totalWickets - state.wickets;
        return {
            winner: state.currentBattingTeam,
            margin: `${wicketsRemaining} wicket${wicketsRemaining !== 1 ? 's' : ''}`,
            isTie: false,
        };
    } else {
        const otherTeam = state.currentBattingTeam === state.teamA ? state.teamB : state.teamA;
        const runMargin = state.target - state.score - 1;

        // Check for tie
        if (runMargin === 0) {
            return {
                winner: null,
                margin: null,
                isTie: true,
            };
        }

        return {
            winner: otherTeam,
            margin: `${runMargin} run${runMargin !== 1 ? 's' : ''}`,
            isTie: false,
        };
    }
};

export const recalculateFromHistory = (initialState, ballHistory) => {
    let state = {
        ...initialState,
        score: 0,
        wickets: 0,
        balls: 0,
        ballHistory: [],
        matchComplete: false,
        winner: null,
    };

    for (const ball of ballHistory) {
        state.score += ball.runs;
        if (ball.wicket) {
            state.wickets += 1;
        }
        if (ball.legalBall) {
            state.balls += 1;
        }
        state.ballHistory.push(ball);

        // Check if innings complete
        if (isInningsComplete(state)) {
            if (state.innings === 1) {
                state.firstInningsScore = state.score;
                state.target = state.score + 1;
                state.innings = 2;
                state.currentBattingTeam = state.currentBattingTeam === state.teamA ? state.teamB : state.teamA;
                state.score = 0;
                state.wickets = 0;
                state.balls = 0;
                // Continue processing balls for 2nd innings
            } else {
                state.matchComplete = true;
                const result = calculateResult(state);
                state.winner = result;
                break; // Only break when match is complete
            }
        }
    }

    return state;
};
