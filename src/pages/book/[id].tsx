// [id] 명칭은 dynamicPath
// 다이나믹 패스를 SSG로 생성하려하면 오류나는 이유 : 어떤페이지가올지 모르기때문에 따로 id를 몇개 설정해줘서 생성해야하는 방식으로 해야함
// 그역할을 하는 함수가 getStaticPaths
import fetchOneBook from "@/lib/fetch-one-book";
import style from "@/pages/book/[id].module.css";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // fallback의 3가지 옵션
    // 예비상황에 대한 대비책 느낌. ex)정해두지않은 파람스 값
    // false -> 정해두지 않은 페이지들 404페이지로 연결
    // "blocking" -> (ssr느낌으로 페이지생성-정해두지않은 페이지들을)
    // true -> props없는 페이지 반환, 레이아웃만 출력해주는 느낌(page컴포넌트) -> props계산(getStaticProps함수 실행) -> 내용물들 전송 (로딩화면으로 시간끌기)
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; //!는 id가 있을것이다 라는 명시, 파일명이 [id]라서 파람스가 있을수밖에없음.(있어야 접근할수있어서)
  if (!id || Array.isArray(id)) {
    return { notFound: true };
  }
  const book = await fetchOneBook(Number(id));
  if (!book) {
    return { notFound: true };
  }
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
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
        <div>로딩 중 입니다 .......</div>;
      </>
    );
  }
  if (!book) {
    return <p>문제가 발생했습니다. 다시 시도해주세요</p>;
  }
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
