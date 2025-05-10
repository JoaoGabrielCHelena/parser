import React, { HTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Editor.module.scss";
import ErrorBoundary from "../ErrorBoundary";
import { allowedTags, tagAttributes, attributeWhitelist, componentMap } from '../../assets/elementConfig'

function Input(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={styles.input}
      cols={30}
      rows={30}
    ></textarea>
  );
}

function Output({ input }: { input: string }) {

  return (
    <div className={styles.output}>
      <ErrorBoundary fallbackRender={(error) => <>{error}</>}>
        {renderSanitizedContent(input)}
      </ErrorBoundary>
    </div>
  );
}

function Button(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.button} {...props}>
      {props.children} 
    </button>
  );
}

let Editor = {
  input: Input,
  output: Output,
  button: Button,
};

export default Editor;

function renderSanitizedContent(input: string): React.ReactNode[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");

  function sanitizeAttributes(
    node: Element,
    tagName: string,
  ): Record<string, any> {
    let allowed = [...(tagAttributes[tagName] || []), ...attributeWhitelist];
    const attrs: Record<string, any> = {};

    for (const attr of Array.from(node.attributes)) {
      if (!allowed.includes(attr.name)) continue;

      if (attr.name === "style") {
        try {
          attrs.style = JSON.parse(attr.value);
        } catch {
          attrs.style = {};
        }
      } else {
        attrs[attr.name] = attr.value;
      }
    }

    return attrs;
  }

  function processNode(node: Node, key: string): React.ReactNode {
    if (node.nodeValue && /^\n+$/.test(node.nodeValue)) return;

    switch (node.nodeType) {
      case Node.TEXT_NODE:
        return node.textContent;

      case Node.ELEMENT_NODE: {
        const el = node as Element;
        const tagName = el.tagName.toLowerCase();
        const children = Array.from(el.childNodes).map((child, i) =>
          processNode(child, `${key}-${i}`),
        );

        if (componentMap[tagName]) {
          const Comp = componentMap[tagName];
          const props = sanitizeAttributes(el, tagName);
          return (
            <Comp key={key} {...props}>
              {children}
            </Comp>
          );
        }

        if (allowedTags.includes(tagName)) {
          const props = { key, ...sanitizeAttributes(el, tagName) };
          return React.createElement(tagName, props, ...children);
        }

        // Return disallowed element as raw HTML string
        return el.outerHTML;
      }

      default:
        return null;
    }
  }

  return Array.from(doc.body.childNodes).map((node, i) =>
    processNode(node, `node-${i}`),
  );
}
