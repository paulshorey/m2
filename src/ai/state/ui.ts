/**************************************************************************************************
 * PLEASE NOTE:
 * Read documentation in ui.d.ts to understand this state and how to use it.
 *
 * NAMING CONVENTION:
 * - use camelCase for variable names
 * - use snake_case for function names
 * If you mention a variable name in a function name, use camelCase for that part, then snake_case for the rest.
 *************************************************************************************************/
import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { state } from './ui';

const store = create(
  persist(
    (set, get) => ({
      /*
       * Toast
       */
      toast: {
        open: false,
        message: '',
        severity: 'info',
      },
      toast_open: ({ message, severity }: Partial<state['toast']>) =>
        set({ toast: { open: true, message, severity } }),
      toast_close: () =>
        set({ toast: { open: false, message: '', severity: 'info' } }),
      /*
       * Drawers
       */
      openSystemDrawer: false,
      openSystemDrawer_toggle: () => {
        const state = get() as state;
        set({ openSystemDrawer: !state.openSystemDrawer });
      },
      openSearchSystemPrompts: false,
      openSearchSystemPrompts_toggle: () => {
        const state = get() as state;
        set({ openSearchSystemPrompts: !state.openSearchSystemPrompts });
      },
      /*
       * Show advanced options tooltip hint only once
       * DEPRECATED - maybe no longer used - anyway move toggles to one object with one action
       */
      tooltipSystemPromptSettings: true,
      tooltipSystemPromptSettings_false: () =>
        set({ tooltipSystemPromptSettings: false }),
      tooltipFindPrompts: true,
      tooltipFindPrompts_false: () => set({ tooltipFindPrompts: false }),
      /*
       * To make this "toggle" simple light/dark like in a normal site,
       * simply set only 2 values for state.colorSchemes: light and dark.
       */
      colorSchemes: ['colorful', 'light', 'dark'],
      colorScheme: 'colorful',
      colorSchemeToggle: () => {
        const { colorSchemes, colorScheme } = get() as state;
        // find index of currently selected colorScheme
        const index = colorSchemes.findIndex(
          (scheme) => scheme === colorScheme,
        );
        // set colorScheme to next in array, or first if at end of array
        set({
          colorScheme: colorSchemes[(index + 1) % colorSchemes.length],
        });
      },
    }),
    {
      name: 'ui-cache123845',
    },
  ),
);

export const uiStore = store;
export type uiStore = typeof store;
export type uiState = state;
