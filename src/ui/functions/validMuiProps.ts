import isPropValid from '@techytools/uui/data/isPropValid';

export default function validMuiProps(props: Record<string, any>) {
  const forwardProps = {};
  for (let [key, val] of Object.entries(props)) {
    if (key === 'sx' || isPropValid[key.toLowerCase()] || /:|-/.test(key)) {
      forwardProps[key] = val;
    }
  }
  return forwardProps;
}
