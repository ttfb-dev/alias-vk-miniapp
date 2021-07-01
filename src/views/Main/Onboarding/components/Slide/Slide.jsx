import React from 'react';
import { Div, Text } from '@vkontakte/vkui';

import styles from './Slide.module.scss';

const Slide = ({ icon, paragraphs }) => {
  return (
    <Div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>{icon}</div>

        <div className={styles.paragraphs}>
          {!!paragraphs?.length &&
            paragraphs.map((paragraph, index) => (
              <Text key={index} weight='regular' className={styles.text}>
                {paragraph}
              </Text>
            ))}
        </div>
      </div>
    </Div>
  );
};

export { Slide };
