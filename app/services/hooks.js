import { useEffect, useRef, useState } from "react";
import { useSearchParams, useTransition } from "@remix-run/react";

/*

useMergeSearchParams
as in `[searchParams, mergeSearchParams] = useMergeSearchParams()`

setSearchParams({ neParam: 'whatever' }) replaces all the query params with the newParam
mergeSearchParams({ neParam: 'whatever' }) merges the newParam within the existing query params

*/

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

/*

useSearchParamState
as in `[state, setState] = useSearchParamState(initialValue)`

I think not so useful in Remix actually, more useful in a create-react-app

*/

const setDataAsSearchParam = (data) => {
  if (typeof data === "string") return data;
  if (typeof data === "number") return data;
  if (typeof data === "boolean") return data;
  return JSON.stringify(data);
};

const getDataAsSearchParam = (data, defaultValue) => {
  if (!data) return null;
  // handle objects
  if (typeof defaultValue === "string") return data;
  if (typeof defaultValue === "number") return Number(data);
  if (typeof defaultValue === "boolean") return Boolean(data);
  try {
    return JSON.parse(data);
  } catch (e) {
    // should be string
    return data;
  }
};

// NOTE: its not possible to update two different URLSearchParams very quickly, the second one cancels the first one

const useSearchParamState = (
  param,
  defaultAndInitialValue,
  {
    resetOnValueChange = null,
    setSearchParamOnMount = false,
    listenToBackButton = false,
  } = {}
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const transition = useTransition();

  const [state, setState] = useState(
    () =>
      getDataAsSearchParam(searchParams.get(param), defaultAndInitialValue) ||
      defaultAndInitialValue
  );

  const setStateRequest = (newState, { sideEffect = null } = {}) => {
    if (window) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set(param, setDataAsSearchParam(newState));
      if (Array.isArray(sideEffect) && sideEffect?.length === 2) {
        const [sideEffectParam, sideEffectValue] = sideEffect;
        searchParams.set(sideEffectParam, setDataAsSearchParam(sideEffectValue));
      }
      setSearchParams(searchParams);
      // returns the existing query string: '?type=fiction&author=fahid'
    }
    setState(newState);
  };

  const resetKeyRef = useRef(resetOnValueChange);
  useEffect(() => {
    // effect not triggered on mount
    if (resetOnValueChange !== resetKeyRef.current) {
      setStateRequest(defaultAndInitialValue);
      resetKeyRef.current = resetOnValueChange;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetOnValueChange]);

  useEffect(() => {
    if (!getDataAsSearchParam(searchParams.get(param)) && setSearchParamOnMount) {
      setStateRequest(defaultAndInitialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchParamOnMount]);

  useEffect(() => {
    if (listenToBackButton && transition?.location?.search) {
      const transitionSearch = new URLSearchParams(transition?.location.search).get(
        param
      );
      if (transitionSearch !== state) {
        // it means clicked on back button
        setStateRequest(transitionSearch);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenToBackButton, transition?.location?.search]);

  return [state, setStateRequest];
};

export default useSearchParamState;
