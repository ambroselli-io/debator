export const challengeFormat = (challenge) => {
  return {
    _id: challenge._id,
    title: challenge.title,
    description: challenge.description,
    excludeEnvironment: challenge.excludeEnvironment,
  };
};
