# Benchmarking nodejs


Nomad is used to manage the resources to run the docker node js containers.

Testing is carried out using apache ab and wrk.



For node-express docker image:

$ wrk -t 1 -c 1000 -d30s http://127.0.0.1:31034

| Threads | Connections | Mean Req/Sec | Req/Sec | Transfer/sec | Latency | Errors | connect | read  | write | timeout |
| --      | --          | --           | --      | --           | --      | --     | --      | --    | --    | --      |
| 1       | 100         | 4.60k        | 4571.99 | 0.94MB       | 22.05ms | None   | 0       | 0     | 0     | 0       |
| 10      | 100         | 379.12       | 3769.67 | 795.17KB     | 27.86ms | Yes    | --      | 2     | --    | --      |
| 100     | 100         | 41.47        | 4136.71 | 0.85MB       | 24.21ms | Yes    | --      | 1     | --    | --      |
| 1       | 1000        | 4.77k        | 4558.61 | 0.94MB       | 70.07ms | Yes    | --      | 17049 | 108   | N/A     |
| 10      | 1000        | 406.25       | 3952.43 | 833.72KB     | 78.92ms | Yes    | --      | 16961 | 50    | N/A     |
| 100     | 1000        | 99.79        | 4217.52 | 0.87MB       | 67.30ms | Yes    | --      | 17098 | 19    | N/A     |
| 1000    | 1000        | 22.93        | 4101.39 | 865.14KB     | 46.26ms | Yes    | --      | 17036 | 1     | N/A     |


$ siege -c 1 -t 30S http://127.0.0.1:28481

Lifting the server siege...
Transactions:		         120 hits
Availability:		      100.00 %
Elapsed time:		       29.56 secs
Data transferred:	        0.00 MB
Response time:		        0.00 secs
Transaction rate:	        4.06 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.02
Successful transactions:         120
Failed transactions:	           0
Longest transaction:	        0.01
Shortest transaction:	        0.00

$ siege -c 10 -t 30S http://127.0.0.1:28481

Lifting the server siege...
Transactions:		        1142 hits
Availability:		      100.00 %
Elapsed time:		       29.36 secs
Data transferred:	        0.01 MB
Response time:		        0.00 secs
Transaction rate:	       38.90 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.16
Successful transactions:        1142
Failed transactions:	           0
Longest transaction:	        0.07
Shortest transaction:	        0.00


$ siege -c 100 -t 30S http://127.0.0.1:28481

Lifting the server siege...
Transactions:		       11542 hits
Availability:		       99.60 %
Elapsed time:		       29.81 secs
Data transferred:	        0.13 MB
Response time:		        0.01 secs
Transaction rate:	      387.19 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        2.97
Successful transactions:       11542
Failed transactions:	          46
Longest transaction:	        0.20
Shortest transaction:	        0.00



For node-express-cluster docker image

| Threads | Connections | Mean Req/Sec | Req/Sec | Transfer/sec | Latency | Errors | connect | read  | write | timeout |
| --      | --          | --           | --      | --           | --      | --     | --      | --    | --    | --      |
| 1       | 100         | 4.62k        | 4596.85 | 0.95MB       | 23.69ms | Yes    | 0       | 11    | 0     | 0       |
| 10      | 100         | 448.60       | 4447.03 | 0.92MB       | 24.30ms | Yes    | --      | 23    | --    | --      |
| 100     | 100         | 49.98        | 4983.45 | 1.03MB       | 20.46ms | None   | --      |       | --    | --      |
| 1       | 1000        | 4.74k        | 4626.40 | 0.95MB       | 39.45ms | Yes    | --      | 17533 | 36    | N/A     |
<!--| 10      | 1000        | 406.25       | 3952.43 | 833.72KB     | 78.92ms | Yes    | --      | 16961 | 50    | N/A     |
| 100     | 1000        | 99.79        | 4217.52 | 0.87MB       | 67.30ms | Yes    | --      | 17098 | 19    | N/A     |
| 1000    | 1000        | 22.93        | 4101.39 | 865.14KB     | 46.26ms | Yes    | --      | 17036 | 1     | N/A     |-->


Some things to note:

1. The number of threads cannot be more than the number of connection available

$ siege -c 1 -t 30S http://127.0.0.1:31034

Lifting the server siege...
Transactions:		         113 hits
Availability:		      100.00 %
Elapsed time:		       29.02 secs
Data transferred:	        0.00 MB
Response time:		        0.00 secs
Transaction rate:	        3.89 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.02
Successful transactions:         113
Failed transactions:	           0
Longest transaction:	        0.02
Shortest transaction:	        0.00

$ siege -c 10 -t 30S http://127.0.0.1:31034

Lifting the server siege...
Transactions:		        1194 hits
Availability:		      100.00 %
Elapsed time:		       29.81 secs
Data transferred:	        0.01 MB
Response time:		        0.01 secs
Transaction rate:	       40.05 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.21
Successful transactions:        1194
Failed transactions:	           0
Longest transaction:	        0.02
Shortest transaction:	        0.00


$ siege -c 100 -t 30S http://127.0.0.1:31034

Lifting the server siege...
Transactions:		       11243 hits
Availability:		      100.00 %
Elapsed time:		       29.41 secs
Data transferred:	        0.13 MB
Response time:		        0.01 secs
Transaction rate:	      382.28 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        3.65
Successful transactions:       11243
Failed transactions:	           0
Longest transaction:	        0.17
Shortest transaction:	        0.00


$ siege -c 1000 -t 30S http://127.0.0.1:31034

[alert] Zip encoding disabled; siege requires zlib support to enable it

================================================================
WARNING: The number of users is capped at 255.  To increase this
         limit, search your .siegerc file for 'limit' and change
         its value. Make sure you read the instructions there...
================================================================

node express cluster local machine
$ siege -c 1 -t 30S http://localhost:8080

Lifting the server siege...
Transactions:		         103 hits
Availability:		      100.00 %
Elapsed time:		       29.21 secs
Data transferred:	        0.00 MB
Response time:		        0.00 secs
Transaction rate:	        3.53 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.01
Successful transactions:         103
Failed transactions:	           0
Longest transaction:	        0.02
Shortest transaction:	        0.00

$  siege -c 10 -t 30S http://localhost:8080

Lifting the server siege...
Transactions:		        1123 hits
Availability:		      100.00 %
Elapsed time:		       29.09 secs
Data transferred:	        0.01 MB
Response time:		        0.00 secs
Transaction rate:	       38.60 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.09
Successful transactions:        1123
Failed transactions:	           0
Longest transaction:	        0.02
Shortest transaction:	        0.00

$ siege -b -t 30S http://localhost:8080

Transactions:		       16332 hits
Availability:		      100.00 %
Elapsed time:		       29.66 secs
Data transferred:	        0.19 MB
Response time:		        0.01 secs
Transaction rate:	      550.64 trans/sec
Throughput:		        0.01 MB/sec
Concurrency:		        8.12
Successful transactions:       16332
Failed transactions:	           0
Longest transaction:	        0.18
Shortest transaction:	        0.00


node express  local machine


$ siege -c 1 -t 30S http://localhost:8080

Lifting the server siege...
Transactions:		         111 hits
Availability:		      100.00 %
Elapsed time:		       29.40 secs
Data transferred:	        0.00 MB
Response time:		        0.00 secs
Transaction rate:	        3.78 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.01
Successful transactions:         111
Failed transactions:	           0
Longest transaction:	        0.02
Shortest transaction:	        0.00

$ siege -c 10 -t 30S http://localhost:8080

Lifting the server siege...
Transactions:		        1170 hits
Availability:		      100.00 %
Elapsed time:		       29.33 secs
Data transferred:	        0.01 MB
Response time:		        0.00 secs
Transaction rate:	       39.89 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.10
Successful transactions:        1170
Failed transactions:	           0
Longest transaction:	        0.06
Shortest transaction:	        0.00


$ siege -b -t 30S http://localhost:8080

Lifting the server siege...
Transactions:		       16333 hits
Availability:		      100.00 %
Elapsed time:		       29.43 secs
Data transferred:	        0.19 MB
Response time:		        0.01 secs
Transaction rate:	      554.98 trans/sec
Throughput:		        0.01 MB/sec
Concurrency:		        6.10
Successful transactions:       16333
Failed transactions:	           0
Longest transaction:	        0.07
Shortest transaction:	        0.00


With cluster
$ siege -c 10 -t 30S http://localhost:3000

Lifting the server siege...
Transactions:		        1168 hits
Availability:		      100.00 %
Elapsed time:		       29.95 secs
Data transferred:	        0.01 MB
Response time:		        0.00 secs
Transaction rate:	       39.00 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.11
Successful transactions:        1168
Failed transactions:	           0
Longest transaction:	        0.04
Shortest transaction:	        0.00


Without cluster
$ siege -c 10 -t 30S http://localhost:3000

Lifting the server siege...
Transactions:		        1156 hits
Availability:		      100.00 %
Elapsed time:		       29.44 secs
Data transferred:	        0.01 MB
Response time:		        0.00 secs
Transaction rate:	       39.27 trans/sec
Throughput:		        0.00 MB/sec
Concurrency:		        0.08
Successful transactions:        1156
Failed transactions:	           0
Longest transaction:	        0.04
Shortest transaction:	        0.00


Cluster with ab

$ ab -c100 -n1000 http://localhost:3000/

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        11 bytes

Concurrency Level:      100
Time taken for tests:   0.371 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      86000 bytes
HTML transferred:       11000 bytes
Requests per second:    2695.92 [#/sec] (mean)
Time per request:       37.093 [ms] (mean)
Time per request:       0.371 [ms] (mean, across all concurrent requests)
Transfer rate:          226.42 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.6      0       9
Processing:    12   34  17.7     33     170
Waiting:       12   34  17.7     32     170
Total:         13   35  17.9     34     171

Percentage of the requests served within a certain time (ms)
  50%     34
  66%     41
  75%     47
  80%     49
  90%     57
  95%     62
  98%     66
  99%     70
 100%    171 (longest request)


single with ab, express


Server Software:
Server Hostname:        0.0.0.0
Server Port:            8080

Document Path:          /
Document Length:        12 bytes

Concurrency Level:      100
Time taken for tests:   0.418 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      211000 bytes
HTML transferred:       12000 bytes
Requests per second:    2392.41 [#/sec] (mean)
Time per request:       41.799 [ms] (mean)
Time per request:       0.418 [ms] (mean, across all concurrent requests)
Transfer rate:          492.97 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   1.0      0       4
Processing:    17   40  15.5     34      96
Waiting:       17   40  15.4     34      95
Total:         17   41  15.8     34      97

Percentage of the requests served within a certain time (ms)
  50%     34
  66%     44
  75%     50
  80%     56
  90%     66
  95%     69
  98%     87
  99%     90
 100%     97 (longest request)
 
single with ab, native

 ab -c100 -n1000 http://localhost:3000/

 Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        11 bytes

Concurrency Level:      100
Time taken for tests:   0.221 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      86000 bytes
HTML transferred:       11000 bytes
Requests per second:    4516.00 [#/sec] (mean)
Time per request:       22.143 [ms] (mean)
Time per request:       0.221 [ms] (mean, across all concurrent requests)
Transfer rate:          379.27 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.0      0       5
Processing:     7   21  11.5     15      50
Waiting:        7   21  11.4     15      50
Total:          8   21  11.7     15      51


cluster with ab based on number of cores, cpu bound for loop

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        11 bytes

Concurrency Level:      100
Time taken for tests:   4.327 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      86000 bytes
HTML transferred:       11000 bytes
Requests per second:    231.11 [#/sec] (mean)
Time per request:       432.687 [ms] (mean)
Time per request:       4.327 [ms] (mean, across all concurrent requests)
Transfer rate:          19.41 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   2.5      0      19
Processing:    32  409  77.7    412     527
Waiting:       32  409  77.7    412     526
Total:         45  410  75.6    412     527

Percentage of the requests served within a certain time (ms)
  50%    412
  66%    432
  75%    441
  80%    449
  90%    482
  95%    499
  98%    512
  99%    514
 100%    527 (longest request)


 single with ab, cpu bound 


Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        11 bytes

Concurrency Level:      100
Time taken for tests:   8.378 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      86000 bytes
HTML transferred:       11000 bytes
Requests per second:    119.35 [#/sec] (mean)
Time per request:       837.844 [ms] (mean)
Time per request:       8.378 [ms] (mean, across all concurrent requests)
Transfer rate:          10.02 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0       4
Processing:    37  799 138.9    819     945
Waiting:       34  799 138.9    819     945
Total:         42  799 138.1    820     945

Percentage of the requests served within a certain time (ms)
  50%    820
  66%    854
  75%    860
  80%    867
  90%    882
  95%    917
  98%    942
  99%    943
 100%    945 (longest request)
 alextanhongpin@Alexs-MacBook-Pro  ~/Documents/nomad/benchmark/node-express-cluste



cluster with ab based 20 workers!, cpu bound for loop

Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        11 bytes

Concurrency Level:      100
Time taken for tests:   4.423 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      86000 bytes
HTML transferred:       11000 bytes
Requests per second:    226.11 [#/sec] (mean)
Time per request:       442.258 [ms] (mean)
Time per request:       4.423 [ms] (mean, across all concurrent requests)
Transfer rate:          18.99 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    3  10.8      0      47
Processing:   151  421  67.5    426     681
Waiting:      151  420  67.6    426     681
Total:        198  424  60.4    427     686

Percentage of the requests served within a certain time (ms)
  50%    427
  66%    443
  75%    452
  80%    460
  90%    481
  95%    512
  98%    556
  99%    578
 100%    686 (longest request)