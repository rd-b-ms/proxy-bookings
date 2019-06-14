// import http from "k6/http";
// import { sleep } from "k6";

// export default function() {
//   http.get("http://test.loadimpact.com");
//   sleep(1);
// };

import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  vus: 500,
  duration: "300s",
};

export default function() {
  let res = http.get(`http://localhost:3000/messages/${Math.floor(Math.random()*10000000)+1}`);
  check(res, {
    "success": (r) => r.status === 200,
    "transaction time OK": r => r.timings.duration < 100,
  });
  sleep(1);
};

// export default function() {
//   let url = `http://localhost:3000/messages`;
//   let payload = JSON.stringify({
//     message: "this is a new message. please add to the database but this will be deleted later. ",
//     time_made: "time123",
//     listing_id: Math.floor(Math.random()*10000000)+1,
//     accuracy_rating: 2,
//     communication_rating: 3,
//     cleanliness_rating: 4,
//     location_rating: 5,
//     check_in_rating: 1,
//     value_rating: 2,
//     user_id: 5
//   })
//   var params =  { headers: { "Content-Type": "application/json" } }
//   let res = http.post(url, payload, params);
//   check(res, {
//     "success": (r) => r.status === 201,
//     "transaction time OK": r => r.timings.duration < 100,
//   });
//   sleep(1);
// };