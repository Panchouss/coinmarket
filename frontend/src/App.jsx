import React, {useEffect, useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Menu, Spin} from 'antd';
import axios from "axios";
import CryptocurrencyCard from "./components/CryptocurrencyCard.jsx";
import { MenuOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const App = () => {
  const [currencies, setCurrencies] = useState([])
  const [currencyId, setCurrencyId] = useState(1)
  const [currencyData, setCurrencyData] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false);

  const [cache, setCache] = useState({});

  const apiUrl = import.meta.env.VITE_API_URL || 'https://psychic-space-bassoon-wq69jp6r6vxfpg9-8000.app.github.dev';

  const fetchCurrencies = () => {
    axios.get(`https://psychic-space-bassoon-wq69jp6r6vxfpg9-8000.app.github.dev/cryptocurrencies`).then(r => {
      const currenciesResponse = r.data
      const menuItems = [
        getItem('Список криптовалют', 'g1', null,
          currenciesResponse.map(c => {
            return {label: c.name, key: c.id}
          }),
          'group'
        )
      ]
      setCurrencies(menuItems)
    })
  }

  // const fetchCurrency = () => {
  //   axios.get(`https://silver-yodel-9gvq4rv74pv3774q-8000.app.github.dev/cryptocurrencies/${currencyId}`).then(r => {
  //     setCurrencyData(r.data)
  //   })
  // }

  const fetchCurrency = (id) => {
    if (cache[id]) {                // берём из кеша
      setCurrencyData(cache[id]);
      return;
    }
    axios.get(`https://psychic-space-bassoon-wq69jp6r6vxfpg9-8000.app.github.dev/cryptocurrencies/${id}`)
      .then(r => {
        const data = r.data;
        setCurrencyData(data);
        setCache(prev => ({ ...prev, [id]: data }));
      });
  };

  useEffect(() => {
  // один раз при монтировании компонента
  fetchCurrencies();                       // загружаем список монет

  // добавляем пользователя в БД (если открыли из Telegram)
  const tg = window.Telegram?.WebApp;
  const u = tg?.initDataUnsafe?.user;
  if (!u) return;                       // нет данных – ничего не делаем

  axios.post(`${apiUrl}/adduser`, {
    tg_id: u.id,
    username: u.username || `${u.first_name || ''} ${u.last_name || ''}`.trim()
  }).catch(() => {});
}, []);


  useEffect(() => {
    setCurrencyData(null)
    fetchCurrency(currencyId)
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key)
  };
  const burgerColor =
  window.Telegram?.WebApp?.colorScheme === 'dark'   // телеграм сообщает тему
    ? '#ffffff'                                     // белая иконка на чёрном
    : '#000000';  

  return (
  <div className="flex flex-col md:flex-row relative">
    {/* гамбургер */}
    <div className="md:hidden p-2">
      <MenuOutlined style={{ fontSize: 20, color: burgerColor }} onClick={() => setMenuOpen(!menuOpen)} className="text-xl" />
    </div>

    {/* меню */}
    <div
      className={`${
        menuOpen ? 'block' : 'hidden'
  } md:block absolute md:relative top-0 left-0 w-64 h-screen bg-white text-black z-10 overflow-auto pt-[env(safe-area-inset-top,56px)] md:pt-0`}
    >
      <Menu
        onClick={(e) => {
          setCurrencyId(e.key);
          setMenuOpen(false);
        }}
        mode="inline"
        items={currencies}
        className="h-full text-black"
        style={{ backgroundColor: '#fff' }}
      />
    </div>

    {/* контент */}
    <div className="flex-1 p-4 flex items-center justify-center min-h-[calc(100vh-48px)] md:min-h-screen">
      {currencyData ? <CryptocurrencyCard currency={currencyData} /> : <Spin size="large" />}
    </div>
  </div>
  );
};
export default App;
