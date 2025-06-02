import fetchOneBook from "@/lib/fetch-one-book";
import style from "@/pages/book/[id].module.css";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id; //!는 id가 있을것이다 라는 명시, 파일명이 [id]라서 파람스가 있을수밖에없음.(있어야 접근할수있어서)
  const book = await fetchOneBook(Number(id));
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  if (!book) {
    return <p>문제가 발생했습니다. 다시 시도해주세요</p>;
  }
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author}|{publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
