/**************************************************************************************************
 * PLEASE NOTE:
 * Read documentation in chat.d.ts to understand this state and how to use it.
 *
 * NAMING CONVENTION:
 * - use camelCase for variable names
 * - use snake_case for function names
 * If you mention a variable name in a function name, use camelCase for that part, then snake_case for the rest.
 *************************************************************************************************/
import { create } from 'zustand';
import type {
  conversationId,
  messenger,
  systemId,
  systemSettings,
  userId,
  message,
  assistantId,
  state,
} from './chat';
import generateMessageId from './utils/generateMessageId';

const state: state = {
  /** History of conversations, and which messages were used in each. */
  conversations: {
    '': {
      '': { '': '' },
    },
  },
  /** Storage of each message value by id. */
  dictionary: {
    assistant: {
      '': 'asistant response value',
    },
    user: {
      '': 'user input value',
    },
    system: {
      '': 'system prompt value',
    },
    settings: {
      '': {
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: '',
      },
    },
  },
  /** When a user starts editing a message (onFocus textarea), store the temporary value here. */
  edit: {
    messenger: 'system',
    message: '',
    systemId: '',
    userId: '',
    assistantId: '',
    conversationId: '',
  },
  /** When editing settings, `state.edit.systemId` must be set, or it will not save. */
  editSettings: {
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: '',
  },
  /** Reset to these values when starting a new system prompt. */
  defaultSettings: {
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: '',
  },
};

const store = create((set, get) => ({
  ...state,
  /**
   * Load a conversation by id. If no id is provided, load the most recent conversation.
   */
  get_conversation: function (conversationId?: conversationId) {
    const { conversations } = get() as state;
    if (conversationId) {
      return conversations[conversationId];
    } else {
      for (let id in conversations) {
        return conversations[id];
      }
    }
  },
  /**
   * All messages by `messenger`. Optionally pass `query` to search by keyword.
   */
  get_messages: function (
    messenger: messenger,
    query?: string,
  ): Record<systemId | userId | assistantId, message> {
    const { dictionary } = get() as state;
    let results = {} as Record<systemId | userId | assistantId, message>;
    if (query) {
      for (let id in dictionary[messenger]) {
        let message = dictionary[messenger][id];
        if (id.includes(query) || message.includes(query)) {
          results[id] = message;
        }
      }
    } else {
      results = dictionary[messenger];
    }
    return results;
  },
  /**
   * While user is editing a textarea (onChange). Store the temporary value here.
   * When the user is finished editing (onBlur), call `save_edited_message` to save the edited text.
   */
  edit_message: function (edit: state['edit']) {
    set({ edit });
  },
  /**
   * First `edit_message`. When finished editing, call this function.
   * For assistant response, while waiting for the blob stream, also temporarily use edit_message.
   */
  save_edited_message: function () {
    const { conversations, dictionary, edit } = get() as state;
    const {
      messenger,
      message,
      systemId,
      userId,
      assistantId,
      conversationId,
    } = edit;
    const newId = generateMessageId(message, dictionary[messenger]);
    switch (messenger) {
      case 'system': {
        conversations[conversationId][systemId || newId] = {};
        dictionary[messenger][systemId] = message;
      }
      case 'user': {
        conversations[conversationId][systemId][userId || newId] = '';
        dictionary[messenger][userId] = message;
      }
      case 'assistant': {
        conversations[conversationId][systemId][userId] = assistantId || newId;
        dictionary[messenger][assistantId] = message;
      }
    }
    set({ conversations, dictionary });
  },
  /**
   * Settings are indexed by the same systemId as system messages.
   */
  get_settings: function (systemId: systemId): systemSettings {
    const { dictionary } = get() as state;
    return dictionary.settings[systemId];
  },
  /**
   * NOTE: Do not allow user to edit settings
   * unless `state.edit.messenger === 'system'` and `state.edit.systemId` is set.
   */
  edit_settings: function (settings: systemSettings) {
    set({ editSettings: settings });
  },
  /**
   * NOTE: Do not allow user to edit settings
   * unless `state.edit.messenger === 'system'` and `state.edit.systemId` is set.
   */
  save_settings: function () {
    const { dictionary, edit, editSettings } = get() as state;
    const { systemId } = edit;
    dictionary.settings[systemId] = editSettings;
    set({ dictionary });
  },
  /**
   * Submit to API, wait for GPT response.
   */
  submit_conversation: function (conversationId: conversationId) {
    const { conversations } = get() as state;
    const conversationIds = conversations[conversationId];

    // try {
    //   const responseValue = await fetch('/api/ai/chat/gpt4', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(postData),
    //   });
    //   const responseJson = await responseValue.json();
    //   const convo = {
    //     ...postData,
    //     assistantMessage: responseJson.message,
    //   };
    //   set_hasResponded(true);
    // } catch (error) {
    // } finally {
    //   set_isLoading(false);
    // }
  },
}));

export const chatStore = store;
export type chatStore = typeof store;
export type chatState = state;
