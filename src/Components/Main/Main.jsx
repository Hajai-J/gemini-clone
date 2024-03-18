import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

const year = new Date()

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="usericon" />
      </div>
      <div className="main-container">
        {!showResult ? 
          <>
            <div className="greet">
              <p>
                <span>Hello Dev.</span>
              </p>
              <p>How I Can Help You Today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beatuiful places to see on an upcoming road map</p>
                <img src={assets.compass_icon} alt="compassicon" />
              </div>
              <div className="card">
                <p>Breifly summarize this concept:Urban planning</p>
                <img src={assets.bulb_icon} alt="bulbicon" />
              </div>
              <div className="card">
                <p>Brainstorm team bond activities for our work retreat</p>
                <img src={assets.message_icon} alt="messageicon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code </p>
                <img src={assets.code_icon} alt="codeicon" />
              </div>
            </div>
          </>
         : 
          <div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="usericon" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="gemini_icon" />
                    {loading?
                    <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                   
                    :
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
                </div>
          </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a Prompt here"
            />
            <div>
              {/* <img src={assets.gallery_icon} alt="" /> */}
              {input ? <img src={assets.mic_icon} alt="" />:null}
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
          © {year.getFullYear()}. All rights reserved by Hajai❤️️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
