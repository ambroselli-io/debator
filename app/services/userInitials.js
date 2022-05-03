export const getUserInitials = (user = { firstName: "arnaud", lastName: "ambro" }) => {
  return `${user?.firstName?.[0]?.toUpperCase()}${user?.lastName?.[0]?.toUpperCase()}`;
};
