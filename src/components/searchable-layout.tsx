import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useState } from "react";
export default function SearchableLayout({
  children,
}: {
  children: ReactNode; //타입설정 들오는 녀석은 "인덱스페이지"임, 상세페이지같은녀석은 아님.
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string; //타입단언as
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //엔터눌렀을때작동하는함수
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
