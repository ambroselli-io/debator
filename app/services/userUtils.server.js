export const getUserInitials = (user = { firstName: "arnaud", lastName: "ambro" }) => {
  return `${user?.firstName?.[0]?.toUpperCase()}${user?.lastName?.[0]?.toUpperCase()}`;
};

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
