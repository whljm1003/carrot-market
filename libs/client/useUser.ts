import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      // replace: 뒤로가기 버튼에 기록을 남기고 싶지 않을 때 사용.
      router.replace("/enter");
    }

    console.log(router.pathname);
    if (data && data.ok && router.pathname === "/enter") {
      router.replace("/profile");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
