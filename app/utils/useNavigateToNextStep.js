import { useSearchParams } from "remix";

const cleanSearchParams = (searchParams) => {
  if (searchParams.get("topicIndex")) searchParams.delete("topicIndex"); // special case for debator...
  if (searchParams.get("challengeIndex")) searchParams.delete("challengeIndex"); // special case for debator...
  if (!searchParams.get("topicId") || !searchParams.get("topicId")?.length)
    searchParams.delete("topicId"); // special case for debator...
  if (!searchParams.get("challengeId") || !searchParams.get("challengeId")?.length)
    searchParams.delete("challengeId"); // special case for debator...
  return searchParams;
};

const mergeSearchParamsToString = (
  param,
  value,
  searchParams = new URLSearchParams()
) => {
  searchParams = new URLSearchParams(searchParams);
  searchParams.set(param, value);
  return cleanSearchParams(searchParams);
};

const deleteSearchParam = (param, searchParams = new URLSearchParams()) => {
  searchParams = new URLSearchParams(searchParams);
  searchParams.delete(param);
  return cleanSearchParams(searchParams);
};

const useNavigateToNextStep = () => {
  const [searchParams] = useSearchParams();

  return (newParamToMerge, value) => {
    let nextRoute = null;
    let nextParams = !value
      ? deleteSearchParam(newParamToMerge, searchParams)
      : mergeSearchParamsToString(newParamToMerge, value, searchParams);

    if (!nextParams.get("mode")?.length) {
      nextRoute = "choisir-un-mode-de-jeu";
    } else if (
      !nextParams.get("challengeId")?.length &&
      newParamToMerge !== "challengeId"
    ) {
      nextRoute = "choisir-un-defi";
    } else {
      nextRoute = "on-joue";
    }

    return `../${nextRoute}?${nextParams.toString()}`;
  };
};
export default useNavigateToNextStep;
