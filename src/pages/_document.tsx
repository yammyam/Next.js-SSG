import { Html, Head, Main, NextScript } from "next/document";
// 메타태그, 폰트불러오거나, 캐릭터셋, 구글 애널릭티스 -페이지 전체에 적용되는
export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
