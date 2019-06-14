import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  vus: 1000,
  duration: "600s"
};
  export default function() {
    let res = http.get(`http://localhost:3000/listinginfo/${Math.floor(Math.random() * 10000000)}`);
    check(res, {
      "status was 200": (r) => r.status == 200,
      "transaction time OK": (r) => r.timings.duration < 100
    });
    sleep(1);
};