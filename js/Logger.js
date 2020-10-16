class Logger {
    constructor(handleLogs, options) {
        this._handleLogs = handleLogs;
        this._time = (options && options.time) ? options.time : 30000;
        this._status = (options && options.status) ? options.status : false;
        this._console = (options && options.console) ? options.console : false;
        this._recording = true;
        this._data = {};
        this._logs = {};
        this._keyTime =  this._timeLogs.bind(this);
        this._start();
    }
    _start() {
        this.log('Start Logger');
        setTimeout(() => this._setLogs(), this._time);
    } 
    _setLogs() {
        this._data['logs'] = this._logs;
        if (this._status) {
            this._status = false;
            this.log('End Logger');
            const data = this._data;
            this._handleLogs(data);
            this._recording = false;
            this._data = {};
            this._logs = {};
        }
    }
    _getHours(time) {
        const hours = '' + time.getHours();
        return (hours.length===1) ? ('0' + hours) : hours;
    }
    _getMinutes(time) {
        const minute = '' + time.getMinutes();
        return (minute.length===1) ? ('0' + minute) : minute;
    }
    _getSeconds(time) {
        const seconds = '' + time.getSeconds();
        return (seconds.length===1) ? ('0' + seconds) : seconds;
    }
    _getMilliseconds(time) {
        const milliseconds = '' + time.getUTCMilliseconds();
        return (milliseconds.length===1) ? ('00' + milliseconds) : (milliseconds.length===2) ? ('0' + milliseconds) : milliseconds;
    }
    _getDate(time) {
        const day = '' + time.getDate();
        return (day.length===1) ? ('0' + day) : day;
    }
    _getMonth(time) {
        const month = '' + (time.getMonth() + 1);
        return (month===1) ? ('0' + month) : month;
    }
    _timeLogs() {
        const time = new Date();
        const hours = this._getHours(time);
        const minute = this._getMinutes(time);
        const seconds = this._getSeconds(time);
        const milliseconds = this._getMilliseconds(time);
        const day = this._getDate(time);
        const month = this._getMonth(time);
        const year = time.getFullYear();

        return `${day}.${month}.${year} ${hours}:${minute}:${seconds}:${milliseconds}`;
    }
    activate() {
        this._status = true;
    }
    setInfo(key, value) {
        this._data[key] = value;
    }
    log(...msg) {
        if (!this._recording) return;
        const key = this._keyTime();
        const message = msg.reduce((str, item) => str+= (typeof item ==='string') ? item+' ' : JSON.stringify(item)+' ', '');
        if (this._console) {
            console.log(message);
        }
        if (!this._logs[key]) {
            this._logs[key] = message;
        } else {
            this._logs[key] += ' ' + message;
        }
    }
    end() {
        this._setLogs();
    }
}