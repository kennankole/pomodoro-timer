import { useEffect, useState } from 'react';

const Pomodoro = () => {
  const [timer, setTimer] = useState(0);
  const [session, setSession] = useState(25);
  const [pomodoros, setPomodoros] = useState(0);
  const [shortBreak, setShortBreak] = useState(false);
  const [onSession, setOnsession] = useState(true);
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

  // Sesssion clock
  useEffect(() => {
    if (timer === 60) {
      setSession((prevState) => prevState - 1);
      setTimer(0);
    }
  }, [timer]);

  // Handle Short break session
  useEffect(() => {
    if (session === 0) {
      if (shortBreak === true) {
        setSession(25);
        setShortBreak(false);
        setOnsession(true);
      }
      if (shortBreak === false) {
        setSession(5);
        setPomodoros((prevState) => prevState + 1);
        setShortBreak(true);
        setOnsession(false);
      }
    }
  }, [session, shortBreak]);

  // Handle long break session
  useEffect(() => {
    if (pomodoros > 3) {
      if (longBreak === false) {
        setSession(15);
        setPomodoros(0);
        setLongBreak(true);
        setShortBreak(false);
        setOnsession(false);
      }
      if (longBreak === true) {
        setSession(25);
        setLongBreak(false);
        setOnsession(true);
      }
    }
  }, [pomodoros, longBreak, shortBreak]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  let content;
  if (longBreak) {
    content = <h3>{longBreak ? 'Taking a long break' : ''}</h3>;
  }
  if (shortBreak) {
    content = <h3>{shortBreak ? 'Taking a short break' : ''}</h3>;
  }
  if (onSession) {
    content = <h3>{onSession ? 'Focus time' : ''}</h3>;
  }
  return (
    <section>
      <div className="pomo-counter">
        <h2 className="pomo-title">Pomodoro Timer</h2>
        <h1 className="pomo-text">
          {session}
          {' '}
          :
          {' '}
          {timer >= 10 ? timer : `${0}${timer}`}
        </h1>
        {content}
        <button type="button" onClick={handleStartStop} className="pomo-btn">
          {isRunning ? 'Stop' : 'Start' }
        </button>
      </div>
    </section>
  );
};
export default Pomodoro;
