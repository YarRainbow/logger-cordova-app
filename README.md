# Logger for app Cordova

* [Начало](#getting-started)
  * [Установка Logger](#configure-branch)
  * [Configure App](#configure-app)
  * [Initialize Branch](#initialize-branch)
  * [Test Deep Link iOS](#test-deep-link-ios)
  * [Test Deep Link Android](#test-deep-link-android)
* [Features](#features)
  * [Initialize Branch Features](#initialize-branch-features)
  * [Create Content Reference](#create-content-reference)
  * [Create Deep Link](#create-deep-link)
  * [Share Deep Link](#share-deep-link)
  * [Read Deep Link](#read-deep-link)
  * [Display Content](#display-content)
  * [Track Content](#track-content)
  * [Track User](#track-user)
  * [Track Event](#track-event)
  * [Track Commerce](#track-commerce)
  * [Handle Referrals](#handle-referrals)
* [Troubleshooting](#troubleshooting)
  * [Testing: Key Points](#testing-key-points)
  * [Testing: Optional App Config](#testing-optional-app-config)
  * [Testing: Branch Analytics](#testing-branch-analytics)
  * [Testing: Simulating an Install](#testing-simulating-an-install)
  * [Testing: Supported Platforms](#testing-supported-platforms)
  * [Testing: Sample Test App](#testing-sample-test-app)
  * [Link Data: Universal Object Properties](#link-data-universal-object-properties)
  * [Link Data: Deep Link Properties](#link-data-deep-link-properties)
  * [Link Data: Commerce Properties](#link-data-commerce-properties)
  * [Compiling: Cordova Dependencies](#compiling-cordova-dependencies)
  * [Compiling: Show Console Logs](#compiling-show-console-logs)
  * [Compiling: Updating the Branch SDK](#compiling-updating-the-branch-sdk)
  * [Compiling: Incompatible Plugins](#compiling-incompatible-plugins)
  * [Compiling: Errors](#compiling-errors)

## Начало

* #### Установка Logger

  * Скачайте и установите файл [Logger.js](https://dashboard.branch.io/settings/link) в каталог проекта www
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