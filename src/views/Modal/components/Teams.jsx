import React, { Fragment, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { track } from '@logux/client';
import { useClient } from '@logux/client/react';
import { Icon24Add, Icon24Dismiss } from '@vkontakte/icons';
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
  Spacing,
  usePlatform,
  VKCOM,
  withModalRootContext,
} from '@vkontakte/vkui';

import { notify } from '@/components';
import { room } from '@/store';

import styles from './index.module.scss';

const TeamsComponent = ({ onClose, updateModalHeight, ...props }) => {
  const platform = usePlatform();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.room.teams);
  const roomId = useSelector((state) => state.room.roomId);
  const myTeamId = useSelector((state) => state.room.myTeamId);
  const members = useSelector((state) => state.room.members);
  const [isEditActive, setIsEditActive] = useState(false);
  const client = useClient();

  useLayoutEffect(() => {
    updateModalHeight();
  }, [updateModalHeight, teams]);

  useEffect(() => {
    const teamDelete = client.type(
      room.action.teamDelete.type,
      (_, meta) => {
        track(client, meta.id).catch(({ action }) => {
          notify.error({ message: action.message });
        });
      },
      { event: 'add' },
    );

    return () => {
      teamDelete();
    };
  }, [client]);

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
    [dispatch, isEditActive, roomId, myTeamId],
  );

  const onDelete = (teamId) => {
    // const nextTeams = [...teams.slice(0, index), teams.slice(index + 1)];
    dispatch.sync(room.action.teamDelete({ teamId, roomId }));
  };

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
              {platform === IOS && (
                <PanelHeaderEdit
                  editLabel='Ред.'
                  isActive={isEditActive}
                  onClick={() => setIsEditActive(!isEditActive)}
                />
              )}
            </>
          }
          right={
            <>
              {(platform === ANDROID || platform === VKCOM) && (
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
      <Group>
        <List>
          {teams.map((team) => (
            <Fragment key={team.teamId}>
              <Cell
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
            </Fragment>
          ))}
        </List>
      </Group>

      <div className={styles.info}>
        <Spacing separator size={1} />
        <Div>
          <Button mode='secondary' size='m' stretched before={<Icon24Add />} onClick={onCreate}>
            Добавить команду
          </Button>
        </Div>
      </div>
    </ModalPage>
  );
};

const Teams = withModalRootContext(TeamsComponent);

export { Teams };
