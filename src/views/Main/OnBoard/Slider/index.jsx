import React, { useState } from 'react';
import {
  Icon28UserAddedOutline,
  Icon56CheckShieldOutline,
  Icon56GestureOutline,
  Icon56NotificationOutline,
} from '@vkontakte/icons';
import { Button, FormItem, Gallery } from '@vkontakte/vkui';

import AppService from '@/services';

import Slide from './Slide';

import styles from './index.module.scss';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Весело',
      icon: <Icon56GestureOutline />,
      text1: 'Alias - весёлая игра для компании из 4 и более человек.',
      text2: 'Разделитесь на команды и соревнуйтесь кто лучше объясняет и угадывает слова!',
    },
    {
      id: 2,
      title: 'Безопасно',
      icon: <Icon56CheckShieldOutline />,
      text1: 'В нашем приложении каждый играет на своём телефоне.',
      text2: 'Это безопасно.',
    },
    {
      id: 3,
      title: 'Конфиденциально',
      icon: <Icon56NotificationOutline />,
      text1: 'А ещё не нужно переживать за уведомления.',
      text2: 'Личное остаётся личным.',
    },
    {
      id: 4,
      title: 'К игре!',
      icon: <Icon28UserAddedOutline />,
      text1: 'Мы хотим показать, кто из ваших друзей уже играет в Alias.',
      text2: 'Для этого приложению нужно ваше разрешение.',
    },
  ];

  const isLastSlide = slideIndex + 1 === slides.length;

  return (
    <>
      <Gallery
        slideIndex={slideIndex}
        onChange={(slideIndex) => setSlideIndex(slideIndex)}
        slideWidth='100%'
        className={styles.gallery}
        bullets='dark'
        align='center'
      >
        {slides.map((slide) => (
          <Slide key={slide.id} {...slide} />
        ))}
      </Gallery>
      <FormItem>
        <Button
          size='l'
          stretched
          onClick={() => {
            if (isLastSlide) {
              AppService.setOnboardingFinished();
              return;
            }
            setSlideIndex((slideIndex + 1) % 4);
          }}
        >
          {isLastSlide ? 'Готово' : 'Далее'}
        </Button>
      </FormItem>
    </>
  );
};

export default Slider;
