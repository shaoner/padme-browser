const KEY_FIRST_TIME = 'padme_www_1';

const isFirstTime = (): boolean => localStorage.getItem(KEY_FIRST_TIME) === null;

const resetFirstTime = () => localStorage.setItem(KEY_FIRST_TIME, 'false');

export {
    isFirstTime,
    resetFirstTime,
}
