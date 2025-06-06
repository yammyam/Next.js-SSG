import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
// import books from "@/mock/books.json"; // ../목/북제이슨하면 오류남 404
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
// @/mock/books.json 경로에서 골뱅이는 src를 가리키는뜻, package.json에서 확인가능
import Head from "next/head";

export const getStaticProps = async () => {
  //컴퍼넌트보다 먼저 실행되어서,컴포넌트에 필요한(백엔드데이터) 데이터를 미리 불러오는 함수
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]); //위는 순차적 해당코드는 병렬적 동작
  return {
    props: { allBooks, recoBooks },
    // revalidate: 3,
  };
};
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나보세요!"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
