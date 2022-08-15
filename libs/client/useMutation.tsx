import { useState } from "react";

interface UseMutationSate {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutationResult = [(data: any) => void, UseMutationSate];

export default function useMutation(url: string): UseMutationResult {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  const mutation = (data: any) => {};

  return [mutation, { loading, data, error }];
}
