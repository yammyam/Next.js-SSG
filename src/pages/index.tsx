import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json"; // ../목/북제이슨하면 오류남 404
import BookItem from "@/components/book-item";
// @/mock/books.json 경로에서 골뱅이는 src를 가리키는뜻, package.json에서 확인가능

export const getServerSideProps = () => {
  //컴퍼넌트보다 먼저 실행되어서,컴포넌트에 필요한(백엔드데이터) 데이터를 미리 불러오는 함수
  const data = "hello";
  return {
    props: {
      data,
    },
  };
};
export default function Home({ data }: any) {
  console.log(data);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
