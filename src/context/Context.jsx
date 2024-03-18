import runChat from "../config/gemini";
import { createContext, useState } from "react";


export const Context = createContext();

const ContextProvider = (props) => {

    const[input, setInput] = useState(""); //get the data from the user
    const[recentPrompt, setRecentPrompt] = useState(""); //input button save to the recent prompt
    const[prevPrompt, setPrevPrompt] = useState([]); //it will store the data in side bar
    const[showResult, setShowResult] = useState(false); //hide the grid text display the result
    const[loading, setLoading] = useState(false); //loading the data 
    const[resultData, setResultData] = useState("") //display the result

    const delayPara = (index, nextWord) => {
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await onSent(prompt);
            setRecentPrompt(prompt)
        }else{
            setPrevPrompt(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0; i < responseArray.length; i++)
        {
            if(i===0 || i%2 !== 1){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br/>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i < newResponseArray.length; i++){
            const newWord = newResponseArray[i]
            delayPara(i, newWord+" ")
        }
        setLoading(false)
        setInput("")
    }


    const contextValue  = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;