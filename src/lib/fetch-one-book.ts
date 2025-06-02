import { BookData } from "@/types";
export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  // 오류났을때 널이기때문에 or연산으로 널반환 암시
  const url = `http://localhost:12345/book/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
