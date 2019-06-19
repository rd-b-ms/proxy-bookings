# To deploy on EC2

Must update ```client/index.html``` with correct ip address to fetch bundle.js file from service client.
Also, must update ```proxy/index.js``` with proper ```/GET``` route for fetching data from service on ```componentDidMount()```

Both operations must be updated every time EC2 instances are restarted.