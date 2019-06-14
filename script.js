import http from 'k6/http';
import { check, sleep } from 'k6';

// /*
// Uncomment following block to run GET request stress testing

export const options = {
  // vus: 200,
  // duration: '300s',
  stages: [
    { duration: '20s', target: 250 },
    { duration: '40s', target: 500 },
    { duration: '60s', target: 750 },
    { duration: '320s', target: 1000 },
    { duration: '20s', target: 750 },
    { duration: '20s', target: 500 },
    { duration: '20s', target: 250 },
  ],
};

export default function () {
  const res = http.get(`http://localhost:3000/photos/get/${Math.floor(Math.random() * 10000000)}`);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 100,
  });
  sleep(1);
}

// */

/*
// Uncomment following block to run POST request stress testing

export const options = {
  // vus: 1000,
  // duration: '600s',
  stages: [
    { duration: '20s', target: 250 },
    { duration: '40s', target: 500 },
    { duration: '60s', target: 750 },
    { duration: '320s', target: 1000 },
    { duration: '20s', target: 750 },
    { duration: '20s', target: 500 },
    { duration: '20s', target: 250 },
  ],
};

export default function () {
  const url = 'http://localhost:4000/photos/post';
  const payload = JSON.stringify({
    photoUrl: `https://sdc-photos-rdbms.s3-us-west-1.amazonaws.com/${Math.floor(Math.random() * 80000000)}.jpeg`,
    description: 'This photo is of my cat. She is the best cat you have ever seen',
    isVerified: true,
    listingId: Math.floor(Math.random() * 10000000),
  });
  const params = { headers: { "Content-Type": "application/json" } };
  const res = http.post(url, payload, params);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 100,
  });
  sleep(1);
}

*/
