import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from '@happysanta/router';
import {
  Icon28UserAddedOutline,
  Icon56CheckShieldOutline,
  Icon56GestureOutline,
  Icon56NotificationOutline,
} from '@vkontakte/icons';
import { Button, FormItem, Gallery, Panel } from '@vkontakte/vkui';

import { Container } from '@/components';
import { PAGE_HOME } from '@/router';
import AppService from '@/services';
import { general } from '@/store';

import { Slide } from './components';

import styles from './Onboarding.module.scss';

const slides = [
  {
    title: 'Весело',
    icon: <Icon56GestureOutline width={100} height={100} style={{ color: 'var(--accent)' }} />,
    paragraphs: [
      'Alias - весёлая игра для компании из 4 и более человек.',
      'Разделитесь на команды и соревнуйтесь кто лучше объясняет и угадывает слова!',
    ],
  },
  {
    title: 'Безопасно',
    icon: <Icon56CheckShieldOutline width={100} height={100} style={{ color: 'var(--accent)' }} />,
    paragraphs: ['В нашем приложении каждый играет на своём телефоне.', 'Это безопасно.'],
  },
  {
    title: 'Конфиденциально',
    icon: <Icon56NotificationOutline width={100} height={100} style={{ color: 'var(--accent)' }} />,
    paragraphs: ['А ещё не нужно переживать за уведомления.', 'Личное остаётся личным.'],
  },
  {
    title: 'К игре!',
    icon: <Icon28UserAddedOutline width={100} height={100} style={{ color: 'var(--accent)' }} />,
    paragraphs: [
      'Мы хотим показать, кто из ваших друзей уже играет в Alias.',
      'Для этого приложению нужно ваше разрешение.',
    ],
  },
];

const Onboarding = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  const count = slides.length;
  const isLast = useMemo(() => index + 1 === count, [index, count]);

  const onNext = () => {
    if (isLast) {
      AppService.getFriendProfiles()
        .then((friends) => {
          dispatch(general.action.setFriends({ friends }));
        })
        .finally(async () => {
          await AppService.setOnboardingFinished();

          router.pushPage(PAGE_HOME);
        });

      return;
    }

    setIndex((index + 1) % count);
  };

  return (
    <Panel {...props}>
      <Container>
        <div className={styles.container}>
          <div className={styles.title}>{slides[index].title}</div>

          <Gallery
            slideIndex={index}
            onChange={(index) => setIndex(index)}
            slideWidth='100%'
            className={styles.gallery}
            bullets='dark'
            align='center'
          >
            {slides.map((slide, index) => (
              <Slide key={index} {...slide} />
            ))}
          </Gallery>
          <FormItem>
            <Button size='l' stretched onClick={onNext}>
              {isLast ? 'Готово' : 'Далее'}
            </Button>
          </FormItem>
        </div>
      </Container>
    </Panel>
  );
};

export { Onboarding };
