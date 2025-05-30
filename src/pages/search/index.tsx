import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
// ?q=홍길동  쿼리스트링은 경로에 대해 뭘 건들지 않기 때문에 파일구조엔 변화없다.
export default function Page() {
  const router = useRouter();
  console.log(router);
  const { q } = router.query;
  return <h1>{q}</h1>;
}
Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
