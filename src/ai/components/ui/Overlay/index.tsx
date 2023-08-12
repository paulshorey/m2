import styles from './index.module.scss';

export default function ButtonOpenDrawer({
  onClick,
}: {
  onClick: (e: any) => void;
}) {
  return <div className={styles.container} onClick={onClick} />;
}
