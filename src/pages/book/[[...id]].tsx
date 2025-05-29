import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  console.log(id);
  return <h1>book 개별페이지 {id}번째 책</h1>;
}
