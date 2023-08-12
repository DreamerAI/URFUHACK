import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className=" p-4 sticky">
            <div className="flex place-content-end md:hidden">
                <button onClick={handleToggle}>
                    <svg
                        className="w-6 h-6 fill-current"
                        aria-label="Menu"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M19 9H5V7h14v2zm0 4H5v-2h14v2zm0 4H5v-2h14v2zM3 9h2V7H3v2zm0 4h2v-2H3v2zm0 4h2v-2H3v2z"
                            />
                        ) : (
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 8h16v2H4V8zm0 6h16v-2H4v2zm0 6h16v-2H4v2z"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop Navigation */}
            <div className={`md:flex ${isOpen ? 'flex flex-col place-content-start' : 'hidden justify-around'}`}>
                <Link to="/me" className={`flex py-4 ${isOpen ? 'border-b' : ''}`}>
                    Главная
                </Link>
                <a href="#" className={`flex py-4 ${isOpen ? 'border-b' : ''}`}>
                    Словарь
                </a>
                <a href="#" className={`flex py-4 ${isOpen ? 'border-b' : ''}`}>
                    Озвучка текста
                </a>
                <a href="#" className={`flex py-4 ${isOpen ? 'border-b' : ''}`}>
                    Перевод и озвучка жестов
                </a>
                <a href="#" className={`flex py-4 ${isOpen ? 'border-b' : ''}`}>
                    Изучение языка жестов
                </a>
                <a href="#" className={`flex py-4 ${isOpen ? 'border-b' : ''}`}>
                    Настройки
                </a>
            </div>
        </nav>
    );
};
