const getInitStep = ({ teams }) => {
  const stepNumber = 1;
  const roundNumber = 1;
  const team = teams.filter((team) => team.memberIds.length > 1)[0];
  const explainerId = team.memberIds[0];
  const guesserId = team.memberIds[1];

  const step = {
    teamId: team.teamId,
    explainerId,
    guesserId,
    score: 0,
    words: [],
    startedAt: null,
  };

  return {
    stepNumber,
    roundNumber,
    step,
  };
};

export { getInitStep };
