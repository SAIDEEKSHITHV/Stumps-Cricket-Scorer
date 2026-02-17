import { useReducer, useEffect } from 'react';
import { saveMatch, loadMatch, clearMatch } from '../utils/storage';
import {
    createInitialState,
    isInningsComplete,
    calculateResult,
    recalculateFromHistory
} from '../utils/matchLogic';

const ACTIONS = {
    CREATE_MATCH: 'CREATE_MATCH',
    LOAD_MATCH: 'LOAD_MATCH',
    ADD_RUNS: 'ADD_RUNS',
    ADD_WICKET: 'ADD_WICKET',
    ADD_WIDE: 'ADD_WIDE',
    ADD_NO_BALL: 'ADD_NO_BALL',
    ADD_BYE: 'ADD_BYE',
    UNDO: 'UNDO',
    END_INNINGS: 'END_INNINGS',
    NEW_MATCH: 'NEW_MATCH',
};

const matchReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CREATE_MATCH: {
            const { teamA, teamB, overs, wickets, battingFirstTeam } = action.payload;
            return createInitialState(teamA, teamB, overs, wickets, battingFirstTeam);
        }

        case ACTIONS.LOAD_MATCH: {
            return action.payload;
        }

        case ACTIONS.ADD_RUNS: {
            const runs = action.payload;
            const newBall = { type: 'run', runs, legalBall: true, wicket: false, innings: state.innings };
            const newState = {
                ...state,
                score: state.score + runs,
                balls: state.balls + 1,
                ballHistory: [...state.ballHistory, newBall],
            };

            if (isInningsComplete(newState)) {
                return handleInningsComplete(newState);
            }
            return newState;
        }

        case ACTIONS.ADD_WICKET: {
            const newBall = { type: 'wicket', runs: 0, legalBall: true, wicket: true, innings: state.innings };
            const newState = {
                ...state,
                wickets: state.wickets + 1,
                balls: state.balls + 1,
                ballHistory: [...state.ballHistory, newBall],
            };

            if (isInningsComplete(newState)) {
                return handleInningsComplete(newState);
            }
            return newState;
        }

        case ACTIONS.ADD_WIDE: {
            const extraRuns = action.payload || 0;
            const totalRuns = 1 + extraRuns;
            const newBall = { type: 'wide', runs: totalRuns, legalBall: false, wicket: false, innings: state.innings };
            const newState = {
                ...state,
                score: state.score + totalRuns,
                ballHistory: [...state.ballHistory, newBall],
            };

            if (isInningsComplete(newState)) {
                return handleInningsComplete(newState);
            }
            return newState;
        }

        case ACTIONS.ADD_NO_BALL: {
            const extraRuns = action.payload || 0;
            const totalRuns = 1 + extraRuns;
            const newBall = { type: 'noball', runs: totalRuns, legalBall: false, wicket: false, innings: state.innings };
            const newState = {
                ...state,
                score: state.score + totalRuns,
                ballHistory: [...state.ballHistory, newBall],
            };

            if (isInningsComplete(newState)) {
                return handleInningsComplete(newState);
            }
            return newState;
        }

        case ACTIONS.ADD_BYE: {
            const runs = action.payload;
            const newBall = { type: 'bye', runs, legalBall: true, wicket: false, innings: state.innings };
            const newState = {
                ...state,
                score: state.score + runs,
                balls: state.balls + 1,
                ballHistory: [...state.ballHistory, newBall],
            };

            if (isInningsComplete(newState)) {
                return handleInningsComplete(newState);
            }
            return newState;
        }

        case ACTIONS.UNDO: {
            if (state.ballHistory.length === 0) return state;

            const newHistory = state.ballHistory.slice(0, -1);
            const baseState = {
                teamA: state.teamA,
                teamB: state.teamB,
                totalOvers: state.totalOvers,
                totalWickets: state.totalWickets,
                innings: 1,
                currentBattingTeam: state.teamA,
                firstInningsScore: null,
                target: null,
            };

            return recalculateFromHistory(baseState, newHistory);
        }

        case ACTIONS.END_INNINGS: {
            return handleInningsComplete(state);
        }

        case ACTIONS.NEW_MATCH: {
            return null;
        }

        default:
            return state;
    }
};

const handleInningsComplete = (state) => {
    if (state.innings === 1) {
        return {
            ...state,
            firstInningsScore: state.score,
            target: state.score + 1,
            innings: 2,
            currentBattingTeam: state.currentBattingTeam === state.teamA ? state.teamB : state.teamA,
            score: 0,
            wickets: 0,
            balls: 0,
        };
    } else {
        const result = calculateResult(state);
        return {
            ...state,
            matchComplete: true,
            winner: result,
        };
    }
};

export const useMatchState = () => {
    const [state, dispatch] = useReducer(matchReducer, null);

    // Auto-save on state change
    useEffect(() => {
        if (state) {
            saveMatch(state);
        }
    }, [state]);

    const actions = {
        createMatch: (teamA, teamB, overs, wickets, battingFirstTeam) => {
            dispatch({ type: ACTIONS.CREATE_MATCH, payload: { teamA, teamB, overs, wickets, battingFirstTeam } });
        },
        loadMatch: (matchState) => {
            dispatch({ type: ACTIONS.LOAD_MATCH, payload: matchState });
        },
        addRuns: (runs) => {
            dispatch({ type: ACTIONS.ADD_RUNS, payload: runs });
        },
        addWicket: () => {
            dispatch({ type: ACTIONS.ADD_WICKET });
        },
        addWide: (extraRuns) => {
            dispatch({ type: ACTIONS.ADD_WIDE, payload: extraRuns });
        },
        addNoBall: (extraRuns) => {
            dispatch({ type: ACTIONS.ADD_NO_BALL, payload: extraRuns });
        },
        addBye: (runs) => {
            dispatch({ type: ACTIONS.ADD_BYE, payload: runs });
        },
        undo: () => {
            dispatch({ type: ACTIONS.UNDO });
        },
        endInnings: () => {
            dispatch({ type: ACTIONS.END_INNINGS });
        },
        newMatch: () => {
            clearMatch();
            dispatch({ type: ACTIONS.NEW_MATCH });
        },
    };

    return [state, actions];
};
