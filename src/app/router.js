import { Page, Router } from '@happysanta/router';

import { env } from '@/shared/config';

export const PAGE_HOME = '/';
export const PAGE_ONBOARDING = '/onboarding';
export const PAGE_ROOM = '/room';
export const PAGE_LOBBY = '/lobby';
export const PAGE_STEP = '/step';

export const VIEW_MAIN = 'view_main';
export const VIEW_GAME = 'view_game';

export const PANEL_HOME = 'panel_home';
export const PANEL_ONBOARDING = 'panel_onboarding';
export const PANEL_ROOM = 'panel_room';
export const PANEL_LOBBY = 'panel_lobby';
export const PANEL_STEP = 'panel_step';

export const MODAL_CREATE_ROOM = 'modal_create_room';
export const MODAL_DONUT = 'modal_donut';
export const MODAL_ENTER_CODE = 'modal_enter_code';
export const MODAL_GAME_RESULTS = 'modal_game_results';
export const MODAL_JOIN_GROUP = 'modal_join_group';
export const MODAL_MEMBERS = 'modal_members';
export const MODAL_QR_CODE = 'modal_qr_code';
export const MODAL_ROOM_SETS = 'modal_room_sets';
export const MODAL_RULES = 'modal_rules';
export const MODAL_SETS = 'modal_sets';
export const MODAL_SHARE_CODE = 'modal_share_code';
export const MODAL_TEAMS = 'modal_teams';

export const POPOUT_ROOM_LEAVE = 'popout_room_leave';
export const POPOUT_GAME_LEAVE = 'popout_game_leave';

const routes = {
  [PAGE_HOME]: new Page(PANEL_HOME, VIEW_MAIN),
  [PAGE_ONBOARDING]: new Page(PANEL_ONBOARDING, VIEW_MAIN),

  [PAGE_ROOM]: new Page(PANEL_ROOM, VIEW_GAME),
  [PAGE_LOBBY]: new Page(PANEL_LOBBY, VIEW_GAME),
  [PAGE_STEP]: new Page(PANEL_STEP, VIEW_GAME),
};

export const router = new Router(routes, {
  defaultView: VIEW_MAIN,
  defaultPanel: PANEL_HOME,
  defaultPage: PAGE_HOME,
  enableLogging: env.isDev,
  preventSameLocationChange: true,
});
