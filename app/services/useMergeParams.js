import { useSearchParams } from "remix";

export const useMergeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mergeSearchParams = (newParams) => {
    const searchParamsObject = {};
    for (const [key, param] of searchParams.entries()) {
      searchParamsObject[key] = param;
    }
    for (const [key, param] of Object.entries(newParams)) {
      if (!param) delete searchParamsObject[key];
      else searchParamsObject[key] = param;
    }
    setSearchParams(searchParamsObject);
  };

  return [searchParams, mergeSearchParams];
};
