const format = (seconds) => (seconds > 9 ? seconds : '0' + seconds);

const formatTime = (currentTime) => `${format(Math.floor(currentTime / 60))}:${format(Math.floor(currentTime % 60))}`;

export { formatTime };
