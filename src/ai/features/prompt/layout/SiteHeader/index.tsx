import styles from './index.module.scss';
import Button from '@techytools/uui/components/form/Button';
import IconMenu from '@phosphor-icons/react/dist/icons/List';
import uiState from '#/state/ui';
import { uiStateType } from '#/state/ui';
import Header from '#/components/ui/Header';

export default function SiteHeader() {
  const ui = uiState((state) => state as uiStateType);
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
          <a
            href="https://techy.tools"
            target="_blank"
            style={{ color: 'var(--color-subtle)' }}
          >
            <>wordio.ai</>
          </a>{' '}
          / prompt-engineering
        </span>
      }
      ChildrenRight={
        <Button
          isIcon
          variant="text"
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
