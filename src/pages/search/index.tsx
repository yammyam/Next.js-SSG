import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useReducer } from "react";
import BookItem from "@/components/book-item";
// import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
// import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { useState } from "react";
import { BookData } from "@/types";
import fetchBooks from "@/lib/fetch-books";

// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const q = context.query.q; //쿼리 스트링 불러오는 것
//   const books = await fetchBooks(q as string); // 타입단언
//   return {
//     props: { books },
//   };
// };
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
