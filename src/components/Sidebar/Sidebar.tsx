import { ReactNode } from "react";
import styles from "./Sidebar.module.scss";

function Sidebar({
  isOpen,
  toggle,
  children,
}: {
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;
}) {
  if (!isOpen) return;

  return (
    <>
      <div
        className={`${styles.wrapper} ${isOpen ? styles.open : ""} `}
        onClick={toggle}
      ></div>
      <div className={styles.container}>{children}</div>
    </>
  );
}

export default Sidebar;
