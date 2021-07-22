import { defineAction } from '@logux/actions';

const activateSet = defineAction('room/activate_game_dataset');
const deactivateSet = defineAction('room/deactivate_game_dataset');

export const actions = {
  activateSet,
  deactivateSet,
};
