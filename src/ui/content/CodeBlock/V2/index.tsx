import { Highlight, themes } from 'prism-react-renderer';
import React from 'react';
// import ReactDOM from 'react-dom/client';
// import styles from 'styles.module.css';

const codeBlock = `
const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}
`;

// export type CodeBlockProps = undefined;

export const CodeBlock = () => (
  <Highlight code={codeBlock} language="tsx" theme={themes.shadesOfPurple}>
    {({ getLineProps, getTokenProps, style, tokens }) => (
      <pre style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            <span>{i + 1}</span>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default CodeBlock;
