import { useEffect, useState } from 'react';

const Pomodoro = () => {
  const [timer, setTimer] = useState(0);
  const [session, setSession] = useState(10);
  const [pomodoros, setPomodoros] = useState(0);
  const [shortBreak, setShortBreak] = useState(false);
  const [longBreak, setLongBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // set up the clock
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevState) => prevState + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timer === 2) {
      setSession((prevState) => prevState - 1);
      setTimer(0);
    }
  }, [timer]);

  useEffect(() => {
    if (session === 0) {
      if (shortBreak === true) {
        setSession(10);
        setShortBreak(false);
      }
      if (shortBreak === false) {
        setSession(5);
        setPomodoros((prevState) => prevState + 1);
        setShortBreak(true);
      }
    }
  }, [session, shortBreak]);

  useEffect(() => {
    if (pomodoros > 3) {
      if (longBreak === false) {
        setSession(15);
        setPomodoros(0);
        setLongBreak(true);
      }
      if (longBreak === true) {
        setSession(10);
        setLongBreak(false);
      }
    }
  }, [pomodoros, longBreak]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  return (
    <section>
      <h4>
        Hello there
        {' '}
        {pomodoros}
      </h4>
      <h5>
        {session}
        {' '}
        :
        {' '}
        {timer >= 10 ? timer : `${0}${timer}`}
      </h5>
      <p>{shortBreak ? 'Taking a short break' : ''}</p>
      <button type="button" onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start' }
      </button>
    </section>
  );
};
export default Pomodoro;
