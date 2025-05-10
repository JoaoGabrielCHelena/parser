import {
  createContext,
  useContext,
  useState,
  ReactNode,
  HTMLAttributes,
} from "react";
import styles from "./Collapse.module.scss";

const CollapseContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
} | null>(null);

function Collapse(props: HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <CollapseContext.Provider value={{ isOpen, toggle }}>
      <div {...props}>{props.children}</div>
    </CollapseContext.Provider>
  );
}

interface buttonProps extends HTMLAttributes<HTMLButtonElement> {
  expanded?: ReactNode | string;
}

function Button(props: buttonProps) {
  const context = useContext(CollapseContext);
  if (!context) return <span style={{color:"red"}}>{"<collapseButton>"} is meant to be used inside a {"<collapse>"}</span>;
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
  const context = useContext(CollapseContext);
  if (!context) return <span style={{color:"red"}}>{"<collapseContent>"} is meant to be used inside a {"<collapse>"}</span>;
  const { isOpen } = context;

  return isOpen ? <div {...props}>{props.children}</div> : null;
}

Collapse.Button = Button;
Collapse.Content = Content;

export default Collapse;
