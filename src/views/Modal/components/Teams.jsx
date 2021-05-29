import React, { Fragment, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  usePlatform,
  ANDROID,
  VKCOM,
  IOS,
  PanelHeaderEdit,
  PanelHeaderClose,
  ModalPage,
  ModalPageHeader,
  Div,
  List,
  Cell,
  MiniInfoCell,
  Button,
  Spacing,
} from '@vkontakte/vkui';
import { Icon16InfoCirle, Icon24Add, Icon24Dismiss } from '@vkontakte/icons';

import { room } from '../../../store';

import styles from './index.module.scss';

const Teams = ({ onClose, ...props }) => {
  const platform = usePlatform();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.room.teams);
  const roomId = useSelector((state) => state.room.roomId);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const ownerId = useSelector((state) => state.room.ownerId);
  const userId = useSelector((state) => state.general.userId);
  const members = useSelector((state) => state.general.members);
  const [isEditActive, setIsEditActive] = useState(false);

  const onDelete = (teamId) => {
    // const nextTeams = [...teams.slice(0, index), teams.slice(index + 1)];
    dispatch.sync(room.action.teamDelete({ teamId, roomId }));
  };

  const onChange = useCallback(
    (teamId) => {
      if (!isEditActive) {
        if (myTeamId === null) {
          dispatch.sync(room.action.teamJoin({ teamId, roomId }));
        } else if (teamId !== myTeamId) {
          dispatch.sync(room.action.teamLeave({ roomId })).then(() => {
            dispatch.sync(room.action.teamJoin({ teamId, roomId }));
          });
        }
      }
    },
    [isEditActive, roomId, myTeamId, dispatch],
  );

  const onCreate = () => {
    dispatch.sync(room.action.teamCreate({ roomId }));
  };

  const getFirstNames = (teamId) => {
    const team = teams.find((team) => team.teamId === teamId);

    const teamMembers = members.filter((member) => team?.memberIds.includes(member.id));

    return `${teamMembers.reduce((acc, { first_name }, index) => `${acc}${index === 0 ? '' : ', '}${first_name}`, '')}`;
  };

  return (
    <ModalPage
      {...props}
      onClose={onClose}
      header={
        <ModalPageHeader
          left={
            <>
              {(platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderClose onClick={onClose}>Закрыть</PanelHeaderClose>
              )}
              {platform === IOS && ownerId === userId && (
                <PanelHeaderEdit
                  editLabel='Редак.'
                  isActive={isEditActive}
                  onClick={() => setIsEditActive(!isEditActive)}
                />
              )}
            </>
          }
          right={
            <>
              {(platform === ANDROID || platform === VKCOM) && ownerId === userId && (
                <PanelHeaderEdit isActive={isEditActive} onClick={() => setIsEditActive(!isEditActive)} />
              )}
              {platform === IOS && (
                <PanelHeaderClose onClick={onClose}>
                  <Icon24Dismiss />
                </PanelHeaderClose>
              )}
            </>
          }
        >
          Выбор команды
        </ModalPageHeader>
      }
    >
      <div className={styles.info}>
        <MiniInfoCell before={<Icon16InfoCirle />} textLevel='secondary' textWrap='full'>
          Для начала нужно 4 и более участников. После начала игры присоединиться новым участникам будет нельзя.
        </MiniInfoCell>
        <Spacing separator size={12} />

        <Div>
          <Button mode='secondary' size='m' stretched before={<Icon24Add />} onClick={() => onCreate()}>
            Добавить команду
          </Button>
        </Div>
      </div>

      <List>
        <div className={styles.teams}>
          {teams.map((team) => (
            <Fragment key={team.teamId}>
              <Cell
                name={team.name}
                checked={team.teamId === myTeamId}
                selectable={!isEditActive}
                removable={isEditActive}
                description={getFirstNames(team.teamId)}
                onRemove={() => onDelete(team.teamId)}
                onChange={() => onChange(team.teamId)}
              >
                {team.name}
              </Cell>
            </Fragment>
          ))}
        </div>
      </List>
    </ModalPage>
  );
};

export { Teams };
