import React from 'react';

export const checkError = (error: any, field: any) => {
  return error[field] && error[field].message ? 'is-invalid' : '';
};

// check error message
export const getErrorMessage = (error: any, field: any, t?: any) => {
  const err = error[field];
  if (t) {
    return err && err.message ? (
      <div className="invalid-feedback">{t(err.message)}</div>
    ) : (
      ''
    );
  }
  return err && err.message ? (
    <div className="invalid-feedback">{err.message}</div>
  ) : (
    ''
  );
};

export const numberOnly = (e: any) => {
  const re = /[0-9A-F:]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
};

const year = new Date().getFullYear();
export const years = Array.from(new Array(20), (val, index) => year - index);

export const timeFormat = (duration) => {
  // Minutes and seconds
  const mins = Math.floor((duration % 3600) / 60);
  const secs = Math.floor(duration % 60);

  let ret = '';
  ret += `${mins}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;
  return ret;
};

export const getRandomColor = () => {
  // eslint-disable-next-line no-bitwise
  return `hsla(${~~(360 * Math.random())},70%,80%,1)`;
};

export const trimName = (name: string) => {
  return name.length > 10 ? `${name.substring(0, 7)}...` : name;
};

export const setClassName = (number, length) => {
  if (number === 0) return 'hsvi__img-container card-first';
  if (number === length - 1 && length >= 5)
    return 'hsvi__img-container card-last';
  return 'hsvi__img-container card-middle';
};

// convert hh:mm:ss into seconds
export const getDurationToSeconds = (hms) => {
  const a = hms.split(':');
  return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
};

// convert seconds to hh:mm:ss
export const getTimeInHoursMinutesSeconds = (seconds) => {
  const secs = Number(seconds);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor((secs % 3600) % 60);

  const hDisplay = h < 10 ? `0${h}` : h;
  const mDisplay = m < 10 ? `0${m}` : m;
  const sDisplay = s < 10 ? `0${s}` : s;
  return `${hDisplay}:${mDisplay}:${sDisplay}`;
};

// get watched percentage
export const getWatchedDurationProgress = (watchedTime, fullVideoTime) => {
  const watchedTimeSeconds = getDurationToSeconds(watchedTime);
  const fullVideoTimeSeconds = getDurationToSeconds(fullVideoTime);
  return Math.round((watchedTimeSeconds / fullVideoTimeSeconds) * 100);
};

// Convert date to YYYY-MM-DD format
export const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const yearString = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [yearString, month, day].join('-');
};
