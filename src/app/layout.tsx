import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";

export default function GlobalLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href={"/"}>👓 ONEBITE CINEMA</Link>
          </header>
          <main className={style.main}>{children}</main>
          <footer className={style.footer}>제작 @kyh</footer>
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
