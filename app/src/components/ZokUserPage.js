import React, { useState } from 'react';
import './ZokUserPage.css';
import InformacjeOUserze from './zokUser/components/user/InformacjeOUserze';
import PrzegladajWpisy from './zokUser/components/user/PrzegladajWpisy'; // Dodano nowy komponent
import DodajWpis from './zokUser/components/user/DodajWpis';
import DodajWyrobisko from './zokUser/components/user/DodajWyrobisko';
import ZarzadzajUzytkownikiem from './zokUser/components/user/ZarzadzajUzytkownikiem'; // Nowy komponent
import WylogujPanel from './zokUser/components/user/WylogujPanel'; // Nowy komponent

function ZokUserPage() {
  const [wybranaOpcja, setWybranaOpcja] = useState('');
  const [menuWidoczne, setMenuWidoczne] = useState(false);
  const [animacjaZamykania, setAnimacjaZamykania] = useState(false);

  const handleOptionClick = (opcja) => {
    setWybranaOpcja(opcja);
    zamknijMenu();
  };

  const toggleMenu = () => {
    if (menuWidoczne) {
      zamknijMenu();
    } else {
      setMenuWidoczne(true);
    }
  };

  const zamknijMenu = () => {
    setAnimacjaZamykania(true); // Uruchamia animację zamykania
    setTimeout(() => {
      setMenuWidoczne(false); // Po zakończeniu animacji ukrywa menu
      setAnimacjaZamykania(false);
    }, 300); // Czas musi być zgodny z czasem animacji w CSS
  };

  return (
    <div className="strona-panelu jasny">
      <header className="naglowek-panelu">
        <button className="przycisk-menu" onClick={toggleMenu}>
          ☰
        </button>
        <h1 className="tytul-panelu">Panel użytkownika Exme</h1>
      </header>
      {menuWidoczne && (
        <div className={`menu-overlay ${animacjaZamykania ? 'zamykanie' : ''}`} onClick={zamknijMenu}>
          <nav className={`menu-panel ${animacjaZamykania ? 'zamykanie' : ''}`} onClick={(e) => e.stopPropagation()}>
            <ul className="lista-menu">
              <li onClick={() => handleOptionClick('Informacje o użytkowniku')}>Informacje o użytkowniku</li>
              <li onClick={() => handleOptionClick('Przeglądaj wpisy')}>Przeglądaj wpisy</li>
              <li onClick={() => handleOptionClick('Dodaj wpis')}>Dodaj wpis</li>
              <li onClick={() => handleOptionClick('Dodaj wyrobisko')}>Dodaj wyrobisko</li>
              <li onClick={() => handleOptionClick('Zarządzaj użytkownikiem')}>Zarządzaj użytkownikiem</li> 
              <li onClick={() => handleOptionClick('Wyloguj')}>Wyloguj</li> 
            </ul>
          </nav>
        </div>
      )}
      <main className="wyświetlacz-zawartości">
        {wybranaOpcja === 'Informacje o użytkowniku' ? (
          <InformacjeOUserze />
        ) : wybranaOpcja === 'Przeglądaj wpisy' ? (
          <PrzegladajWpisy />
        ) : wybranaOpcja === 'Dodaj wpis' ? (
          <DodajWpis />
        ) : wybranaOpcja === 'Dodaj wyrobisko' ? (
          <DodajWyrobisko />
        ) : wybranaOpcja === 'Zarządzaj użytkownikiem' ? ( 
          <ZarzadzajUzytkownikiem /> 
        ) : wybranaOpcja === 'Wyloguj' ? ( 
          <WylogujPanel /> 
        ) : (
          <p>{wybranaOpcja ? `Wybrana zakładka: ${wybranaOpcja}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </main>
    </div>
  );
}

export default ZokUserPage;
