import { LinkedList } from '@/shared/lib';

const getNextStep = ({ stepNumber, roundNumber, teamsCompleted, teams }) => {
  const nextStepNumber = stepNumber >= teamsCompleted ? 1 : stepNumber + 1;
  const nextRoundNumber = stepNumber >= teamsCompleted ? roundNumber + 1 : roundNumber;
  const filteredTeams = teams.filter((team) => team.memberIds.length > 1);
  const teamsList = new LinkedList(filteredTeams);
  const nextTeam = teamsList.get(stepNumber - 1).next.data;
  const memberIdsList = new LinkedList(nextTeam.memberIds);
  const membersCount = memberIdsList.size;
  const nextExplainerId = memberIdsList.get((roundNumber - 1) % membersCount).next.data;
  const nextGuesserId = memberIdsList.get((roundNumber - 1) % membersCount).next.next.data;

  const step = {
    teamId: nextTeam.teamId,
    explainerId: nextExplainerId,
    guesserId: nextGuesserId,
    score: 0,
    words: [],
    startedAt: null,
  };

  return {
    nextStepNumber,
    nextRoundNumber,
    step,
  };
};

export { getNextStep };
