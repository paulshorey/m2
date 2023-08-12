/**
 * id doubles as a label, a short human readable identifier
 * so if not provided, generate a unique label to use as id
 */
export default function generateMessageId(
  value: string,
  dictionary: Record<string, string>,
) {
  let label = value.substring(0, 30);
  if (dictionary[label]) {
    label += Math.random().toString(36).substring(2, 15);
  }
  return label;
}
