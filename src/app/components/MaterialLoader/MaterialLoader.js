"use client";

import { useEffect, useState } from "react";

export default function MaterialLoader() {
  /**
   * 불러올 아이템 목록
   * 1. 명예의 파편 ItemName: 명예의 파편
   * 2. 오레하 -> 묶음으로 처리 ItemName: 오레하
   * 3. 돌파석 -> 묶음으로 처리 ItemName: 돌파석
   * 4. 강석 종류 -> ItemName: 강석 으로 요청하면 묶여서 옴
   * 5. 추가 강화 재료 -> CategoryCode: 50020 ItemName : "태양"
   */
  const [honorShard, setHonorShard] = useState([]);
  const [oreha, setOreha] = useState([]);
  const [leafStone, setLeafStone] = useState([]);
  const [forgeStone, setForgeStone] = useState([]);
  const [auxMaterial, setAuxMaterial] = useState([]);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
  /** 재료 fetch api : reqParams에 body 작성해서 파라미터로 넘김( ex : { ItemName: "명예의 파편" }) */
  async function fetchItems(reqParams) {
    try {
      console.log(process.env.NEXT_PUBLIC_API_MAIN_KEY);
      const response = await fetch(`${baseURL}/markets/items`, {
        method: "POST",
        // prettier-ignore
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${process.env.NEXT_PUBLIC_API_MAIN_KEY}`,
        },
        body: JSON.stringify(reqParams),
      });
      if (!response.ok) {
        throw new Error(`Fetch Error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data.Items[0];
    } catch (e) {
      console.log("Fetching error : ", e);
    }
  }
  useEffect(() => {
    async function fetchAllMaterial() {
      const honorShard = await fetchItems({
        Sort: "GRADE",
        CategoryCode: 50010,
        ItemName: "명예의 파편 주머니(대)",
        ItemTier: 3,
        SortCondition: "ASC",
      });
      setHonorShard(honorShard);
    }
    fetchAllMaterial();
  }, []);
  console.log(honorShard);
  return (
    <>
      <div>
        <div>Response Test</div>
        <div>YDayAvgPrice : {honorShard.YDayAvgPrice}</div>
      </div>
    </>
  );
}
