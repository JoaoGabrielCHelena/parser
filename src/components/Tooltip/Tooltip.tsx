import { ReactNode } from "react";
import styles from './Tooltip.module.scss'

function Tooltip({children, text}:{children:ReactNode, text:string}) {
  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <div className={styles.tooltip}>{text}</div>
    </div>
  )
}

export default Tooltip
