import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { Icon24Add } from '@vkontakte/icons';
import {
  ANDROID,
  Button,
  Cell,
  Div,
  Group,
  IOS,
  List,
  ModalPage,
  ModalPageHeader,
  PanelHeaderClose,
  PanelHeaderEdit,
  PanelHeaderSubmit,
  Spacing,
  usePlatform,
  VKCOM,
  withModalRootContext,
} from '@vkontakte/vkui';

import { Notification } from '@/shared/ui';
import { room } from '@/store';

import styles from './index.module.scss';

const TeamsComponent = ({ onClose, updateModalHeight, ...props }) => {
  const platform = usePlatform();
  const client = useClient();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.general.userId);
  const teams = useSelector((state) => state.room.teams);
  const teamsList = useSelector((state) => state.room.teamsList);
  const roomId = useSelector((state) => state.room.roomId);
  const members = useSelector((state) => state.room.members);

  const [isEditActive, setIsEditActive] = useState(false);

  const myTeamId = useMemo(
    () => teams.find((team) => team.memberIds.includes(userId))?.teamId ?? null,
    [teams, userId],
  );

  useLayoutEffect(() => {
    updateModalHeight();
  }, [updateModalHeight, teams]);

  useEffect(() => {
    const teamDelete = client.type(
      room.action.teamDelete.type,
      (_, meta) => {
        track(client, meta.id).catch(({ action }) => {
          toast.error(<Notification message={action.message} type='error' />, {
            position: toast.POSITION.BOTTOM_CENTER,
            toastId: 'team-delete',
            newestOnTop: false,
          });
        });
      },
      { event: 'add' },
    );

    return () => {
      teamDelete();
    };
  }, [client]);

  const onChange = (teamId) => {
    if (!isEditActive) {
      const newTeams = teams.slice();

      newTeams.forEach((team) => {
        if (team.memberIds.includes(userId)) {
          team.memberIds = team.memberIds.filter((memberId) => memberId !== userId);
        }

        if (team.teamId === teamId) {
          team.memberIds.push(userId);
        }
      });

      dispatch.sync(room.action.teamChange({ teams: newTeams }));
    }
  };

  const onDelete = (teamId) => {
    // const nextTeams = [...teams.slice(0, index), teams.slice(index + 1)];
    dispatch.sync(room.action.teamDelete({ teamId, roomId }));
  };

  const onCreate = () => {
    dispatch.sync(room.action.teamCreate({ roomId }));
  };

  const getFirstNames = (teamId) => {
    const team = teamsList[teamId];
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
              {platform === IOS && (
                <PanelHeaderEdit
                  editLabel='Редак.'
                  doneLabel='Принять'
                  isActive={isEditActive}
                  onClick={() => setIsEditActive(!isEditActive)}
                  style={{ minWidth: 78, width: 78 }}
                />
              )}
            </>
          }
          right={
            <>
              {(platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderEdit isActive={isEditActive} onClick={() => setIsEditActive(!isEditActive)} />
              )}
              {platform === IOS && <PanelHeaderSubmit onClick={onClose}>Закрыть</PanelHeaderSubmit>}
            </>
          }
        >
          Команды
        </ModalPageHeader>
      }
    >
      <Group>
        <List>
          {teams.map((team) => (
            <Cell
              key={team.teamId}
              name={team.name}
              checked={team.teamId === myTeamId}
              selectable={!isEditActive}
              removable={isEditActive}
              description={getFirstNames(team.teamId)}
              onRemove={() => onDelete(team.teamId)}
              onClick={() => onChange(team.teamId)}
              // просто хак, потому как кто-то в ВК решил использовать onClick, а не дефолтный onChange
              onChange={() => {}}
            >
              {team.name}
            </Cell>
          ))}
        </List>
      </Group>

      <div className={styles.bottomSticky}>
        <Spacing separator size={1} />
        <Div>
          {teams.length < 10 && (
            <>
              <Button mode='secondary' size='l' stretched before={<Icon24Add />} onClick={onCreate}>
                Добавить команду
              </Button>
              <Spacing />
            </>
          )}
          <Button mode='primary' disabled={!myTeamId} size='l' stretched onClick={onClose}>
            Готово
          </Button>
        </Div>
      </div>
    </ModalPage>
  );
};

const Teams = withModalRootContext(TeamsComponent);

export { Teams };
