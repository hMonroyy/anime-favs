import React, { useState } from 'react';
import { useGlobalContext } from '../../Contexts/GlobalContext';
import Popular from '../Pages/Popular/Popular';
import Upcoming from '../Pages/Upcoming/Upcoming';
import Airing from '../Pages/Airing/Airing';
import logo from '../../img/animeFAVS-logo.png';
import style from './Header.module.scss';

// Icons
import SearchIcon from '@mui/icons-material/Search';


function Header() {
    const {
        handleChange,
        handleSubmit,
        search,
        searchAnime,
        getUpcomingAnime,
        getAiringAnime,
        getPopularAnime,
    } = useGlobalContext();
    const [rendered, setRender] = useState('popular');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const switchComponent = () => {
        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            default:
                return <Popular rendered={rendered} />;
        }
    };

    const handleMenuButtonClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className={style['header']}>
                <div className={style['logo']}>
                   {/*  <h1>{rendered === 'popular' ? 'Popular Anime' : rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}</h1> */}
                   <img src={logo} alt="AnimeFavs" className={style['img-logo']} />
                </div>
                <div className={style['search-container']}>
                    <form action="" className={`${style['search-form']} ${style['group']} ${isMenuOpen ? style['hidden'] : ''}`} onSubmit={handleSubmit}>
                        <input type="text" id="search-box" placeholder="Search anime" value={search} onChange={handleChange} />
                        <button type='submit' className={style['submit-icon']}><SearchIcon /></button>
                    </form>
                </div>
                <div className={style['buttons-container']}>
                    <a href="#" className={style['menu-button']} onClick={handleMenuButtonClick}>Menu</a>
                    <div className={`${style['filter-btn']} ${isMenuOpen ? style['open'] : ''}`}>
                        <li className={style['nav-item']}>
                            <a className={style['nav-link']} href="#" onClick={() => { setRender('popular'); getPopularAnime(); }}>Popular</a>
                        </li>
                        <li className={style['nav-item']}>
                            <a className={style['nav-link']} href="#" onClick={() => { setRender('airing'); getAiringAnime(); }}>Airing</a>
                        </li>
                        <li className={style['nav-item']}>
                            <a className={style['nav-link']} href="#" onClick={() => { setRender('upcoming'); getUpcomingAnime(); }}>Upcoming</a>
                        </li>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </>
    );
}

export default Header;
