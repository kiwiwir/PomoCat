import { Component } from '@angular/core';

type PomodoroState = 'focus' | 'break' | 'longBreak';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss',
})
export class PomodoroComponent {
  // Interwały w sekundach (na razie dla testów)
  private intervals = [
    { state: 'focus', duration: 5 }, // 25 min → 5 sek
    { state: 'break', duration: 3 }, // 5 min → 3 sek
    { state: 'focus', duration: 5 },
    { state: 'break', duration: 3 },
    { state: 'focus', duration: 5 },
    { state: 'break', duration: 3 },
    { state: 'focus', duration: 5 },
    { state: 'longBreak', duration: 7 }, // 15 min → 7 sek
  ] as { state: PomodoroState; duration: number }[];

  intervalIndex = 0;
  timeLeft = this.intervals[0].duration;
  timer: any = null;
  running = false;

  get currentState(): PomodoroState {
    return this.intervals[this.intervalIndex].state;
  }

  get catGif(): string {
    return this.currentState === 'focus'
      ? 'assets/test_busy_cat.png'
      : 'assets/test_lazy_cat.png';
  }

  get stateLabel(): string {
    switch (this.currentState) {
      case 'focus':
        return 'Focus';
      case 'break':
        return 'Break';
      case 'longBreak':
        return 'Long Break';
    }
  }

  get intervalsList() {
    return this.intervals;
  }

  getIntervalLabel(interval: { state: PomodoroState; duration: number }) {
    switch (interval.state) {
      case 'focus': return interval.duration === 7 ? '15' : '25';
      case 'break': return '5';
      case 'longBreak': return '15';
      default: return '';
    }
  }

  toggleTimer() {
    if (this.running) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.nextInterval();
      }
    }, 1000);
  }

  pause() {
    this.running = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  reset() {
    this.pause();
    this.intervalIndex = 0;
    this.timeLeft = this.intervals[0].duration;
  }

  nextInterval() {
    this.pause();
    this.intervalIndex++;
    if (this.intervalIndex >= this.intervals.length) {
      this.intervalIndex = 0;
    }
    this.timeLeft = this.intervals[this.intervalIndex].duration;
    this.start();
  }
}
