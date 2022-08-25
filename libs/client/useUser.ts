import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json())

export default function useUser() {
  const {data, error} = useSWR("/api/users/me", fetcher)


  // replace: 뒤로가기 버튼에 기록을 남기고 싶지 않을 때 사용.
  // return router.replace("/enter");

  return data;
}
