import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);
};

export default useQueryParams;
