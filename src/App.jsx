import './App.css';
import { useState } from 'react';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            alert('Пожалуйста, введите текст');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: inputValue })
            });

            if (response.ok) {
                alert('Данные успешно отправлены на сервер!');
                setInputValue('');
            } else {
                alert('Ошибка при отправке данных');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось подключиться к серверу.');
        }
    };

    const fetchLastData = async () => {
        try {
            const response = await fetch('http://localhost:3000/data');

            if (response.ok) {
                const data = await response.json();
                setOutputValue(data.content);
            } else {
                setOutputValue(`Ошибка: ${response.status}`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен.');
        }
    };

    return (
        <div className="container">
            <h1 className="container__title">Задание для frontend 1.0</h1>
            <form onSubmit={handleSubmit} className="container__form">
                <div className="container__input-group">
                    <input
                        type="text"
                        className="container__input"
                        placeholder="Введите значение"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className="container__button">
                        Отправить
                    </button>
                </div>
            </form>

            <h1 className='container__title'>Задание для frontend 2.0</h1>
            <div className="container__output-group">
                <button
                    type="button"
                    className="container__button"
                    onClick={fetchLastData}
                >
                    Получить данные
                </button>
                <input
                    type="text"
                    className="container__input"
                    placeholder="Здесь появится последняя запись из файла..."
                    value={outputValue}
                    readOnly
                />
            </div>
        </div>
    );
}

export default App;