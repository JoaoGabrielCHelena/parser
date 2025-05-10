import styles from "./Sidebar.module.scss";

import { useState } from "react";

const allowedTagsMap = new Map([
  ["p", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p"],
  ["div", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div"],
  ["pre", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre"],
  [
    "blockquote",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote",
  ],

  ["b", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b"],
  [
    "strong",
    "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong",
  ],
  ["i", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i"],
  ["em", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em"],
  ["u", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u"],
  ["s", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s"],
  ["small", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small"],
  ["sub", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub"],
  ["sup", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup"],
  ["mark", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark"],
  ["abbr", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr"],
  ["code", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code"],
  ["kbd", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd"],
  ["var", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var"],
  ["span", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span"],
  ["br", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br"],

  ["ul", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul"],
  ["ol", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol"],
  ["li", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li"],
  ["dl", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl"],
  ["dt", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt"],
  ["dd", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd"],

  ["a", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"],
  ["img", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img"],

  ["table", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table"],
  ["thead", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead"],
  ["tbody", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody"],
  ["tfoot", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot"],
  ["tr", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr"],
  ["th", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th"],
  ["td", "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td"],
]);

let allowedTags = [...allowedTagsMap].map(([key, value]) => {
  return (
    <li>
      <a target="_blank" href={value}>
        {key}
      </a>
    </li>
  );
});

function allowedTagsList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p className={styles.hover} onClick={() => setIsOpen(!isOpen)}>
        Allowed HTML tags {isOpen ? "⮟" : "⮞"}
      </p>
      {isOpen ? (
        <ul style={{ listStylePosition: "inside" }}>{allowedTags}</ul>
      ) : null}
    </>
  );
}

function Components() {
  return (
    <>
      <p>Allowed Components</p>
      <ul style={{ paddingLeft: "25px" }}>
        <li>
          tooltip
          <div className={styles.example}>
            {"<tooltip text='text on tooltip'>text on page</tooltip>"}
          </div>
        </li>
        <br />
        <li>
          aside
          <div style={{ fontSize: "13px" }}>
            postion: which side of the text the box floats on
            <br />
            values: left || right
            <br />
            center (optional): center all items in a column
            <br />
            values: true, false
          </div>
          <div className={styles.example}>
            {"<aside position='left' center='true'>content</aside>"}
          </div>
        </li>
        <br />
        <li>
          collapse
          <div style={{ fontSize: "13px" }}>
            Wrapper element. collapsebutton toggles the visibility of
            collapsecontent.
            <br />
            expanded (optional): text shown in the button when expanded
          </div>
          <div className={styles.example}>
            {"<collapse>"}
            <br />
            {
              "　　<collapsebutton expanded='text when expanded'>some text</collpasebutton>"
            }
            <br /> {"　　<collapsecontent>content</collapsecontent>"}
            <br />
            {"</collapse>"}
          </div>
        </li>
      </ul>
    </>
  );
}

function Attributes() {
  return (
    <>
      <p>Allowed Attibutes</p>
      <ul style={{ paddingLeft: "25px" }}>
        <li>
          global: style, id
          <div style={{ fontSize: "13px" }}>
            style is written in camelCase and JSON. eg:
            <br />
            {`style='{"fontSize":"16px"}'`}
          </div>
        </li>
        <li>a: href, title</li>
        <li>img: src, alt, width, height</li>
        <li>abbr: title</li>
        <li>tooltip: text</li>
        <li>aside: position, center</li>
        <li>collapsebutton: expanded</li>
      </ul>
    </>
  );
}

let SidebarContent = {
  Html: allowedTagsList,
  Components: Components,
  Attributes: Attributes,
};

export default SidebarContent;
