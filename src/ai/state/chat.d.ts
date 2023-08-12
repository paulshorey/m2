/**************************************************************************************************
 * NOTE: This file is largely for documentation, as well as type definition.
 *
 * Types conversationId | systemId | userId | assistantId are all strings,
 * but they are given different types to make it easier to understand the code.
 *
 * Hover over each type during implementation to read its description.
 *************************************************************************************************/
import { type } from 'os';

export type messenger = 'user' | 'assistant' | 'system';
/**
 * Messages are the same type for all messengers. Always strings.
 * In `state.dict`, they are stored as a dictionary by id.
 */
export type message = string;
/**
 * This is a reference not to a system/user/assistant message, which are reusable, but to a conversation,
 * which is one unique instance in time of a system prompt, user messages, and assistant responses.
 */
export type conversationId = string;
/**
 * This is a reference to both the system prompt and the last settings used with it.
 * Get system prompt by `state.dict.system[systemId]`, get settings by `state.dict.settings[systemId]`.
 */
export type systemId = string;
/**
 * Linked to system prompt. Uses the same `systemId` as the system prompt.
 */
export type systemSettings = {
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  stop: string;
};
/**
 * Recall a user prompt by id (`state.dict.user[userId]`).
 */
export type userId = string;
/**
 * Recall an assistant response by id (`state.dict.assistant[userId]`).
 */
export type assistantId = string;
/**
 * Both the keys and values in `state.hist` are references to values in `state.dict`.
 * Use `state.hist` to build the navigation tree UI.
 * Use `state.dict` to build the conversation for the selected system prompt.
 */
export type state = {
  /**
   * History of conversations, ordered by last updated. Stores each usage of a message, by unique id:
   * ```{ conversationId: { systemId: { userId: assistantId } }```
   *
   * Only the IDs are stored in this object. The messages themselves are stored in the values object.
   * IDs should ideally be semantic, used as the short title/label in the side menu navigation links.
   *
   * Empty strings `''` are valid. Each is an id, a reference by key to a value in the values object.
   * The user will not be allowed to submit empty strings as messages, so these are used as defaults.
   * Empty strings should not be rendered in the side menu navigation, but used only as default keys.
   */
  conversations: Record<
    conversationId,
    Record<systemId, Record<userId, assistantId>>
  >;
  /**
   * Dictionary of all message values. Each message is stored only once by its unique id. Not sorted.
   * `state.hist` references this object by id, to build the navigation tree UI, and conversation UI.
   * Each id can be referenced multiple times. But each value is unique, is stored in here only once.
   */
  dictionary: {
    settings: Record<systemId, systemSettings>;
    system: Record<systemId, message>;
    user: Record<userId, message>;
    assistant: Record<assistantId, message>;
  };
  /**
   * The prompt currently being edited by the user, or the assistant response blob being streamed.
   * Before it is saved to `state.hist` and `state.dict`, it's stored here as a temporary value.
   * User can only edit one at a time anyway. So, `onBlur` save the edited message to store.
   */
  edit: {
    messenger: messenger;
    message: message;
    systemId: systemId;
    userId: userId;
    assistantId: assistantId;
    conversationId: conversationId;
  };
  editSettings: systemSettings;
  defaultSettings: systemSettings;
};
