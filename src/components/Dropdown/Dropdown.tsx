import {
  createContext,
  useContext,
  useState,
  ReactNode,
  HTMLAttributes,
} from "react";
import styles from "./Dropdown.module.scss";

const DropdownContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
} | null>(null);

function Dropdown(props: HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className={styles.container}>{props.children}</div>
    </DropdownContext.Provider>
  );
}

interface buttonProps extends HTMLAttributes<HTMLButtonElement> {
  expanded?: ReactNode | string;
}

function Button(props: buttonProps) {
  const context = useContext(DropdownContext);
  if (!context) return
  const { toggle, isOpen } = context;

  return (
    <button
      {...props}
      onClick={() => {
        toggle();
      }}
      className={styles.button}
    >
    {isOpen && props.expanded ? props.expanded : props.children}
    </button>
  );
}

// 4. Content subcomponent
function Content(props: HTMLAttributes<HTMLDivElement> ) {
  const context = useContext(DropdownContext);
  if (!context) return
  const { isOpen, toggle } = context;

  return isOpen ? <div onClick={toggle} className={styles.menu} {...props}>{props.children}</div> : null;
}

Dropdown.Button = Button;
Dropdown.Content = Content;

export default Dropdown;
