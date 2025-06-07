import { useEffect, useState } from "react";

interface LotteryTextProps {
  text: string
}

export const funnyWeddingTableNames: string[] = [
  "Stolik Singli", "Teściowie w Szoku", "Ekipa Od Toastów", "Kuzyni z Daleka", "Przyjaciele Panny Młodej",
  "Przyjaciele Pana Młodego", "Zgrana Paczka", "Sto Lat Bez Końca", "Najlepsi Tancerze", "Pogromcy Tortu",
  "Śmietanka Towarzyska", "Elita Wesela", "Koneserzy Wódki", "Testosteron Team", "Damy i Dżentelmeni",
  "Najgłośniejszy Stół", "Królowie Parkietu", "Płacimy za Wesele", "Kontrola Rodzicielska", "Cicha Woda",
  "Ekipa Od Selfie", "Delegacja Firmowa", "Wujkowie Specjaliści", "Wesele Roku", "Stolik Mistrzów",
  "Nie Pijemy (żart)", "Tylko Na Wesele", "Bez Litości", "Grupa Wsparcia", "Sekta Wujka Staszka"
];

export const LotteryText = ({ text }: LotteryTextProps) => {
    const [displayedText, setDisplayedText] = useState(text);
    const [revealed, setRevealed] = useState(false);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    useEffect(() => {
      let interval: NodeJS.Timeout;
      let timeout: NodeJS.Timeout;
  
      if (!revealed) {
        interval = setInterval(() => {
          const randomWord = Math.floor(Math.random() * funnyWeddingTableNames.length)
          setDisplayedText(funnyWeddingTableNames[randomWord]);
        }, 100);
        
        timeout = setTimeout(() => {
          clearInterval(interval);
          setDisplayedText(text);
          setRevealed(true);
        }, 1000);
      }
  
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, [text, revealed]);
  
    return <span>{displayedText}</span>;
  };