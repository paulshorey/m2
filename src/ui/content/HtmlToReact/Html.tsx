import parse from 'html-react-parser';
// import CodeBlock from '@techytools/uui/components/client/CodeBlock';
// import Code from '@techytools/ui/components/Code';

export default function ({ str, debug = false, ...props }) {
  if (!str || typeof str !== 'string') {
    console.warn(`HtmlToReact: !str || typeof str !== 'string'`, str);
    return null;
  }
  const html = str.replace(/[\n\r]+/g, '<br />');
  // html = formatTextFromCMS(str);
  const options = {
    // replace: (el) => {
    //   if (el.name === 'code' && el.parent.name === 'pre') {
    //     console.log('el', el);
    //     return (
    //       <Code
    //         language={el.attribs.class?.replace('language-', '')}
    //         code={
    //           el.children && el.children?.[0] && el.children?.[0].data
    //             ? el.children?.[0].data
    //             : '!el.children?.[0].data'
    //         }
    //       />
    //     );
    //   }
    //   return null;
    // },
  };
  const parsed = parse(html, options);
  return (
    <span className="HtmlToReact" {...props}>
      {parsed}
      {/* {debug && (
        <div>
          <h3>Html string:</h3>
          <CodeBlock value={html} />
          <br />
          <h3>Parsed string:</h3>
          <CodeBlock value={html} />
        </div>
      )} */}
    </span>
  );
}
