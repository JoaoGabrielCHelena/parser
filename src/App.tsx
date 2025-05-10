import { useState } from "react";
import "./App.scss";
import Editor from "./components/Editor";
import Dropdown from "./components/Dropdown/Dropdown";

import ufa from "./assets/UFA.txt?raw";
import hoa from "./assets/HoA.txt?raw";
import { Sidebar, SidebarContent } from "./components/Sidebar";

function App() {
  const [pageText, setPageText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [sidebar, setSidebar] = useState(false);

  const handleClick = () => {
    setPageText(inputValue);
  };

  const loadExample = (input: string) => {
    switch (input) {
      case "hoa":
        input = hoa;
        break;
      default:
        input = ufa;
        break;
    }
    setInputValue(input);
    setPageText(input);
  };

  let toggle = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <Sidebar isOpen={sidebar} toggle={toggle}>
        <SidebarContent.Html />
        <br />
        <SidebarContent.Components />
        <br />
        <SidebarContent.Attributes />
        <br />
        <p>
          TBI: <br />
          Creation of reusable snippets <br />
          Quick image library
        </p>
      </Sidebar>
      <div className="container">
        <div className="text">
          <h2>Parser</h2>
          <br />
          <p>
            This is a parser for a html-react markup. It allows for the
            customization of elements with inline css and the use of more
            complex preset components using React. For safety, allowed tags and
            attributes are set via a whitelist.
          </p>
          <br />
          <p>
            This comes from my frustation at the limitations of BBcode. BBcode
            is used in nationstates, hence the examples.
          </p>
          <br />
        </div>
        <Editor.input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="buttonRow">
          <Editor.button onClick={handleClick}>Update</Editor.button>
          <Dropdown>
            <Dropdown.Button>Select Example</Dropdown.Button>
            <Dropdown.Content>
              <button onClick={() => loadExample("ufa")}>UFA Example</button>
              <button onClick={() => loadExample("hoa")}>HoA Example</button>
            </Dropdown.Content>
          </Dropdown>
          <Editor.button onClick={toggle}>Taglist</Editor.button>
        </div>
        <Editor.output input={pageText} />
      </div>
    </>
  );
}

export default App;
