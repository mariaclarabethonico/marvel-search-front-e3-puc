import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { verifyUser } from '../utils/localstorage';
import { getFavoriteByUserId, deleteFavorite } from '../service/nativeAPIRequest';
import Menu from '../components/Menu';
import Loading from '../components/Loading';
import '../styles/pages.css';

export default function Favorite() {
  const [favorite, setFavorite] = useState("You don't hav favorite!");
  const [att, setAtt] = useState({});
  const [id_user, setId] = useState('');
  const [loading, setLoading] = useState(true)
  const history = useHistory();

  const verifyTipyOfFavorite = (fav) => {
    if (fav.related === 'comics') return `/characters/${fav.id_favorite}`;
    return `/comics/${fav.id_favorite}`;
  }

  useEffect(() => {
    const { email, id } = verifyUser(history);
    setId(id);
    console.log(id, 'id ls')
    if (!email) return null;
    const func = async () => {
      const responseAPI = await getFavoriteByUserId(id);
      setFavorite(responseAPI);
    }
    func();
  }, [history]);

  useEffect(() => {
    setAtt(favorite)
  }, [])

  const removeFav = async (fav) => {
    console.log(fav.id)
    const resultAPI = await deleteFavorite(fav.id);
    const responseAPI = await getFavoriteByUserId(id_user);
    setFavorite(responseAPI);
    setLoading(false)
    console.log(resultAPI)
  }

  return (
    <div className='page-container favorite-page'>
      <header className='header'>
        <Menu />
      </header>
      <div>
      {favorite === "You don't hav favorite!" && loading
      ? <Loading /> 
      : <div>
      <h2 className='title'>Favoritos</h2>
      <div className="all-cards">
        {favorite.map((fav, index) => (
          <div className='cards' key={index}>
            <p>{fav.name}</p>
            <img
              className="character-pic"
              src={fav.url_image && fav.url_image}
              alt="Favorite Thumbnail" />
            <Link className='link' to={verifyTipyOfFavorite(fav)}>
              <p>Mais Detalhes</p>
            </Link>
            <button className='rm-favorite' type='button' onClick={() => removeFav(fav)}>Remover Favorito</button>
          </div>
        ))}
      </div>
      </div>
      }
      </div>
    </div>
  )
}