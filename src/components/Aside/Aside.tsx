import { ReactNode } from "react";
import styles from './Aside.module.scss'

function Aside({
  children,
  position,
  center,
}: {
  children: ReactNode;
  position: "left" | "right";
  center: boolean
}) {
  return <div className={`${styles.aside} ${center ? styles.center : ""} ${styles[position]}`}>{children}</div>;
}

export default Aside;
