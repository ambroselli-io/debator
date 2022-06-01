export const getUserInitials = (user = { firstName: "arnaud", lastName: "ambro" }) => {
  return `${user?.firstName?.[0]?.toUpperCase()}${user?.lastName?.[0]?.toUpperCase()}`;
};

export const isUserOnboarded = (user) => {
  if (!user) return false;
  /* prettier-ignore */
  const requiredFields = [
    'email',
    'licence',
  ]
  for (const field of requiredFields) {
    if (!user[field]) return false;
  }
  return true;
};
