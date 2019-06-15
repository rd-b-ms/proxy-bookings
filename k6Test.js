import http from 'k6/http';
import { check, sleep } from 'k6';
/* eslint-disable func-names */
// eslint-disable-next-line func-names

export const options = {
  vus: 825,
  duration: '300s',
};

// TEST /GET REQUESTS:
export default function () {
  const res = http.get(`http://localhost:3004/booking?listingid=${Math.round(Math.random() * 10000000)}`);
  check(res, {
    success: r => r.status == 200,
  });
  sleep(1);
}
