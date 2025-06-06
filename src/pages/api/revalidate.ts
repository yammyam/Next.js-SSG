import { NextApiRequest, NextApiResponse } from "next";
//사용자의 행동에 의해 페이지의 정보 최신화나 변경을 하고싶을때 여기로 요청
const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query.token; // 쿼리에서 토큰 받음
  if (!token || token !== REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    await res.revalidate(`/`);
    return res.json({ revalidate: true });
  } catch (error) {
    res.status(500).send("재검증 실패");
  }
}
