import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          // replace: 뒤로가기 버튼에 기록을 남기고 싶지 않을 때 사용.
          return router.replace("/enter");
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
}
