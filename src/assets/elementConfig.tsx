import Aside from "../components/Aside";
import Collapse from "../components/Collapse/Collapse";
import Tooltip from "../components/Tooltip";

let allowedTags = [
  "p",
  "div",
  "pre",
  "blockquote",

  "b",
  "strong",
  "i",
  "em",
  "u",
  "s",
  "small",
  "sub",
  "sup",
  "mark",
  "abbr",
  "code",
  "kbd",
  "var",
  "span",
  "br",

  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",

  "a",
  "img",

  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
];

let tagAttributes: {
  [tagName: string]: string[];
} = {
  a: ["href", "title"],
  img: ["src", "alt", "width", "height"],
  abbr: ["title"],
  tooltip: ["text"],
  aside: ["position", "center"],
  collapsebutton: ["expanded"],
};

let attributeWhitelist = ["style", "id"];

let componentMap: {
  [tagName: string]: React.ComponentType<any>;
} = {
  tooltip: Tooltip,
  aside: Aside,
  collapse: Collapse,
  collapsebutton: Collapse.Button,
  collapsecontent: Collapse.Content,
};

export { allowedTags, tagAttributes, attributeWhitelist, componentMap };
