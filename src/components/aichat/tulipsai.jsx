import React, { useState, useEffect } from "react";
import "./tulipsai.scss";

//data
import prompts from "./data.js";

//recoil
import { useRecoilState } from "recoil";
import { ErrorList } from "../../atom";
import { Warning, CRoomWarning, CRoomError } from "../../atom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const API_KEY = "My API KEY";

function Tulipsai() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorList, setErrorList] = useRecoilState(ErrorList);
  const [warning, setWarning] = useRecoilState(Warning);
  const [CRoomWarningStorage , setCRoomWarning] = useRecoilState(CRoomWarning);
  const [CRoomErrorStorage, setCRoomError] = useRecoilState(CRoomError);
  const [shouldSpeak, setShouldSpeak] = useState(false);
  const { transcript, resetTranscript, startListening, stopListening } =
    useSpeechRecognition();
  const [listening, setListening] = useState(false);
  const [test, setTest] = useState(1);
  const [addInfo, setAddInfo] = useState("");
  const [training, setTraining] = useState(false);

  const listeningRef = React.useRef(listening);

  useEffect(() => {
    listeningRef.current = listening;
  }, [listening]);

  useEffect(() => {
    if (listeningRef.current) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }, [startListening, stopListening]);

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  // useEffect(() => {
  //   const recognitionTimer = setTimeout(() => {
  //     if (listeningRef.current) {
  //       resetTranscript();
  //       SpeechRecognition.startListening();
  //     }
  //   }, 4000);

  //   return () => {
  //     clearTimeout(recognitionTimer);
  //   };
  // }, [resetTranscript, startListening]);

  const handleStartListening = () => {
    setListening(true);
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const continueListening = () => {
    SpeechRecognition.startListening();
  };

  const handleStopListening = () => {
    setListening(false);
  };

  const systemMessage = {
    role: "system",
    content: `you are an AI assistant called STAR you will be present with astronauts on a spaceship and you should provide with help you should never ever answer any question that is not related to the situation or stupid questions you will act as a documentation assistant.\n\nyou will receive a spaceship error in the form of "Error: "error type"" and when receiving this message you should replay with an alert starting with an "Alert" to the astronaut. also you will receive warnings in the form of "Warning: "warning type"" and when receiving this message you should replay with a warning starting with an "Warning" to the astronaut. additional information to be used to help astronauts ${addInfo} . \n\nyou should never ever answer any question that is not related to the situation or stupid questions you will act as a documentation assistant. ship status: we have ${warning} warnings and ${errorList} errors. the test number is ${test}.`,
  };

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].sender === "user"
    ) {
      setIsTyping(true);
      processMessageToChatGPT(messages);
    }
  }, [messages]);

  const speak = (ok) => {
    if (!shouldSpeak) return;
    const utterance = new SpeechSynthesisUtterance(ok);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    console.log(messages);
    console.log(messages[messages.length - 1]);
    if (errorList.length > 0) {
      const newMessage = {
        message: "Error: " + errorList,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
    } else if (warning.length > 0) {
      const newMessage = {
        message: "warning: " + warning,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
    }
    if(errorList.length > 0){
      setCRoomError(errorList);
    }
    if(warning.length > 0){
      setCRoomWarning(warning);
    }
    
  }, [errorList, warning]);

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      return {
        role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
        content: messageObject.message,
      };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo-16k",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
        speak(data.choices[0].message.content);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setIsTyping(false);
    }
  }

  const handleSend = () => {
    for (const prompt of prompts) {
      const promptWords = prompt.title.split(" ");
      const userWords = inputValue.split(" ");

      const matches = promptWords.filter((promptWord) =>
        userWords.includes(promptWord)
      );

      if (matches.length > 0) {
        if (matches.length === promptWords.length) {
          console.log(
            "The prompt contains all the words in the user input:",
            prompt.title
          );
          setAddInfo(prompt.prompt);
          break;
        } else {
          console.log(
            "The prompt contains some of the words in the user input:",
            prompt.title
          );
          setAddInfo(prompt.prompt);
          break;
        }
      } else {
        console.log(
          "The prompt does not contain any of the words in the user input:",
          prompt.title
        );
      }
    }
    setTest(test + 1);
    if (inputValue.trim() !== "") {
      const newMessage = {
        message: inputValue,
        sender: "user",
      };

      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const setTrainingtoFalse = () => {
    setTimeout(() => {
      setTraining(false);
    }, 5000);
  };

  return (
    <div className="ChatContainer">
      {training ? <div className="training">Training...</div> : null}
      <div className="chat-container">
        <h1>Star AI</h1>
        <div className="SpeechToText">
          <button onClick={handleStartListening}>
            <i className="fas fa-microphone"></i>
          </button>
          <button onClick={continueListening}>
            <i className="fas fa-play"></i>
          </button>
          <button onClick={handleStopListening}>
            <i className="fas fa-microphone-slash"></i>
          </button>
        </div>
        <center>
          <h4>Text To Speech</h4>
        </center>
        <center>
          <button
            onClick={() => {
              setShouldSpeak(!shouldSpeak);
            }}
            className="ButtonForVolume"
          >
            {shouldSpeak ? (
              <i className="fas fa-volume-up"></i>
            ) : (
              <i className="fas fa-volume-mute"></i>
            )}
          </button>
        </center>

        <div className="message-list">
          {messages.map((message, i) => (
            <div key={i} className={`message ${message.sender}`}>
              {message.message.startsWith("Alert") ? (
                <div className="alert">{message.message}</div>
              ) : message.message.startsWith("Warning") ? (
                <div className="warning">{message.message}</div>
              ) : (
                <div>{message.message}</div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="message assistant typing">
              Star AI is Thinking...
            </div>
          )}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type message here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
          >
            Send
          </button>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              setTraining(true);
              setTrainingtoFalse();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Tulipsai;
