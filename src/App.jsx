import { useState } from 'react';
import { useMatchState } from './hooks/useMatchState';
import { loadMatch } from './utils/storage';
import CreateMatch from './components/CreateMatch';
import TossScreen from './components/TossScreen';
import ScoringScreen from './components/ScoringScreen';
import MatchResult from './components/MatchResult';
import './App.css';

function App() {
    const [state, actions] = useMatchState();
    const [showToss, setShowToss] = useState(false);
    const [matchInfo, setMatchInfo] = useState(null);

    const handleProceedToToss = (teamA, teamB, overs, wickets) => {
        setMatchInfo({ teamA, teamB, overs, wickets });
        setShowToss(true);
    };

    const handleTossComplete = (tossWinner, tossDecision, battingFirstTeam) => {
        actions.createMatch(
            matchInfo.teamA,
            matchInfo.teamB,
            matchInfo.overs,
            matchInfo.wickets,
            battingFirstTeam
        );
        setShowToss(false);
        setMatchInfo(null);
    };

    const handleResumeMatch = () => {
        const savedMatch = loadMatch();
        if (savedMatch) {
            actions.loadMatch(savedMatch);
        }
    };

    const handleNewMatch = () => {
        actions.newMatch();
    };

    const handleSuperOver = () => {
        // Create a super over (1 over, 2 wickets, team that batted 2nd goes first)
        // In super over, the team that chased (batted 2nd) bats first
        const superOverFirstTeam = state.currentBattingTeam; // Team that just batted 2nd
        const superOverSecondTeam = state.currentBattingTeam === state.teamA ? state.teamB : state.teamA;

        actions.createMatch(superOverFirstTeam, superOverSecondTeam, 1, 2);
    };

    // Show toss screen if proceeding to toss
    if (showToss && matchInfo) {
        return (
            <TossScreen
                teamA={matchInfo.teamA}
                teamB={matchInfo.teamB}
                onTossComplete={handleTossComplete}
            />
        );
    }

    // Show create match screen if no active match
    if (!state) {
        return (
            <CreateMatch
                onProceedToToss={handleProceedToToss}
                onResumeMatch={handleResumeMatch}
            />
        );
    }

    // Show result screen if match is complete
    if (state.matchComplete) {
        return (
            <MatchResult
                state={state}
                onNewMatch={handleNewMatch}
                onSuperOver={handleSuperOver}
            />
        );
    }

    // Show scoring screen
    return (
        <ScoringScreen
            state={state}
            actions={actions}
        />
    );
}

export default App;
