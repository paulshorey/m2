export type state = {
  toast: {
    open: false;
    message: ''; // maybe allow ReactNode?
    severity?: '' | 'info' | 'warn' | 'error' | 'success'; // undefined or '' = default like "log"
  };

  colorSchemes: string[];
  colorScheme: string;
  colorSchemeToggle: () => void;

  tooltipSystemPromptSettings_false: () => void;
  tooltipSystemPromptSettings: boolean;
  tooltipFindPrompts_false: () => void;
  tooltipFindPrompts: boolean;

  openSystemDrawer: boolean;
  openSystemDrawer_toggle: () => void;
  openSearchSystemPrompts: boolean;
  openSearchSystemPrompts_toggle: () => void;
};
