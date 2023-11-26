import React, { useEffect, useReducer } from 'react'
import { VideoGameReducer } from '../reducers/VideoGameReducer';
const init = () => {
    return JSON.parse(localStorage.getItem("videogames")) || [];
}
export const VideoGamesComponet = () => {
    const [videogames, dispatch] = useReducer(VideoGameReducer, [], init);
    const getFormData = (e) => {
        e.preventDefault();
        let videogame = {
            "id": new Date().getTime(),
            "title": e.target.title.value,
            "description": e.target.description.value
        };
        const action = {
            type: "create",
            payload: videogame
        };
        dispatch(action);
    }

    useEffect(() => {
        localStorage.setItem("videogames", JSON.stringify(videogames));
    }, [videogames]);
    const deleteVideoGame = (index) => {
        const action = {
            type: "delete",
            index: index
        };
        dispatch(action);
    }
    const edit = (e, index) =>{        
        const action = {
            type: "edit",
            index: index,
            newTitle: e.target.value
        };
        dispatch(action);
    }
    return (
        <>
            {videogames.length > 0 && (
                <div>
                    <h1>This are my videogames</h1>
                    <p>Number of video games: {videogames.length}</p>
                    <ul>
                        {videogames.map((videogame, index) => {
                            return <li key={index}>{videogame.title} &nbsp; <button onClick={() => deleteVideoGame(videogame.id)}>X</button>&nbsp;<input type='text' onBlur={(e)=>edit(e, index)} /></li>
                        })}
                    </ul>
                </div>
            )}
            <h2>Add videogame</h2>
            <form onSubmit={getFormData}>
                <input type='text' name='title' placeholder='Title' />
                <textarea name='description' placeholder='Description'></textarea>
                <input type='submit' value={'Save'} />
            </form>
        </>
    )
}
