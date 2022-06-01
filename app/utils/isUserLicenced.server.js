import dayjs from "dayjs";

export const isUserLicenced = (user) => {
  if (!user?.licence?.length) return false;
  if (user.licence === "lifely") return true;
  if (user.licence === "monthly") {
    return dayjs(user.licenceStartedAt).add(1, "month").isAfter(dayjs());
  }
  if (user.licence === "yearly") {
    return dayjs(user.licenceStartedAt).add(1, "year").isAfter(dayjs());
  }
};
