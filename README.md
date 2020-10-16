# Logger for app Cordova
* #### Установка Logger

  * Скачайте и установите файл [Logger.js](https://github.com/kirill-samylin/logger-cordova-app/blob/master/js/Logger.js) в каталог проекта www
  * Подключите файл в www/index.html

    ![image](https://i.imgur.com/1GtFvng.jpeg)

* #### Настройка Logger
    ```js
    // файл index.js
    const options = {
        time: 60000, // Указать время в миллисекундах 1000 = 1 секунда. По умолчанию 30 секунд (30000);
        status: true, // Вернуть логи через time секунд. По умолчанию false;
        console: true, // Выводить все логи в консоль. По умолчанию false;
    };

    const debug = new Logger((logs) => console.log(logs),  options);
    ```
* #### Методы Logger
    * activate() - Вызывается, чтобы включить отправку логов.
    
        ```js
        // файл index.js
        debug.activate();
        ```

    * setInfo(key, value) - Записывает ключ и значение в первый уровень json. Например: setInfo("package","com.app.test")
    
        ```js
        // файл index.js
        debug.setInfo('id', 1234);
        ```

    * log(arguments) - Записывает текст лога в json во второй уровень с привязкой ко времени.
    
        ```js
        // файл index.js
        const data = {
            one: '1',
            two: '2',
        };
        debug.log('start'); //16.10.2020 14:22:33:429:'start '
        debug.log('info', data); //16.10.2020 14:22:33:558:'info { one: '1', two: '2' } '
        debug.log('a', 'r', 'g', 'u', 'm', 'e', 'n', 't', 's'); //16.10.2020 14:22:35:004:'a r g u m e n t s '
        ```
    * end() - Вызывает отправку логов не дожидаясь time.
    
        ```js
        // файл index.js
         debug.end();
        ```

##### Внимание! Чтобы логи были отправлены нужно вызвать метод activate() или отправить в опции status: true.