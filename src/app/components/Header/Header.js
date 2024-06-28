import style from "@/app/components/Header/Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className={style.Header}>
        <div className={style.ButtonWrapper}>
          <Link href={"/"}>
            <button className={style.Button}>LostArk Tools</button>
          </Link>
          <Link href={"/schedule"}>
            <button className={style.Button}>주간 숙제표</button>
          </Link>
          <Link href={"/package-efficiency"}>
            <button className={style.Button}>패키지 효율 계산</button>
          </Link>
          <Link href={"/"}>
            <button className={style.Button}>품질작 시뮬레이터</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
