let time = new Date().getTime();

class Timer {
    static getDeltaTime() {
        let currentTime = new Date().getTime();
        let delta = (currentTime - time) / 1000;
        time = currentTime;

        return delta;
    }
}

export default Timer;