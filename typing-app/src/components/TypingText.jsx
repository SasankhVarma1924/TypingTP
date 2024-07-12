import React, {useState, useRef, useEffect} from "react"
import "./style.css";
import restartImage from '../assets/restart.png';

// shuffle array
function shuffleArray(array) 
{
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) 
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

// words
var words = "some her would make like him into time has look two more write go see number no way could people my than first water been call who oil its now find long down day did get come made may part ".split(' ')
words = shuffleArray(words);

function TypingText()
{
  let newLetters = (words.join(" ") + " ").split('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [letters, setLetters] = useState(newLetters);
  const textRef = useRef(null);
  const restartButtonRef = useRef(null);
  const lettersRefs = useRef({});
  const [textCursorPosition, setTextCursorPosition] = useState({top : 248, left : 120});
  const time = useRef(15);
  const [timer, setTimer] = useState(time.current);
  const [stop, setStop] = useState(true);
  const WPMRef = useRef(null);
  const cursorRef = useRef(null);
  const [correct, setCorrect] = useState(0);
  const timerButtonRefs = useRef({});

  // handling different timestamps
  useEffect(() =>
  {
    const timer15 = () =>
    {
      setTimer(15);
      time.current = 15;
      restartButtonRef.current.click();
      timerButtonRefs.current[0].blur();
    }
    const timer30 = () =>
    {
      setTimer(30);
      time.current = 30;
      restartButtonRef.current.click();
      timerButtonRefs.current[1].blur();
    }
    const timer60 = () =>
    {
      setTimer(60);
      time.current = 60;
      restartButtonRef.current.click();
      timerButtonRefs.current[2].blur();
    }
    timerButtonRefs.current[0].addEventListener("click", timer15);
    timerButtonRefs.current[1].addEventListener("click", timer30);
    timerButtonRefs.current[2].addEventListener("click", timer60);
    
    return ()=>
    {
      timerButtonRefs.current[0].removeEventListener("click", timer15);
      timerButtonRefs.current[1].removeEventListener("click", timer30);
      timerButtonRefs.current[2].removeEventListener("click", timer60);
    }
  }, [timerButtonRefs])

  // timer countdown
  useEffect(() =>
  {
    let interval;
    if(stop === false && timer > 0)
    {
      interval = setInterval(() =>
      {
        setTimer(t => t - 1);
      }, 1000);
    }
    else if(timer === 0)
    {
      // calculating wpm
      let timeTaken = time.current / 60;
      let wpm = ((correct / 5) / timeTaken).toFixed(1);
      WPMRef.current.innerHTML = `WPM : ${wpm}`;
      setStop(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, stop]);

  // to start the timer when the first key is pressed
  useEffect(() =>
  {
    const handleKeyDown1 = (event)=>
    {
      if(timer > 0)
      {
        setStop(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown1);
    return () => window.removeEventListener("keydown", handleKeyDown1);
  }, [stop, restartButtonRef, timer]);

  // handling both input and validating the entered text
  useEffect(() =>
  {
    const handleKeyDown = (event) =>
    {
      if(timer > 0 && currentIndex + 1 < letters.length)
      {
        const key = event.key
        const letter = lettersRefs.current[currentIndex + 1].textContent;
        if (/^[a-zA-Z\s]$/.test(key) || key === "Backspace")
        {
          if(key === "Backspace")
          {
            if(currentIndex >= 0)
            {
              if(lettersRefs.current[currentIndex].name === "correct")
              {
                setCorrect(c => c - 1);
              }
              lettersRefs.current[currentIndex].style.borderBottom = "none"
              lettersRefs.current[currentIndex].style.borderBottomColor = "none";
              lettersRefs.current[currentIndex].style.color = "hsl(0, 0%, 44%)";
              lettersRefs.current[currentIndex].name = "none";
              setCurrentIndex(i => i - 1);
            }
          }
          else if(key === letter)
          {
            lettersRefs.current[currentIndex + 1].name = "correct";
            lettersRefs.current[currentIndex + 1].style.color = "#F4CE14";
            setCurrentIndex(i => i + 1);
            setCorrect(c => c + 1);
          }
          else if(key !== letter)
          {
            if(letter !== ' ')
            {
              lettersRefs.current[currentIndex + 1].style.color = "#ff0000";
            }
            else
            {
              lettersRefs.current[currentIndex + 1].style.borderBottom = "2px solid"
              lettersRefs.current[currentIndex + 1].style.borderBottomColor = "red";
            }
            setCurrentIndex(i => i + 1);
          }
        }
      }
    }
    
    window.addEventListener("keydown", handleKeyDown);

    return () => 
    {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentIndex, timer]);

  // getting the position of the current character in the window 
  useEffect(() =>
  {
    if(lettersRefs.current[currentIndex + 1])
    {
      const rect = lettersRefs.current[currentIndex + 1].getBoundingClientRect();
      setTextCursorPosition({top : rect.top, left : rect.left});
    }
  }, [currentIndex]);

  // handling the restart button
  useEffect(() => 
  {
    const hadleResartButton = (event) =>
    {
      words = shuffleArray(words);
      let newLetters = (words.join(" ") + " ").split('');
      resetLetterStyles();
      setLetters(newLetters)
      setCurrentIndex(-1);
      restartButtonRef.current.blur();
      textRef.current.focus();
      setTimer(time.current);
      setCorrect(0);
      setStop(true);
    }
    restartButtonRef.current.addEventListener("click", hadleResartButton);

    return () => 
    {
      restartButtonRef.current.removeEventListener("click", hadleResartButton);
    }
  }, [restartButtonRef]);

  // reseting the span elements with default attributes
  const resetLetterStyles = () =>
  {
    Object.values(lettersRefs.current).forEach(letter => 
    {
      letter.style.color = "hsl(0, 0%, 44%)";
      letter.style.borderBottom = "none"
      letter.style.borderBottomColor = "none";
    })
  }

  return (
    <>

      <div style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"5em"}}>
        <div className="changeTimer">
          <button className="changeTimerButtons" ref={r => (timerButtonRefs.current[0] = r)}>15</button>
          <button className="changeTimerButtons" ref={r => (timerButtonRefs.current[1] = r)}>30</button>
          <button className="changeTimerButtons" ref={r => (timerButtonRefs.current[2] = r)}>60</button>
        </div>
      </div>

      <span className="cursor" style={
        { 
          transform: `translate(${textCursorPosition.left - 1}px, ${textCursorPosition.top}px)`
        }
      } ref={cursorRef}></span>

      <span  style={{color: "white", fontSize : "2.5em", fontFamily: "monospace", paddingLeft: "3.5em", display: "block"}}>{timer}</span>
      
      <div ref = {textRef} className="textContainer">
        {
          letters.map((c, index) =>
            {
              return <span className="displaytext"
              key = {index} 
              ref = {letter => (lettersRefs.current[index] = letter)}>
            {c}</span>
          })
        }  
      </div>

      <br />

      <button ref ={restartButtonRef} className="restartButton"><img src={restartImage} className="restartImage" alt="restartimg" width="40px"/></button>
      <h1 className="WPM" ref={WPMRef}>WPM : --</h1>
    </>
  );
}

export default TypingText;