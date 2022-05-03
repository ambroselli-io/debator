export const isUserOnboarded = (user) => {
  if (!user) return false;
  /* prettier-ignore */
  const requiredFields = [
    'firstName',
    'lastName',
    'title',
  ]
  for (const field of requiredFields) {
    if (!user[field]) return false;
  }
  return true;
};
