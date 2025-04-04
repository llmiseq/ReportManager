import React, { useState } from 'react';
import './ZokAdminPage.css';
import InformacjeOUserze from './zokUser/components/admin/InformacjeOUserze';
import PrzegladajWpisy from './zokUser/components/admin/PrzegladajWpisy';
import ZarzadzajWyrobiskami from './zokUser/components/admin/ZarzadzajWyrobiskami';
import ZarzadzajOddzialami from './zokUser/components/admin/ZarzadzajOddzialami'; // Zmieniono nazwę komponentu
import DodajFirme from './zokUser/components/admin/DodajFirme';
import EksportujDane from './zokUser/components/admin/EksportujDane';
import GenerujRaport from './zokUser/components/admin/GenerujRaport';
import ZarzadzajKontem from './zokUser/components/admin/ZarzadzajKontem';
import WylogujPanel from './zokUser/components/admin/WylogujPanel'; // Poprawiona ścieżka importu

function ZokAdminPage() {
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
        <h1 className="tytul-panelu">Panel Administratora Exme</h1>
      </header>
      {menuWidoczne && (
        <div className={`menu-overlay ${animacjaZamykania ? 'zamykanie' : ''}`} onClick={zamknijMenu}>
          <nav className={`menu-panel ${animacjaZamykania ? 'zamykanie' : ''}`} onClick={(e) => e.stopPropagation()}>
            <ul className="lista-menu">
              <li onClick={() => handleOptionClick('Informacje o użytkowniku')}>Informacje o użytkowniku</li>
              <li onClick={() => handleOptionClick('Przeglądaj wpisy')}>Przeglądaj wpisy</li>
              <li onClick={() => handleOptionClick('Zarządzaj wyrobiskami')}>Zarządzaj wyrobiskami</li>
              <li onClick={() => handleOptionClick('Zarządzaj oddziałami')}>Zarządzaj oddziałami</li>
              <li onClick={() => handleOptionClick('Dodaj firmę')}>Dodaj firmę</li>
              <li onClick={() => handleOptionClick('Eksportuj dane')}>Eksportuj dane</li>
              <li onClick={() => handleOptionClick('Generuj raport')}>Generuj raport</li>
              <li onClick={() => handleOptionClick('Zarządzaj kontem')}>Zarządzaj kontem</li>
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
        ) : wybranaOpcja === 'Zarządzaj wyrobiskami' ? (
          <ZarzadzajWyrobiskami />
        ) : wybranaOpcja === 'Zarządzaj oddziałami' ? (
          <ZarzadzajOddzialami />
        ) : wybranaOpcja === 'Dodaj firmę' ? (
          <DodajFirme />
        ) : wybranaOpcja === 'Eksportuj dane' ? (
          <EksportujDane />
        ) : wybranaOpcja === 'Generuj raport' ? (
          <GenerujRaport />
        ) : wybranaOpcja === 'Zarządzaj kontem' ? (
          <ZarzadzajKontem />
        ) : wybranaOpcja === 'Wyloguj' ? (
          <WylogujPanel />
        ) : (
          <p>{wybranaOpcja ? `Wybrana zakładka: ${wybranaOpcja}` : 'Wybierz zakładkę z menu.'}</p>
        )}
      </main>
    </div>
  );
}

export default ZokAdminPage;
