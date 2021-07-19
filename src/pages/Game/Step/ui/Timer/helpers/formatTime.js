const format = (seconds) => (seconds > 9 ? seconds : '0' + seconds);

const formatTime = (time) => `${format(Math.floor(time / 60))}:${format(Math.floor(time % 60))}`;

export { formatTime };
