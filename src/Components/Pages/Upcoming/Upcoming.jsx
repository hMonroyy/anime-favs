import React from 'react'
import { useGlobalContext } from '../../../Contexts/GlobalContext'
import { Link } from 'react-router-dom';
import style from '../Pages.module.scss'

// Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import StarIcon from '@mui/icons-material/Star';

function Upcoming({rendered}) {
  const {upcomingAnime, isSearch, searchResults} = useGlobalContext();
  const conditionalRender = () => {
    if (!isSearch && rendered === 'upcoming') {
      return upcomingAnime.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}/${anime.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s/g, '-')}`} key={anime.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s/g, '-')}>
            <div className={style['card-item']}>
              <img
                className={style['card-item__img']}
                src={anime.images.webp.large_image_url}
                alt={anime.title}
              />
              <div className={style['card-item__gradient']}></div>
              <div className={style['card-item__details']}>
                <div className={style.controls}>
                  <span><FavoriteBorderIcon /></span>
                  <span><WatchLaterIcon /></span>
                </div>
                <h3 className={style['card-item__details--title']}>{anime.title}</h3>
                <h5 className={style['card-item__details--score']}>
                  <span className={style['card-item__details--score-icon']}><StarIcon /></span>{anime.score} / 10
                </h5>
              </div>
            </div>
          </Link>      
      })
    } else {
      return searchResults.map((anime) => {
        return <Link to={`/anime/${anime.mal_id}/${anime.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s/g, '-')}`} key={anime.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s/g, '-')}>
            <div className={style['card-item']}>
              <img
                className={style['card-item__img']}
                src={anime.images.webp.large_image_url}
                alt={anime.title}
              />
              <div className={style['card-item__gradient']}></div>
              <div className={style['card-item__details']}>
                <div className={style.controls}>
                  <span><FavoriteBorderIcon /></span>
                  <span><WatchLaterIcon /></span>
                </div>
                <h3 className={style['card-item__details--title']}>{anime.title}</h3>
                <h5 className={style['card-item__details--score']}>
                  <span className={style['card-item__details--score-icon']}><StarIcon /></span>{anime.score} / 10
                </h5>
              </div>
            </div>
          </Link>      
      })
    }
  }
  
  return (
    <div className={style['page-container-anime']}>
      {conditionalRender()}
    </div>
  )
}

export default Upcoming