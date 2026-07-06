import { getUser } from "@/app/_utils/actions";
import { useQuery } from "@tanstack/react-query";

function useUser() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return { data, error, isLoading };
}

export default useUser;
