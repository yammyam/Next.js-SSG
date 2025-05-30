import { ReactNode } from "react";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode; //타입설정 들오는 녀석은 "인덱스페이지"임, 상세페이지같은녀석은 아님.
}) {
  return (
    <div>
      <div>임시서치바</div>
      {children}
    </div>
  );
}
