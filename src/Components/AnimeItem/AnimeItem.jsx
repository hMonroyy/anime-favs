import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from './AnimeItem.module.scss'

function AnimeItem() {

    const {id} = useParams();

    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    // Get anime based on name
    const getAnime = async (anime) => {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await res.json();
        setAnime(data.data);
    }

    // Get characters based on anime
    const getCharacters = async (anime) => {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await res.json();
        setCharacters(data.data);
    }

    // Get items from anime
    const { title, episodes, synopsis, status, source, demographics, score, images, trailer, genres, themes, season, } = anime;

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    }, []);

    return (
        <div className={style['anime-info']}>
            <div className={style['anime-card']}>
                <div className={style['anime-poster-wrapper']}>
                    <div className={style['anime-poster']}>
                        <img src={images?.jpg.large_image_url} alt="anime-poster" />
                        <div className={style['release-date']}>
                            <p>Score</p>
                            <div className={style['divider']}></div>
                            <h3>{score}</h3>
                        </div>
                    </div>
                </div>
                <div className={style['anime-info']}>
                    <div className={style['header-section']}>
                        <h1>{title}</h1>
                        <p>
                            {demographics?.map((demo, index) => (
                                <span key={index}>
                                    {demo.name} /
                                </span>
                            ))}
                            {' '}
                            {themes?.map((theme, index) => (
                                <span key={index}>
                                    {theme.name}{index < themes.length - 1 ? ' / ' : ''}
                                </span>
                            ))}
                        </p>
                        
                        <div className={style['extra']}>
                            <p><strong>Episodes:</strong> {episodes}</p>
                            <p><strong>Status:</strong> {status}</p>
                            <p><strong>Source:</strong> {source}</p>
                            <p><strong>Season: </strong>{season}</p>
                        </div>
                    </div>
                    <div className={style['genre-section']}>
                        <h3>GENRE</h3>
                        <div className={style['genre-container']}>
                            <div>
                                {genres?.map((genre, index) => (
                                <div key={index} className={style['genre-tag']}>
                                    {genre.name}
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={style['synopsis-section']}>
                        <h3>SYNOPSIS</h3>
                        <p>
                            {showMore ? synopsis : synopsis?.substring(0, 350) + '...'}
                            <button 
                                onClick={() => setShowMore(!showMore)}
                                className={style['showMoreButton']}
                            >
                                {showMore ? 'Show Less' : 'Show More'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div className={style['anime-trailer']}>
                <h2>TRAILER</h2>
                <div className="trailer-con">
                    {trailer?.embed_url &&
                        <iframe
                            src={`${trailer?.embed_url}?autoplay=0`}
                            title={title}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    }
                </div>
            </div>
            <div className={style['anime-characters']}>
                <h2>CHARACTERS</h2>
                <div className={style['anime-characters-container']}>
                    {characters?.map((character, index) => {
                        const { role } = character;
                        const { images, name, mal_id } = character.character;
                        return <Link to={`/character/${mal_id}/${name}`} key={index}>
                            <div className={style['anime-character-card']}>
                                <img src={images?.jpg.image_url} alt="character" />
                                <div className={style['anime-character-container-info']}>
                                    <h3><b>{name}</b></h3> 
                                    <p>{role}</p> 
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        </div>
    )
}

export default AnimeItem