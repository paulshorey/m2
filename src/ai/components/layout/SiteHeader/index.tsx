import styles from './index.module.scss';
import Button from '@techytools/uui/components/form/Button';
import IconMenu from '@phosphor-icons/react/dist/icons/List';
import { uiStore, type uiState } from '#/state/ui';
import Header from '#/components/ui/Header';

type Props = {
  pagePath: string;
};

export default function SiteHeader({ pagePath }: Props) {
  const ui = uiStore((state) => state as uiState);
  return (
    <Header
      className={styles.container}
      ChildrenLeft={
        <span>
          {/* <a
            href="https://techy.tools"
            target="_blank"
            style={{ color: 'var(--color-subtle)' }}
          >
            u<span style={{ letterSpacing: '1.5px' }}>i</span>
            ki<span style={{ letterSpacing: '1.5px' }}>t</span>
            .ai
          </a>
          <b> / apps / prompt-engineering</b> */}
          {/* <b>
            <a href="/">
              <>techy.tools</>
            </a>
          </b>{' '}
          / ai / {pagePath} */}
          <b>
            <a href="/">
              <>wordio.ai</>
            </a>
          </b>{' '}
          / {pagePath}
        </span>
      }
      ChildrenRight={
        <Button
          isIcon
          variant="text"
          color="info"
          sx={{ mr: '-0.125rem' }}
          onClick={() => {
            ui.openSystemDrawer_toggle();
          }}
        >
          <IconMenu width={24} height={24} />
        </Button>
      }
    />
  );
}
