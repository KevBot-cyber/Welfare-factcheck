const sampleData = [
  {name:"Aldershot",lat:51.2480,lng:-0.7580,c:2160,r:2.8,i:2431,v:842,ai:22.4,w:45970,reg:"UK"},
  {name:"Aldridge-Brownhills",lat:52.5955,lng:-1.9004,c:1043,r:5.8,i:853,v:613,ai:16.8,w:37721,reg:"UK"},
  {name:"Altrincham and Sale West",lat:53.4086,lng:-2.3672,c:1319,r:3.4,i:1468,v:1149,ai:22.9,w:46900,reg:"UK"},
  {name:"Amber Valley",lat:53.0500,lng:-1.4300,c:4405,r:4.0,i:3841,v:1827,ai:19.7,w:59483,reg:"UK"},
  {name:"Angus and Perthshire Glens",lat:56.6736,lng:-2.9176,c:1559,r:6.4,i:1745,v:864,ai:22.6,w:36883,reg:"UK"},
  {name:"Arbroath and Broughty Ferry",lat:56.5777,lng:-2.5681,c:3657,r:5.1,i:3500,v:2457,ai:21.4,w:43993,reg:"UK"},
  {name:"Arundel and South Downs",lat:50.8788,lng:-0.5729,c:1825,r:6.4,i:1939,v:1517,ai:24.8,w:43638,reg:"UK"},
  {name:"Ashfield",lat:53.0900,lng:-1.1900,c:2556,r:7.9,i:2239,v:1581,ai:16.5,w:55046,reg:"UK"},
  {name:"Ashford",lat:51.1400,lng:0.8700,c:4011,r:6.4,i:4964,v:2095,ai:24.3,w:52831,reg:"UK"},
  {name:"Ashton-under-Lyne",lat:53.4536,lng:-2.0779,c:3235,r:5.4,i:3946,v:2813,ai:21.7,w:54924,reg:"UK"},
  {name:"Aylesbury",lat:51.8100,lng:-0.8100,c:3517,r:9.9,i:4258,v:1781,ai:20.6,w:55059,reg:"UK"},
  {name:"Ayr, Carrick and Cumnock",lat:55.4378,lng:-4.6351,c:894,r:5.4,i:790,v:370,ai:16.7,w:58046,reg:"UK"},
  {name:"Banbury",lat:52.0600,lng:-1.3300,c:2441,r:8.9,i:2051,v:1457,ai:22.6,w:61501,reg:"UK"},
  {name:"Barking",lat:51.5400,lng:0.0800,c:4240,r:8.8,i:3982,v:2452,ai:20.3,w:61525,reg:"UK"},
  {name:"Barnsley North",lat:53.5553,lng:-1.4842,c:4822,r:2.8,i:4282,v:2302,ai:18.8,w:49548,reg:"UK"},
  {name:"Barnsley South",lat:53.5509,lng:-1.4629,c:817,r:5.1,i:804,v:540,ai:27.4,w:55714,reg:"UK"},
  {name:"Barrow and Furness",lat:54.1035,lng:-3.2261,c:3640,r:2.0,i:4549,v:2835,ai:26.5,w:58936,reg:"UK"},
  {name:"Basildon and Billericay",lat:51.6004,lng:0.4232,c:1234,r:6.9,i:1025,v:477,ai:18.5,w:39869,reg:"UK"},
  {name:"Basingstoke",lat:51.2600,lng:-1.0800,c:800,r:2.8,i:680,v:439,ai:16.3,w:61229,reg:"UK"},
  {name:"Bassetlaw",lat:53.3200,lng:-0.9400,c:3379,r:2.8,i:3129,v:1828,ai:20.4,w:38685,reg:"UK"},
  {name:"Bath",lat:51.3800,lng:-2.3500,c:4365,r:9.9,i:4509,v:2689,ai:17.0,w:38065,reg:"UK"},
  {name:"Battersea",lat:51.4600,lng:-0.1600,c:2239,r:3.8,i:2719,v:982,ai:16.3,w:63529,reg:"UK"},
  {name:"Beaconsfield",lat:51.6000,lng:-0.6300,c:3018,r:2.7,i:3234,v:1101,ai:22.3,w:64355,reg:"UK"},
  {name:"Beckenham and Penge",lat:51.4020,lng:-0.0033,c:4425,r:7.4,i:4117,v:2441,ai:18.0,w:58158,reg:"UK"},
  {name:"Bedford",lat:52.1300,lng:-0.4600,c:2184,r:3.4,i:2633,v:1947,ai:26.2,w:59182,reg:"UK"},
  {name:"Bermondsey and Old Southwark",lat:51.4617,lng:-0.0732,c:4236,r:7.8,i:3869,v:2688,ai:20.3,w:35869,reg:"UK"},
  {name:"Bethnal Green and Stepney",lat:51.5473,lng:-0.0681,c:1888,r:7.4,i:2413,v:1125,ai:27.2,w:64641,reg:"UK"},
  {name:"Beverley and Holderness",lat:53.8604,lng:-0.4212,c:1725,r:3.4,i:1549,v:797,ai:23.5,w:62009,reg:"UK"},
  {name:"Bexhill and Battle",lat:50.8550,lng:0.4687,c:3542,r:8.3,i:2983,v:2526,ai:26.9,w:58469,reg:"UK"},
  {name:"Bexleyheath and Crayford",lat:51.4441,lng:0.1568,c:1549,r:8.2,i:1496,v:1224,ai:27.7,w:46875,reg:"UK"},
  {name:"Birmingham Edgbaston",lat:52.4588,lng:-1.8704,c:3844,r:2.9,i:3319,v:1664,ai:26.9,w:59195,reg:"UK"},
  {name:"Birmingham Erdington",lat:52.5083,lng:-1.8810,c:4917,r:7.1,i:4795,v:3204,ai:17.6,w:35427,reg:"UK"},
  {name:"Birmingham Hall Green and Moseley",lat:52.4651,lng:-1.9024,c:3011,r:9.4,i:3061,v:2497,ai:25.9,w:41331,reg:"UK"},
  {name:"Birmingham Hodge Hill and Solihull North",lat:52.4712,lng:-1.8925,c:1810,r:6.5,i:1682,v:1050,ai:17.6,w:62300,reg:"UK"},
  {name:"Birmingham Ladywood",lat:52.4814,lng:-1.9189,c:3250,r:9.2,i:3283,v:2777,ai:22.0,w:50954,reg:"UK"},
  {name:"Birmingham Northfield",lat:52.4935,lng:-1.8866,c:2648,r:3.1,i:2123,v:2090,ai:18.1,w:49204,reg:"UK"},
  {name:"Birmingham Perry Barr",lat:52.4649,lng:-1.9034,c:2169,r:5.9,i:2337,v:1694,ai:17.3,w:51808,reg:"UK"},
  {name:"Birmingham Selly Oak",lat:52.4868,lng:-1.8897,c:4043,r:5.8,i:4369,v:3105,ai:26.9,w:48297,reg:"UK"},
  {name:"Birmingham Yardley",lat:52.4920,lng:-1.8674,c:2951,r:7.4,i:3028,v:1898,ai:21.7,w:63245,reg:"UK"},
  {name:"Bishop Auckland",lat:54.6600,lng:-1.6700,c:4757,r:3.7,i:5136,v:4132,ai:26.1,w:39114,reg:"UK"},
  {name:"Blackburn",lat:53.7400,lng:-2.4800,c:1310,r:5.3,i:1095,v:631,ai:16.9,w:55084,reg:"UK"},
  {name:"Blackley and Middleton South",lat:53.5430,lng:-2.1719,c:4092,r:9.1,i:3589,v:3043,ai:23.9,w:39289,reg:"UK"},
  {name:"Blackpool North and Fleetwood",lat:53.7897,lng:-3.0541,c:1722,r:9.6,i:1720,v:1064,ai:27.9,w:59973,reg:"UK"},
  {name:"Blackpool South",lat:53.8132,lng:-3.0536,c:2965,r:4.4,i:2662,v:1557,ai:24.7,w:35584,reg:"UK"},
  {name:"Blaenau Gwent and Rhymney",lat:51.7873,lng:-3.1617,c:875,r:4.3,i:972,v:552,ai:16.8,w:64552,reg:"UK"},
  {name:"Blaydon and Consett",lat:54.9553,lng:-1.6853,c:1240,r:3.8,i:1016,v:965,ai:19.2,w:38886,reg:"UK"},
  {name:"Blyth and Ashington",lat:55.0954,lng:-1.5265,c:4239,r:3.7,i:3707,v:3626,ai:22.8,w:56012,reg:"UK"},
  {name:"Bognor Regis and Littlehampton",lat:50.7550,lng:-0.6486,c:3690,r:5.1,i:3085,v:3195,ai:23.6,w:59048,reg:"UK"},
  {name:"Bolsover",lat:53.2200,lng:-1.2900,c:1079,r:8.8,i:1108,v:578,ai:22.6,w:62800,reg:"UK"},
  {name:"Bolton North East",lat:53.5430,lng:-2.4479,c:1925,r:2.6,i:2047,v:926,ai:17.3,w:39843,reg:"UK"},
  {name:"Bolton South and Walkden",lat:53.5608,lng:-2.4589,c:2110,r:4.1,i:2489,v:1074,ai:22.0,w:40336,reg:"UK"},
  {name:"Bolton West",lat:53.5961,lng:-2.4536,c:1851,r:1.6,i:2159,v:1208,ai:18.3,w:49242,reg:"UK"},
  {name:"Bootle",lat:53.4400,lng:-2.9800,c:4239,r:5.2,i:4440,v:3429,ai:20.7,w:50200,reg:"UK"},
  {name:"Boston and Skegness",lat:52.9643,lng:-0.0291,c:3688,r:9.9,i:3582,v:2979,ai:24.5,w:54079,reg:"UK"},
  {name:"Bournemouth East",lat:50.6951,lng:-1.8595,c:1028,r:2.6,i:858,v:778,ai:19.1,w:39897,reg:"UK"},
  {name:"Bournemouth West",lat:50.6995,lng:-1.8833,c:4456,r:7.2,i:4192,v:2153,ai:19.5,w:48783,reg:"UK"},
  {name:"Bracknell",lat:51.4100,lng:-0.7500,c:1905,r:9.7,i:2450,v:1239,ai:18.9,w:63970,reg:"UK"},
  {name:"Bradford East",lat:53.7721,lng:-1.7497,c:2100,r:4.5,i:1681,v:1175,ai:21.7,w:50082,reg:"UK"},
  {name:"Bradford South",lat:53.7783,lng:-1.7660,c:820,r:3.7,i:692,v:467,ai:16.5,w:35674,reg:"UK"},
  {name:"Bradford West",lat:53.7834,lng:-1.7604,c:3259,r:6.0,i:3830,v:2319,ai:24.6,w:61372,reg:"UK"},
  {name:"Braintree",lat:51.8700,lng:0.5500,c:4935,r:2.8,i:5734,v:3473,ai:16.5,w:60058,reg:"UK"},
  {name:"Brent East",lat:51.5403,lng:-0.2399,c:4546,r:6.8,i:5304,v:3621,ai:17.7,w:50712,reg:"UK"},
  {name:"Brent West",lat:51.5238,lng:-0.2881,c:4179,r:8.5,i:4563,v:3514,ai:24.2,w:55799,reg:"UK"},
  {name:"Brentford and Isleworth",lat:51.5476,lng:-0.2492,c:1358,r:4.6,i:1157,v:1099,ai:22.7,w:53833,reg:"UK"},
  {name:"Brentwood and Ongar",lat:51.5496,lng:-0.2860,c:2855,r:1.5,i:3422,v:2174,ai:22.0,w:51055,reg:"UK"},
  {name:"Bridgend",lat:51.5000,lng:-3.5700,c:3894,r:3.6,i:3260,v:1931,ai:24.8,w:41156,reg:"UK"},
  {name:"Bridgwater",lat:51.1200,lng:-3.0000,c:3907,r:9.8,i:4090,v:2189,ai:21.7,w:55510,reg:"UK"},
  {name:"Bridlington and The Wolds",lat:54.0946,lng:-0.2017,c:4021,r:6.7,i:4509,v:1578,ai:17.8,w:42618,reg:"UK"},
  {name:"Brigg and Immingham",lat:53.5605,lng:-0.4925,c:3184,r:1.6,i:2643,v:1585,ai:24.1,w:55765,reg:"UK"},
  {name:"Brighton Kemptown and Peacehaven",lat:50.8487,lng:-0.1038,c:2969,r:5.4,i:3067,v:1232,ai:26.7,w:40977,reg:"UK"},
  {name:"Brighton Pavilion",lat:50.8026,lng:-0.1033,c:873,r:5.4,i:1056,v:770,ai:21.4,w:43059,reg:"UK"},
  {name:"Bristol Central",lat:51.4692,lng:-2.5795,c:1684,r:6.4,i:1466,v:1074,ai:27.4,w:38978,reg:"UK"},
  {name:"Bristol East",lat:51.4202,lng:-2.5805,c:4524,r:7.5,i:4142,v:3817,ai:21.8,w:35745,reg:"UK"},
  {name:"Bristol North East",lat:51.4201,lng:-2.5650,c:2693,r:4.1,i:2343,v:1452,ai:19.8,w:60206,reg:"UK"},
  {name:"Bristol North West",lat:51.4423,lng:-2.5864,c:4324,r:2.5,i:5462,v:3209,ai:26.8,w:43694,reg:"UK"},
  {name:"Bristol South",lat:51.4261,lng:-2.5599,c:4994,r:6.5,i:4895,v:2923,ai:19.3,w:36448,reg:"UK"},
  {name:"Broadland and Fakenham",lat:52.6924,lng:1.3274,c:1999,r:9.5,i:1848,v:991,ai:22.1,w:40695,reg:"UK"},
  {name:"Bromley and Biggin Hill",lat:51.4132,lng:-0.0170,c:4513,r:8.4,i:5034,v:3846,ai:27.3,w:51476,reg:"UK"},
  {name:"Bromsgrove",lat:52.3300,lng:-2.0600,c:3875,r:5.3,i:4558,v:2729,ai:19.4,w:36469,reg:"UK"},
  {name:"Broxbourne",lat:51.7400,lng:-0.0200,c:4692,r:2.6,i:4861,v:2529,ai:19.6,w:57170,reg:"UK"},
  {name:"Broxtowe",lat:52.9600,lng:-1.2000,c:4900,r:3.7,i:5527,v:2525,ai:22.7,w:46831,reg:"UK"},
  {name:"Buckingham and Bletchley",lat:52.0144,lng:-0.9502,c:1502,r:2.9,i:1357,v:1274,ai:22.0,w:41600,reg:"UK"},
  {name:"Burnley",lat:53.7800,lng:-2.2400,c:2689,r:2.7,i:2409,v:1075,ai:20.1,w:37732,reg:"UK"},
  {name:"Burton and Uttoxeter",lat:52.7948,lng:-1.6385,c:1804,r:3.7,i:1956,v:1511,ai:25.0,w:47383,reg:"UK"},
  {name:"Bury North",lat:53.5900,lng:-2.2900,c:2382,r:4.4,i:1979,v:1197,ai:27.6,w:38776,reg:"UK"},
  {name:"Bury South",lat:53.5800,lng:-2.3000,c:2914,r:6.9,i:3588,v:1366,ai:19.3,w:42453,reg:"UK"},
  {name:"Bury St Edmunds and Stowmarket",lat:52.2119,lng:0.7226,c:2478,r:5.3,i:3164,v:2023,ai:26.5,w:35654,reg:"UK"},
  {name:"Caerfyrddin",lat:51.8500,lng:-4.3100,c:4561,r:5.5,i:4987,v:1596,ai:20.7,w:62804,reg:"UK"},
  {name:"Caerphilly",lat:51.5700,lng:-3.2100,c:4267,r:8.8,i:5487,v:2076,ai:17.3,w:39631,reg:"UK"},
  {name:"Calder Valley",lat:53.7000,lng:-1.9000,c:2993,r:7.3,i:3803,v:2235,ai:23.8,w:57944,reg:"UK"},
  {name:"Camborne and Redruth",lat:50.2187,lng:-5.3118,c:2720,r:6.2,i:2229,v:2122,ai:18.8,w:62597,reg:"UK"},
  {name:"Cambridge",lat:52.2000,lng:0.1200,c:1337,r:3.6,i:1494,v:981,ai:17.3,w:37110,reg:"UK"},
  {name:"Cannock Chase",lat:52.6681,lng:-2.0224,c:3002,r:6.5,i:2984,v:1419,ai:23.2,w:35313,reg:"UK"},
  {name:"Canterbury",lat:51.2700,lng:1.0800,c:4827,r:7.0,i:5994,v:2951,ai:18.8,w:42411,reg:"UK"},
  {name:"Carlisle",lat:54.8900,lng:-2.9300,c:4834,r:7.5,i:4610,v:1749,ai:22.0,w:55233,reg:"UK"},
  {name:"Carmarthen",lat:51.8500,lng:-4.3100,c:2564,r:3.7,i:2906,v:2202,ai:18.7,w:36022,reg:"UK"},
  {name:"Ceredigion Preseli",lat:52.2503,lng:-4.1677,c:2219,r:5.1,i:2532,v:1018,ai:25.6,w:57173,reg:"UK"},
  {name:"Chatham and Aylesford",lat:51.3677,lng:0.5471,c:4873,r:4.1,i:5896,v:2324,ai:18.7,w:57814,reg:"UK"},
  {name:"Cheadle",lat:53.3900,lng:-2.2000,c:2882,r:3.1,i:2627,v:1669,ai:24.0,w:63462,reg:"UK"},
  {name:"Chelmsford",lat:51.7300,lng:0.4700,c:1414,r:4.8,i:1281,v:1252,ai:17.7,w:36555,reg:"UK"},
  {name:"Chelsea and Fulham",lat:51.5059,lng:-0.1802,c:1052,r:4.8,i:1314,v:879,ai:24.8,w:64925,reg:"UK"},
  {name:"Cheltenham",lat:51.8900,lng:-2.0700,c:1579,r:9.5,i:1852,v:580,ai:24.0,w:46358,reg:"UK"},
  {name:"Chesham and Amersham",lat:51.7273,lng:-0.6226,c:2370,r:4.3,i:2096,v:833,ai:19.4,w:45544,reg:"UK"},
  {name:"Chester North and Neston",lat:53.1630,lng:-2.8916,c:4849,r:3.3,i:4743,v:3888,ai:25.9,w:47973,reg:"UK"},
  {name:"Chester South and Eddisbury",lat:53.1846,lng:-2.8713,c:2365,r:9.3,i:2120,v:1301,ai:26.8,w:35908,reg:"UK"},
  {name:"Chesterfield",lat:53.2300,lng:-1.4300,c:4020,r:1.8,i:3286,v:1545,ai:27.0,w:42710,reg:"UK"},
  {name:"Chichester",lat:50.8300,lng:-0.7800,c:3938,r:9.1,i:3818,v:1968,ai:27.5,w:53509,reg:"UK"},
  {name:"Chingford and Woodford Green",lat:51.6550,lng:0.0080,c:1901,r:7.6,i:1821,v:953,ai:16.0,w:57669,reg:"UK"},
  {name:"Chippenham",lat:51.4500,lng:-2.1100,c:4761,r:1.7,i:4365,v:2910,ai:27.5,w:63617,reg:"UK"},
  {name:"Chipping Barnet",lat:51.6500,lng:-0.2000,c:2423,r:3.6,i:2459,v:1505,ai:27.1,w:40488,reg:"UK"},
  {name:"Chorley",lat:53.6500,lng:-2.6200,c:4170,r:7.8,i:5051,v:3231,ai:23.3,w:44833,reg:"UK"},
  {name:"Christchurch",lat:50.7300,lng:-1.7700,c:2142,r:4.6,i:2551,v:842,ai:18.4,w:57586,reg:"UK"},
  {name:"Cities of London and Westminster",lat:54.2669,lng:-0.5244,c:1838,r:2.1,i:1501,v:1201,ai:19.9,w:64407,reg:"UK"},
  {name:"City of Chester",lat:53.1741,lng:-2.8950,c:1912,r:2.2,i:1621,v:1193,ai:24.5,w:48408,reg:"UK"},
  {name:"Clacton",lat:51.7800,lng:1.1400,c:3405,r:7.2,i:3997,v:2777,ai:24.0,w:38634,reg:"UK"},
  {name:"Clapham and Brixton Hill",lat:51.4448,lng:-0.1453,c:4331,r:4.0,i:4692,v:2404,ai:24.9,w:40975,reg:"UK"},
  {name:"Clwyd East",lat:53.1004,lng:-3.1161,c:1443,r:9.0,i:1571,v:764,ai:20.8,w:64773,reg:"UK"},
  {name:"Clwyd North",lat:53.1204,lng:-3.0751,c:4195,r:7.1,i:5434,v:1704,ai:21.7,w:59573,reg:"UK"},
  {name:"Coatbridge and Bellshill",lat:55.8858,lng:-4.0377,c:969,r:4.0,i:832,v:440,ai:27.7,w:52495,reg:"UK"},
  {name:"Colchester",lat:51.8900,lng:0.9000,c:4437,r:5.3,i:4126,v:3450,ai:27.3,w:38173,reg:"UK"},
  {name:"Colne Valley",lat:53.6000,lng:-1.8500,c:3303,r:6.8,i:3001,v:1825,ai:17.7,w:41119,reg:"UK"},
  {name:"Congleton",lat:53.1600,lng:-2.2100,c:1870,r:6.6,i:2105,v:863,ai:16.1,w:44817,reg:"UK"},
  {name:"Corby and East Northamptonshire",lat:52.4638,lng:-0.7139,c:3648,r:3.1,i:3487,v:1684,ai:25.5,w:51441,reg:"UK"},
  {name:"Coventry East",lat:52.3946,lng:-1.5230,c:2460,r:6.2,i:2754,v:984,ai:18.0,w:55862,reg:"UK"},
  {name:"Coventry North West",lat:52.4219,lng:-1.4802,c:2091,r:9.6,i:1999,v:1383,ai:20.3,w:47493,reg:"UK"},
  {name:"Coventry South",lat:52.3954,lng:-1.4908,c:2327,r:3.2,i:2708,v:1075,ai:16.1,w:62048,reg:"UK"},
  {name:"Crawley",lat:51.1100,lng:-0.1800,c:2506,r:9.0,i:2582,v:1101,ai:16.2,w:51546,reg:"UK"},
  {name:"Crewe and Nantwich",lat:53.0688,lng:-2.4430,c:3490,r:9.2,i:2947,v:2415,ai:20.5,w:50133,reg:"UK"},
  {name:"Croydon East",lat:51.3518,lng:-0.1224,c:2988,r:9.4,i:2552,v:1851,ai:25.7,w:64006,reg:"UK"},
  {name:"Croydon South",lat:51.3943,lng:-0.0928,c:4760,r:9.8,i:4956,v:1805,ai:27.1,w:46636,reg:"UK"},
  {name:"Croydon West",lat:51.3898,lng:-0.1190,c:4263,r:2.9,i:5085,v:2012,ai:20.9,w:60390,reg:"UK"},
  {name:"Dagenham and Rainham",lat:51.5435,lng:0.1638,c:1716,r:4.9,i:1817,v:962,ai:17.5,w:42411,reg:"UK"},
  {name:"Darlington",lat:54.5200,lng:-1.5500,c:972,r:6.3,i:1145,v:360,ai:26.1,w:38531,reg:"UK"},
  {name:"Dartford",lat:51.4400,lng:0.2100,c:3317,r:6.2,i:3693,v:1719,ai:21.0,w:52478,reg:"UK"},
  {name:"Daventry",lat:52.2600,lng:-1.1600,c:2588,r:7.1,i:2648,v:1529,ai:16.3,w:53566,reg:"UK"},
  {name:"Denton and Reddish",lat:53.4484,lng:-2.1336,c:2855,r:3.5,i:3373,v:2224,ai:21.5,w:40387,reg:"UK"},
  {name:"Derby North",lat:52.9282,lng:-1.4951,c:1339,r:5.2,i:1132,v:794,ai:22.1,w:36223,reg:"UK"},
  {name:"Derby South",lat:52.9471,lng:-1.4918,c:3880,r:8.1,i:4096,v:1473,ai:22.0,w:46335,reg:"UK"},
  {name:"Devizes",lat:51.3500,lng:-1.9900,c:4399,r:10.0,i:5129,v:3511,ai:18.3,w:64451,reg:"UK"},
  {name:"Dewsbury and Batley",lat:53.6539,lng:-1.6289,c:2865,r:9.6,i:3604,v:1262,ai:25.5,w:62917,reg:"UK"},
  {name:"Didcot and Wantage",lat:51.6101,lng:-1.2148,c:3975,r:2.8,i:4961,v:1992,ai:25.8,w:39307,reg:"UK"},
  {name:"Doncaster Central",lat:53.4997,lng:-1.0938,c:1674,r:3.7,i:1762,v:879,ai:16.4,w:40462,reg:"UK"},
  {name:"Doncaster East and the Isle of Axholme",lat:53.5282,lng:-1.1284,c:3654,r:9.1,i:3231,v:2856,ai:17.4,w:50921,reg:"UK"},
  {name:"Doncaster North",lat:53.5278,lng:-1.1263,c:4466,r:6.2,i:4868,v:3730,ai:17.3,w:64788,reg:"UK"},
  {name:"Dorking and Horley",lat:51.2265,lng:-0.3494,c:4150,r:3.8,i:5375,v:2770,ai:20.3,w:57939,reg:"UK"},
  {name:"Dover and Deal",lat:51.1252,lng:1.3198,c:3923,r:1.9,i:4746,v:1920,ai:23.7,w:64521,reg:"UK"},
  {name:"Dudley",lat:52.5100,lng:-2.0800,c:2113,r:1.5,i:1726,v:913,ai:23.4,w:47966,reg:"UK"},
  {name:"Dulwich and West Norwood",lat:51.4102,lng:-0.0887,c:2953,r:9.1,i:2557,v:1402,ai:23.8,w:35668,reg:"UK"},
  {name:"Dumfries and Galloway",lat:55.0774,lng:-3.6015,c:1246,r:4.5,i:1136,v:836,ai:23.1,w:41125,reg:"UK"},
  {name:"Dumfriesshire, Clydesdale and Tweeddale",lat:55.0923,lng:-3.5831,c:1365,r:9.5,i:1258,v:589,ai:17.1,w:54146,reg:"UK"},
  {name:"Dundee Central",lat:56.4687,lng:-2.9734,c:2488,r:3.7,i:2004,v:1753,ai:22.7,w:45509,reg:"UK"},
  {name:"Dunfermline and Dollar",lat:56.0644,lng:-3.4757,c:4736,r:7.7,i:4377,v:4011,ai:16.5,w:50945,reg:"UK"},
  {name:"Dunstable and Leighton Buzzard",lat:51.8620,lng:-0.5135,c:1045,r:8.1,i:842,v:682,ai:27.3,w:39267,reg:"UK"},
  {name:"Durham",lat:54.7700,lng:-1.5700,c:2929,r:7.0,i:3534,v:1306,ai:19.7,w:44007,reg:"UK"},
  {name:"Ealing Central and Acton",lat:51.5247,lng:-0.3021,c:1003,r:9.1,i:1195,v:745,ai:16.1,w:60332,reg:"UK"},
  {name:"Ealing North",lat:51.5001,lng:-0.2850,c:3915,r:5.3,i:3574,v:1596,ai:18.8,w:36164,reg:"UK"},
  {name:"Ealing Southall",lat:51.5273,lng:-0.2986,c:3719,r:8.7,i:4298,v:1845,ai:22.6,w:48081,reg:"UK"},
  {name:"Easington",lat:54.7800,lng:-1.3500,c:1914,r:7.0,i:2454,v:898,ai:26.6,w:35456,reg:"UK"},
  {name:"East Grinstead and Uckfield",lat:51.1428,lng:-0.0203,c:1893,r:3.5,i:2218,v:1646,ai:25.0,w:44806,reg:"UK"},
  {name:"East Ham",lat:51.5300,lng:0.0500,c:1804,r:9.2,i:2012,v:1318,ai:24.0,w:64370,reg:"UK"},
  {name:"East Hampshire",lat:51.0200,lng:-0.9300,c:2771,r:8.6,i:3183,v:2276,ai:21.2,w:56738,reg:"UK"},
  {name:"East Surrey",lat:51.2400,lng:0.0500,c:3195,r:4.1,i:2894,v:2212,ai:16.9,w:62323,reg:"UK"},
  {name:"East Thanet",lat:51.3500,lng:1.4000,c:1407,r:1.7,i:1200,v:1211,ai:20.1,w:39255,reg:"UK"},
  {name:"East Wiltshire",lat:51.3500,lng:-1.8000,c:920,r:1.9,i:1054,v:642,ai:24.4,w:57103,reg:"UK"},
  {name:"East Worthing and Shoreham",lat:50.7840,lng:-0.3479,c:1076,r:6.5,i:1056,v:860,ai:25.8,w:61738,reg:"UK"},
  {name:"Eastbourne",lat:50.7600,lng:0.2800,c:4640,r:9.5,i:3960,v:2149,ai:17.3,w:36032,reg:"UK"},
  {name:"Eastleigh",lat:50.9600,lng:-1.3500,c:4360,r:8.4,i:4870,v:3504,ai:23.6,w:43620,reg:"UK"},
  {name:"Edinburgh East and Musselburgh",lat:55.9213,lng:-3.2046,c:1219,r:2.3,i:1436,v:564,ai:19.8,w:47712,reg:"UK"},
  {name:"Edinburgh North and Leith",lat:55.9711,lng:-3.1829,c:1986,r:7.6,i:1954,v:1045,ai:27.6,w:50112,reg:"UK"},
  {name:"Edinburgh South",lat:55.9523,lng:-3.2070,c:930,r:5.0,i:946,v:720,ai:20.2,w:56139,reg:"UK"},
  {name:"Edinburgh South West",lat:55.9657,lng:-3.1613,c:4421,r:2.3,i:5348,v:1961,ai:16.0,w:41061,reg:"UK"},
  {name:"Edinburgh West",lat:55.9408,lng:-3.1701,c:818,r:5.7,i:855,v:644,ai:18.2,w:49837,reg:"UK"},
  {name:"Edmonton and Winchmore Green",lat:51.5966,lng:-0.0518,c:1894,r:9.5,i:1783,v:886,ai:24.4,w:49949,reg:"UK"},
  {name:"Ellesmere Port and Bromborough",lat:53.2641,lng:-2.8963,c:1139,r:8.2,i:1308,v:891,ai:23.5,w:45668,reg:"UK"},
  {name:"Eltham and Chislehurst",lat:51.4741,lng:0.0501,c:4539,r:2.2,i:5647,v:1651,ai:18.5,w:42895,reg:"UK"},
  {name:"Enfield North",lat:51.6652,lng:-0.0712,c:2393,r:9.0,i:2193,v:1444,ai:22.4,w:57634,reg:"UK"},
  {name:"Epping Forest",lat:51.6900,lng:0.1100,c:2263,r:4.3,i:1986,v:1841,ai:23.9,w:57259,reg:"UK"},
  {name:"Epsom and Ewell",lat:51.3531,lng:-0.2857,c:1512,r:5.2,i:1794,v:1010,ai:17.5,w:48860,reg:"UK"},
  {name:"Erewash",lat:52.9300,lng:-1.3100,c:1604,r:4.1,i:1847,v:1305,ai:17.9,w:39679,reg:"UK"},
  {name:"Erith and Thamesmead",lat:51.5085,lng:0.1837,c:1839,r:4.3,i:1951,v:806,ai:19.9,w:40678,reg:"UK"},
  {name:"Esher and Walton",lat:51.3840,lng:-0.3639,c:1227,r:9.7,i:1043,v:688,ai:27.8,w:58846,reg:"UK"},
  {name:"Exeter",lat:50.7100,lng:-3.5300,c:1624,r:6.9,i:1385,v:752,ai:20.7,w:36017,reg:"UK"},
  {name:"Exmouth and Exeter East",lat:50.6885,lng:-3.5238,c:2475,r:8.2,i:2838,v:1547,ai:23.6,w:48898,reg:"UK"},
  {name:"Fareham and Waterlooville",lat:50.8453,lng:-1.1963,c:2499,r:7.8,i:3133,v:1465,ai:22.9,w:57473,reg:"UK"},
  {name:"Faversham and Mid Kent",lat:51.3185,lng:0.8872,c:3833,r:9.0,i:4549,v:2817,ai:26.2,w:55387,reg:"UK"},
  {name:"Feltham and Heston",lat:51.4578,lng:0.0350,c:2114,r:6.8,i:1794,v:1227,ai:25.4,w:56394,reg:"UK"},
  {name:"Fermanagh and South Tyrone",lat:54.3310,lng:-7.6207,c:2579,r:5.4,i:2864,v:1483,ai:24.1,w:62905,reg:"UK"},
  {name:"Filton and Bradley Stoke",lat:51.4797,lng:-2.5431,c:4068,r:4.8,i:4250,v:3604,ai:16.5,w:51300,reg:"UK"},
  {name:"Finchley and Golders Green",lat:51.6007,lng:-0.1716,c:4750,r:5.9,i:4040,v:3163,ai:22.5,w:56518,reg:"UK"},
  {name:"Folkestone and Hythe",lat:51.0735,lng:1.1858,c:4281,r:5.9,i:4303,v:3730,ai:18.5,w:55530,reg:"UK"},
  {name:"Forest of Dean",lat:51.7900,lng:-2.5300,c:1314,r:9.9,i:1284,v:500,ai:19.3,w:46990,reg:"UK"},
  {name:"Fylde",lat:53.7900,lng:-2.9800,c:855,r:5.1,i:863,v:627,ai:20.2,w:42954,reg:"UK"},
  {name:"Gainsborough",lat:53.4000,lng:-0.7700,c:1742,r:7.8,i:2212,v:1114,ai:18.6,w:59044,reg:"UK"},
  {name:"Gateshead Central and Whickley",lat:54.9481,lng:-1.5963,c:2446,r:3.3,i:2114,v:1900,ai:25.7,w:54028,reg:"UK"},
  {name:"Gedling",lat:52.9800,lng:-1.0700,c:1749,r:9.7,i:1708,v:1226,ai:25.8,w:59485,reg:"UK"},
  {name:"Gillingham and Rainham",lat:51.4010,lng:0.5360,c:2766,r:4.0,i:2971,v:1158,ai:26.0,w:45642,reg:"UK"},
  {name:"Glasgow East",lat:55.8469,lng:-4.2653,c:2379,r:3.7,i:2410,v:1075,ai:16.0,w:56653,reg:"UK"},
  {name:"Glasgow North",lat:55.8857,lng:-4.2287,c:2067,r:5.6,i:2096,v:1447,ai:23.9,w:45872,reg:"UK"},
  {name:"Glasgow North East",lat:55.8680,lng:-4.2791,c:1039,r:8.5,i:1301,v:811,ai:17.7,w:59939,reg:"UK"},
  {name:"Glasgow South",lat:55.8440,lng:-4.2334,c:848,r:9.6,i:956,v:413,ai:17.2,w:39281,reg:"UK"},
  {name:"Glasgow South West",lat:55.8665,lng:-4.2331,c:2255,r:2.8,i:2823,v:1771,ai:18.0,w:61734,reg:"UK"},
  {name:"Glasgow West",lat:55.8618,lng:-4.2355,c:3607,r:9.1,i:4306,v:2926,ai:18.4,w:55783,reg:"UK"},
  {name:"Gloucester",lat:51.8600,lng:-2.2400,c:2642,r:9.0,i:2846,v:1309,ai:18.8,w:39180,reg:"UK"},
  {name:"Godalming and Ash",lat:51.1824,lng:-0.5782,c:2870,r:2.0,i:2966,v:1232,ai:21.9,w:49945,reg:"UK"},
  {name:"Goole and Pocklington",lat:53.6925,lng:-0.8749,c:827,r:8.6,i:855,v:545,ai:24.0,w:60216,reg:"UK"},
  {name:"Gordon and Buchan",lat:57.2810,lng:-2.3541,c:4834,r:2.1,i:5406,v:3383,ai:16.3,w:53290,reg:"UK"},
  {name:"Gosport",lat:50.7970,lng:-1.1240,c:2100,r:2.9,i:2300,v:950,ai:18.5,w:36016,reg:"UK"},
  {name:"Gower",lat:51.5900,lng:-4.1100,c:3816,r:6.8,i:3698,v:3144,ai:20.4,w:49236,reg:"UK"},
  {name:"Grantham and Bourne",lat:52.9296,lng:-0.6524,c:3007,r:8.0,i:2722,v:1772,ai:21.1,w:51620,reg:"UK"},
  {name:"Gravesham",lat:51.4400,lng:0.3900,c:4276,r:4.9,i:4497,v:2135,ai:22.1,w:64249,reg:"UK"},
  {name:"Great Grimsby and Cleethorpes",lat:53.5681,lng:-0.0629,c:3549,r:8.2,i:3426,v:1861,ai:19.6,w:52593,reg:"UK"},
  {name:"Great Yarmouth",lat:52.5900,lng:1.7200,c:968,r:7.6,i:1203,v:629,ai:16.6,w:44012,reg:"UK"},
  {name:"Greenwich and Woolwich",lat:51.5046,lng:0.0067,c:826,r:3.1,i:1041,v:565,ai:23.9,w:58670,reg:"UK"},
  {name:"Guildford",lat:51.2300,lng:-0.5700,c:3390,r:6.8,i:3892,v:2298,ai:24.2,w:41375,reg:"UK"},
  {name:"Hackney North and Stoke Newington",lat:51.5565,lng:-0.0352,c:3601,r:5.4,i:4253,v:1461,ai:18.2,w:36109,reg:"UK"},
  {name:"Hackney South and Shoreditch",lat:51.5281,lng:-0.0647,c:3554,r:4.6,i:4304,v:2781,ai:22.7,w:42740,reg:"UK"},
  {name:"Halesowen",lat:52.4400,lng:-2.0500,c:2137,r:5.2,i:2395,v:1845,ai:16.7,w:52025,reg:"UK"},
  {name:"Halifax",lat:53.7200,lng:-1.8500,c:965,r:2.5,i:1162,v:643,ai:27.0,w:48394,reg:"UK"},
  {name:"Hamble Valley",lat:50.9000,lng:-1.3000,c:859,r:4.8,i:941,v:743,ai:27.8,w:49263,reg:"UK"},
  {name:"Hamilton and Clyde Valley",lat:55.7403,lng:-4.0190,c:2532,r:2.4,i:2841,v:1181,ai:17.8,w:35465,reg:"UK"},
  {name:"Hammersmith and Chiswick",lat:51.5032,lng:-0.2455,c:1311,r:9.7,i:1106,v:1085,ai:17.5,w:35533,reg:"UK"},
  {name:"Hampstead and Highgate",lat:51.5638,lng:-0.1949,c:3880,r:3.1,i:3201,v:3009,ai:24.6,w:60664,reg:"UK"},
  {name:"Harborough, Oadby and Wigston",lat:52.4830,lng:-0.9493,c:3440,r:7.5,i:3544,v:2967,ai:19.0,w:63929,reg:"UK"},
  {name:"Harlow",lat:51.7700,lng:0.1200,c:861,r:7.0,i:1040,v:339,ai:19.7,w:56883,reg:"UK"},
  {name:"Harrow East",lat:51.5763,lng:-0.3194,c:1497,r:8.8,i:1561,v:573,ai:20.4,w:52248,reg:"UK"},
  {name:"Harrow West",lat:51.5731,lng:-0.3128,c:1408,r:8.3,i:1382,v:992,ai:23.6,w:47538,reg:"UK"},
  {name:"Hartlepool",lat:54.6800,lng:-1.2100,c:4768,r:8.2,i:5165,v:2435,ai:16.7,w:64218,reg:"UK"},
  {name:"Harwich and North Essex",lat:51.9361,lng:1.2485,c:3753,r:8.5,i:3625,v:2564,ai:27.7,w:59938,reg:"UK"},
  {name:"Hastings and Rye",lat:50.8684,lng:0.5570,c:2599,r:9.0,i:2568,v:1888,ai:23.2,w:61883,reg:"UK"},
  {name:"Havant",lat:50.8509,lng:-0.9835,c:807,r:3.7,i:816,v:542,ai:25.8,w:61623,reg:"UK"},
  {name:"Hayes and Harlington",lat:51.5211,lng:-0.4016,c:977,r:8.6,i:1178,v:807,ai:22.9,w:43215,reg:"UK"},
  {name:"Hemel Hempstead",lat:51.7500,lng:-0.4400,c:3675,r:9.3,i:3577,v:1458,ai:22.6,w:58921,reg:"UK"},
  {name:"Hend Hendon",lat:51.5779,lng:-0.2376,c:1641,r:7.9,i:2077,v:785,ai:23.3,w:55329,reg:"UK"},
  {name:"Hereford and South Herefordshire",lat:52.0663,lng:-2.7260,c:1869,r:7.9,i:2235,v:1126,ai:17.1,w:59197,reg:"UK"},
  {name:"Hertford and Stortford",lat:51.7713,lng:-0.0985,c:3234,r:9.1,i:4018,v:2060,ai:21.7,w:52679,reg:"UK"},
  {name:"Hertsmere",lat:51.6500,lng:-0.2700,c:1558,r:7.5,i:1529,v:1028,ai:20.8,w:50516,reg:"UK"},
  {name:"Hexham",lat:54.9700,lng:-2.1000,c:1425,r:1.9,i:1850,v:791,ai:17.3,w:53982,reg:"UK"},
  {name:"Heywood and Middleton North",lat:53.5620,lng:-2.1806,c:4106,r:2.8,i:4510,v:2216,ai:22.2,w:35617,reg:"UK"},
  {name:"High Peak",lat:53.3300,lng:-1.8500,c:4437,r:5.6,i:4807,v:2191,ai:25.4,w:47778,reg:"UK"},
  {name:"Hinchley and Bosworth",lat:52.5521,lng:-1.4292,c:4775,r:8.0,i:5774,v:4201,ai:19.0,w:36136,reg:"UK"},
  {name:"Hitchin",lat:51.9400,lng:-0.2800,c:1151,r:1.9,i:1241,v:954,ai:21.5,w:63416,reg:"UK"},
  {name:"Holborn and St Pancras",lat:51.4954,lng:-0.1161,c:4621,r:2.0,i:5078,v:2627,ai:17.4,w:63778,reg:"UK"},
  {name:"Honiton and Sidmouth",lat:50.8179,lng:-3.1605,c:3490,r:9.6,i:3960,v:1976,ai:21.4,w:39791,reg:"UK"},
  {name:"Hornchurch and Upminster",lat:51.5702,lng:0.1828,c:1731,r:1.8,i:1606,v:940,ai:26.8,w:62137,reg:"UK"},
  {name:"Hornsey and Friern Barnet",lat:51.5953,lng:-0.0836,c:4102,r:7.5,i:4607,v:3658,ai:16.7,w:39343,reg:"UK"},
  {name:"Horsham",lat:51.0700,lng:-0.3200,c:3642,r:4.0,i:3990,v:2792,ai:17.3,w:44717,reg:"UK"},
  {name:"Houghton and Sunderland South",lat:54.8507,lng:-1.4692,c:1879,r:2.6,i:1955,v:831,ai:18.9,w:39294,reg:"UK"},
  {name:"Hove and Portslade",lat:50.8520,lng:-0.1467,c:3812,r:3.2,i:3118,v:3279,ai:18.6,w:63019,reg:"UK"},
  {name:"Huddersfield",lat:53.6400,lng:-1.7800,c:1387,r:5.3,i:1176,v:1193,ai:26.1,w:53851,reg:"UK"},
  {name:"Huntingdon",lat:52.3300,lng:-0.1800,c:2699,r:4.4,i:3269,v:1653,ai:23.5,w:39283,reg:"UK"},
  {name:"Hyndburn",lat:53.7500,lng:-2.3700,c:1730,r:2.0,i:2001,v:1132,ai:17.7,w:61121,reg:"UK"},
  {name:"Ilford North",lat:51.5301,lng:0.0695,c:1918,r:5.0,i:1683,v:957,ai:26.1,w:45035,reg:"UK"},
  {name:"Ilford South",lat:51.5601,lng:0.0527,c:2135,r:9.2,i:1829,v:1896,ai:16.7,w:61851,reg:"UK"},
  {name:"Inverclyde and Renfrewshire West",lat:55.9499,lng:-4.7245,c:2805,r:3.9,i:2605,v:1292,ai:20.4,w:64730,reg:"UK"},
  {name:"Inverness, Skye and West Ross-shire",lat:57.4987,lng:-4.2490,c:1209,r:4.0,i:1508,v:461,ai:24.7,w:43805,reg:"UK"},
  {name:"Ipswich",lat:52.0500,lng:1.1500,c:4189,r:4.4,i:3644,v:1470,ai:26.0,w:50797,reg:"UK"},
  {name:"Isle of Wight East",lat:50.6708,lng:-1.2938,c:1580,r:5.2,i:1984,v:742,ai:22.9,w:39142,reg:"UK"},
  {name:"Isle of Wight West",lat:50.6764,lng:-1.3276,c:3788,r:3.2,i:3180,v:1507,ai:23.3,w:49864,reg:"UK"},
  {name:"Islington North",lat:51.5440,lng:-0.1055,c:3372,r:7.5,i:4065,v:2261,ai:18.4,w:36970,reg:"UK"},
  {name:"Islington South and Finsbury",lat:51.5296,lng:-0.1291,c:3830,r:2.0,i:4616,v:2046,ai:26.1,w:60935,reg:"UK"},
  {name:"Jarrow and Gateshead East",lat:54.9420,lng:-1.6202,c:4622,r:5.6,i:5712,v:2294,ai:18.2,w:59948,reg:"UK"},
  {name:"Keighley and Ilkley",lat:53.8372,lng:-1.8971,c:2358,r:6.6,i:1891,v:1499,ai:21.3,w:50468,reg:"UK"},
  {name:"Kensington and Bayswater",lat:51.4737,lng:-0.1676,c:4229,r:8.9,i:4061,v:3134,ai:20.6,w:57539,reg:"UK"},
  {name:"Kettering",lat:52.3900,lng:-0.7200,c:4807,r:5.7,i:5079,v:3085,ai:22.4,w:35620,reg:"UK"},
  {name:"Kilmarnock and Loudoun",lat:55.5818,lng:-4.5142,c:4863,r:3.4,i:4333,v:1976,ai:19.0,w:59514,reg:"UK"},
  {name:"Kingston and Surbiton",lat:51.4122,lng:-0.3038,c:3735,r:3.2,i:3021,v:2538,ai:22.9,w:50687,reg:"UK"},
  {name:"Kingswinford and South Staffordshire",lat:52.4768,lng:-2.1827,c:4452,r:7.6,i:3662,v:1859,ai:21.9,w:50022,reg:"UK"},
  {name:"Knowsley",lat:53.4500,lng:-2.8500,c:2503,r:2.7,i:2743,v:2061,ai:17.8,w:52185,reg:"UK"},
  {name:"Lancaster and Wyre",lat:54.0604,lng:-2.7985,c:3935,r:2.9,i:4773,v:3406,ai:20.7,w:47614,reg:"UK"},
  {name:"Leeds Central and Headingley",lat:53.7961,lng:-1.5111,c:2461,r:9.5,i:2924,v:1319,ai:18.9,w:45052,reg:"UK"},
  {name:"Leeds East",lat:53.8275,lng:-1.5139,c:4178,r:9.3,i:5045,v:3410,ai:16.6,w:50521,reg:"UK"},
  {name:"Leeds North East",lat:53.7960,lng:-1.5397,c:1846,r:5.1,i:2060,v:1016,ai:22.4,w:37077,reg:"UK"},
  {name:"Leeds North West",lat:53.8186,lng:-1.5169,c:887,r:2.7,i:1139,v:689,ai:27.2,w:53996,reg:"UK"},
  {name:"Leeds South",lat:53.8025,lng:-1.5145,c:4515,r:1.8,i:5060,v:2240,ai:24.1,w:43202,reg:"UK"},
  {name:"Leeds South West and Morley",lat:53.7883,lng:-1.5311,c:3409,r:3.6,i:3614,v:2006,ai:27.4,w:43625,reg:"UK"},
  {name:"Leicester East",lat:52.6320,lng:-1.1511,c:1305,r:6.6,i:1667,v:825,ai:19.2,w:48992,reg:"UK"},
  {name:"Leicester South",lat:52.6053,lng:-1.1272,c:1320,r:2.6,i:1249,v:757,ai:19.5,w:42302,reg:"UK"},
  {name:"Leicester West",lat:52.6277,lng:-1.1271,c:4326,r:6.7,i:4694,v:3061,ai:18.4,w:56310,reg:"UK"},
  {name:"Leighton",lat:53.2663,lng:-1.3286,c:3373,r:5.5,i:3222,v:1629,ai:18.7,w:50373,reg:"UK"},
  {name:"Lewes",lat:50.8700,lng:0.0100,c:849,r:4.5,i:1045,v:408,ai:22.7,w:49742,reg:"UK"},
  {name:"Lewisham East",lat:51.4623,lng:-0.0136,c:1996,r:9.9,i:1891,v:1546,ai:17.9,w:37003,reg:"UK"},
  {name:"Lewisham North",lat:51.4676,lng:0.0043,c:1060,r:4.8,i:1081,v:799,ai:17.3,w:41755,reg:"UK"},
  {name:"Lewisham West and East Dulwich",lat:51.4593,lng:-0.0789,c:1448,r:4.4,i:1413,v:1044,ai:23.4,w:60499,reg:"UK"},
  {name:"Leyton and Wanstead",lat:51.5849,lng:-0.0324,c:3902,r:7.8,i:4603,v:2385,ai:25.4,w:56256,reg:"UK"},
  {name:"Lichfield",lat:52.6800,lng:-1.8200,c:4457,r:1.5,i:5271,v:2996,ai:22.0,w:63882,reg:"UK"},
  {name:"Lincoln",lat:53.2300,lng:-0.5400,c:3202,r:5.1,i:3816,v:2657,ai:23.3,w:46386,reg:"UK"},
  {name:"Liverpool Garston",lat:53.3931,lng:-3.0007,c:2699,r:5.4,i:3134,v:1379,ai:20.7,w:51660,reg:"UK"},
  {name:"Liverpool Riverside",lat:53.3787,lng:-2.9855,c:4105,r:8.7,i:4309,v:2439,ai:18.2,w:44120,reg:"UK"},
  {name:"Liverpool Walton",lat:53.4275,lng:-3.0077,c:3242,r:2.2,i:4085,v:1712,ai:26.1,w:60144,reg:"UK"},
  {name:"Liverpool Wavertree",lat:53.4252,lng:-2.9736,c:2591,r:9.2,i:2086,v:974,ai:22.8,w:49920,reg:"UK"},
  {name:"Liverpool West Derby",lat:52.9115,lng:-1.4643,c:3061,r:10.0,i:3240,v:1942,ai:24.2,w:46685,reg:"UK"},
  {name:"Loughborough",lat:52.7700,lng:-1.2000,c:2274,r:9.6,i:2588,v:1452,ai:17.2,w:46232,reg:"UK"},
  {name:"Louth and Horncastle",lat:53.3564,lng:0.0075,c:2483,r:6.3,i:2699,v:2070,ai:27.6,w:49601,reg:"UK"},
  {name:"Lowestoft",lat:52.4700,lng:1.7500,c:4983,r:4.4,i:5307,v:3980,ai:18.0,w:44542,reg:"UK"},
  {name:"Luton North",lat:51.8892,lng:-0.3906,c:4909,r:8.5,i:5185,v:2016,ai:26.7,w:55696,reg:"UK"},
  {name:"Luton South and South Bedfordshire",lat:52.1113,lng:-0.4791,c:4530,r:5.1,i:3978,v:2307,ai:22.1,w:50146,reg:"UK"},
  {name:"Maidenhead",lat:51.5200,lng:-0.7200,c:3446,r:6.6,i:3365,v:3089,ai:23.6,w:36269,reg:"UK"},
  {name:"Maidstone and Malling",lat:51.2905,lng:0.5252,c:2527,r:8.2,i:2409,v:1844,ai:16.0,w:44133,reg:"UK"},
  {name:"Makerfield",lat:53.5200,lng:-2.6000,c:3606,r:3.2,i:3782,v:2359,ai:19.2,w:54404,reg:"UK"},
  {name:"Maldon",lat:51.7300,lng:0.6700,c:3032,r:10.0,i:3296,v:1746,ai:17.5,w:39703,reg:"UK"},
  {name:"Manchester Central",lat:53.1968,lng:-2.8716,c:3989,r:2.4,i:3390,v:1770,ai:22.3,w:59694,reg:"UK"},
  {name:"Manchester Rusholme",lat:53.1702,lng:-2.9040,c:1060,r:1.6,i:1256,v:559,ai:24.6,w:45615,reg:"UK"},
  {name:"Manchester Withington",lat:53.1633,lng:-2.8666,c:1217,r:9.2,i:1327,v:659,ai:21.4,w:46569,reg:"UK"},
  {name:"Mansfield",lat:53.1450,lng:-1.1970,c:3247,r:9.7,i:3311,v:2243,ai:19.0,w:36319,reg:"UK"},
  {name:"Meon Valley",lat:50.9300,lng:-1.0800,c:4709,r:8.8,i:4508,v:3976,ai:25.8,w:44110,reg:"UK"},
  {name:"Meriden and Solihull East",lat:52.4431,lng:-1.6567,c:3330,r:9.7,i:3489,v:2904,ai:18.9,w:46693,reg:"UK"},
  {name:"Mid Bedfordshire",lat:52.0200,lng:-0.4900,c:2098,r:8.9,i:2186,v:1649,ai:18.9,w:40204,reg:"UK"},
  {name:"Mid Buckinghamshire",lat:51.8000,lng:-0.8500,c:2305,r:3.1,i:2963,v:1175,ai:22.7,w:38446,reg:"UK"},
  {name:"Mid Cheshire",lat:53.1900,lng:-2.4600,c:3041,r:4.8,i:3045,v:1173,ai:17.5,w:59774,reg:"UK"},
  {name:"Mid Derbyshire",lat:53.0300,lng:-1.4800,c:2275,r:3.6,i:2037,v:1151,ai:18.8,w:36047,reg:"UK"},
  {name:"Mid Dorset and North Poole",lat:50.8001,lng:-2.1023,c:3589,r:4.4,i:3150,v:2649,ai:17.1,w:43090,reg:"UK"},
  {name:"Mid Dunbartonshire",lat:55.9400,lng:-4.2000,c:2661,r:8.6,i:3199,v:1164,ai:20.2,w:56673,reg:"UK"},
  {name:"Mid Leicestershire",lat:52.6500,lng:-1.0800,c:2382,r:9.6,i:2153,v:2079,ai:22.1,w:41818,reg:"UK"},
  {name:"Mid Norfolk",lat:52.6500,lng:0.9500,c:2701,r:2.6,i:3114,v:1332,ai:26.8,w:52626,reg:"UK"},
  {name:"Middlesbrough and Thornaby East",lat:54.5708,lng:-1.2274,c:2345,r:3.6,i:2589,v:1094,ai:26.5,w:38683,reg:"UK"},
  {name:"Middlesbrough South and East Cleveland",lat:54.5634,lng:-1.2548,c:1935,r:8.1,i:1920,v:1377,ai:22.8,w:44323,reg:"UK"},
  {name:"Mid Derbyshire",lat:53.0300,lng:-1.4800,c:1543,r:8.7,i:1482,v:1102,ai:17.3,w:51859,reg:"UK"},
  {name:"Milton Keynes Central",lat:52.0176,lng:-0.7370,c:2318,r:5.8,i:2198,v:895,ai:19.7,w:41792,reg:"UK"},
  {name:"Milton Keynes North",lat:52.0179,lng:-0.7634,c:1985,r:4.9,i:2490,v:1540,ai:26.6,w:60838,reg:"UK"},
  {name:"Mitcham and Morden",lat:51.4020,lng:-0.1751,c:924,r:7.3,i:1045,v:501,ai:21.0,w:54771,reg:"UK"},
  {name:"Middlesbrough",lat:54.5700,lng:-1.2300,c:4356,r:4.5,i:4854,v:1959,ai:17.4,w:62380,reg:"UK"},
  {name:"Middlesbrough South",lat:54.5582,lng:-1.2372,c:3883,r:7.6,i:3184,v:1444,ai:17.9,w:40942,reg:"UK"},
  {name:"Monmouthshire",lat:51.8100,lng:-2.7100,c:964,r:4.1,i:1078,v:432,ai:26.1,w:52104,reg:"UK"},
  {name:"Montgomeryshire and Glyndwr",lat:52.6101,lng:-3.1334,c:3809,r:3.7,i:3875,v:2766,ai:20.2,w:35029,reg:"UK"},
  {name:"Morecambe and Lunesdale",lat:54.0367,lng:-2.8425,c:2002,r:1.9,i:2456,v:1369,ai:16.6,w:42333,reg:"UK"},
  {name:"Morley and Outwood",lat:53.7549,lng:-1.5803,c:1682,r:9.3,i:1975,v:668,ai:24.3,w:46809,reg:"UK"},
  {name:"Motherwell, Wishaw and Carluke",lat:55.7943,lng:-3.9702,c:1980,r:2.3,i:2520,v:1154,ai:27.2,w:55748,reg:"UK"},
  {name:"Neath and Swansea East",lat:51.6857,lng:-3.8223,c:3438,r:5.3,i:2843,v:2523,ai:21.1,w:50356,reg:"UK"},
  {name:"New Forest East",lat:50.8782,lng:-1.6117,c:4000,r:1.9,i:4605,v:3172,ai:19.1,w:51392,reg:"UK"},
  {name:"New Forest West",lat:50.8386,lng:-1.6418,c:3084,r:3.6,i:2558,v:1686,ai:20.9,w:41042,reg:"UK"},
  {name:"Newark",lat:53.0700,lng:-0.8100,c:3769,r:7.2,i:3463,v:1820,ai:22.2,w:48350,reg:"UK"},
  {name:"Newbury",lat:51.4000,lng:-1.3200,c:4730,r:4.5,i:4492,v:3957,ai:17.7,w:51898,reg:"UK"},
  {name:"Newcastle upon Tyne Central and West",lat:54.9759,lng:-1.6123,c:2201,r:8.4,i:2364,v:1690,ai:18.0,w:54995,reg:"UK"},
  {name:"Newcastle upon Tyne East and Wallsend",lat:54.9436,lng:-1.6231,c:4017,r:8.6,i:3443,v:2045,ai:20.3,w:41192,reg:"UK"},
  {name:"Newcastle upon Tyne North",lat:54.9618,lng:-1.6299,c:1627,r:7.5,i:1666,v:670,ai:19.9,w:49059,reg:"UK"},
  {name:"Newcastle-under-Lyme",lat:53.0000,lng:-2.2200,c:1101,r:1.6,i:1426,v:839,ai:17.0,w:56514,reg:"UK"},
  {name:"Newport East",lat:51.5826,lng:-3.0195,c:4916,r:6.3,i:4200,v:3042,ai:21.2,w:40694,reg:"UK"},
  {name:"Newport West and Islwyn",lat:51.5648,lng:-3.0117,c:4662,r:7.0,i:5192,v:4029,ai:23.8,w:42542,reg:"UK"},
  {name:"Newton Abbot",lat:50.5200,lng:-3.6000,c:916,r:8.1,i:1117,v:469,ai:18.2,w:54143,reg:"UK"},
  {name:"North Antrim",lat:55.0800,lng:-6.2000,c:4352,r:9.4,i:3848,v:3401,ai:26.0,w:57269,reg:"UK"},
  {name:"North Ayrshire and Arran",lat:55.4522,lng:-4.6001,c:2172,r:3.1,i:2633,v:1142,ai:20.4,w:51534,reg:"UK"},
  {name:"North Bedfordshire",lat:52.1543,lng:-0.4333,c:1805,r:1.9,i:1955,v:1255,ai:25.8,w:56167,reg:"UK"},
  {name:"North Cornwall",lat:50.5600,lng:-4.7400,c:2876,r:5.7,i:2527,v:1480,ai:23.0,w:37406,reg:"UK"},
  {name:"North Cotswolds",lat:51.9100,lng:-1.7000,c:3689,r:2.9,i:3768,v:3258,ai:17.1,w:36198,reg:"UK"},
  {name:"North Devon",lat:51.0300,lng:-3.8600,c:2645,r:3.1,i:3072,v:929,ai:26.1,w:60659,reg:"UK"},
  {name:"North Dorset",lat:50.9300,lng:-2.2800,c:4105,r:5.1,i:3865,v:2930,ai:22.2,w:47636,reg:"UK"},
  {name:"North Durham",lat:54.8300,lng:-1.6700,c:2222,r:5.2,i:2517,v:1787,ai:26.8,w:39933,reg:"UK"},
  {name:"North East Bedfordshire",lat:52.1800,lng:-0.2800,c:2042,r:5.3,i:2208,v:1105,ai:18.3,w:37551,reg:"UK"},
  {name:"North East Cambridgeshire",lat:52.5000,lng:0.1500,c:2159,r:5.4,i:2775,v:1834,ai:26.4,w:64231,reg:"UK"},
  {name:"North East Derbyshire",lat:53.2000,lng:-1.4100,c:4839,r:6.8,i:5833,v:1853,ai:24.1,w:53274,reg:"UK"},
  {name:"North East Fife",lat:56.3400,lng:-2.8000,c:2047,r:6.4,i:2612,v:1257,ai:23.8,w:43979,reg:"UK"},
  {name:"North East Hampshire",lat:51.2600,lng:-0.8600,c:2242,r:9.0,i:1824,v:1017,ai:24.1,w:48420,reg:"UK"},
  {name:"North East Hertfordshire",lat:51.9500,lng:-0.0500,c:1157,r:7.1,i:1140,v:774,ai:21.0,w:50899,reg:"UK"},
  {name:"North East Somerset and Hanham",lat:52.7245,lng:-0.7757,c:3172,r:4.9,i:2718,v:1425,ai:26.7,w:51443,reg:"UK"},
  {name:"North Herefordshire",lat:52.2700,lng:-2.7300,c:1864,r:2.3,i:1985,v:910,ai:21.9,w:51620,reg:"UK"},
  {name:"North Norfolk",lat:52.8800,lng:1.1000,c:1751,r:6.4,i:1499,v:1107,ai:23.1,w:37406,reg:"UK"},
  {name:"North Northumberland",lat:55.4100,lng:-1.6900,c:2513,r:2.1,i:2562,v:2073,ai:22.6,w:56438,reg:"UK"},
  {name:"North Shropshire",lat:52.8600,lng:-2.6900,c:3978,r:2.5,i:5152,v:2971,ai:17.2,w:59906,reg:"UK"},
  {name:"North Somerset",lat:51.3300,lng:-2.8000,c:2446,r:3.0,i:3130,v:1613,ai:25.3,w:39104,reg:"UK"},
  {name:"North Suffolk",lat:52.3500,lng:1.2000,c:4059,r:2.0,i:3727,v:2251,ai:16.2,w:52829,reg:"UK"},
  {name:"North Swindon",lat:51.6000,lng:-1.7700,c:1695,r:4.0,i:1955,v:990,ai:26.7,w:53635,reg:"UK"},
  {name:"North Warwickshire and Bedworth",lat:52.5605,lng:-1.5942,c:4462,r:6.3,i:5616,v:3698,ai:18.0,w:57363,reg:"UK"},
  {name:"North West Cambridgeshire",lat:52.5200,lng:-0.2000,c:3658,r:8.5,i:3150,v:2030,ai:24.8,w:63440,reg:"UK"},
  {name:"North West Essex",lat:51.9500,lng:0.3000,c:3831,r:1.9,i:4221,v:1550,ai:22.6,w:59090,reg:"UK"},
  {name:"North West Hampshire",lat:51.2200,lng:-1.4800,c:1274,r:9.4,i:1449,v:624,ai:18.3,w:48403,reg:"UK"},
  {name:"North West Leicestershire",lat:52.7200,lng:-1.3700,c:4320,r:6.4,i:3701,v:1561,ai:17.3,w:59020,reg:"UK"},
  {name:"North West Norfolk",lat:52.8200,lng:0.4800,c:1578,r:6.2,i:1491,v:1148,ai:20.6,w:39327,reg:"UK"},
  {name:"Northampton North",lat:52.2305,lng:-0.9109,c:4476,r:6.1,i:5123,v:3556,ai:27.4,w:35414,reg:"UK"},
  {name:"Northampton South",lat:52.2508,lng:-0.8964,c:2907,r:8.9,i:3489,v:1074,ai:18.2,w:59548,reg:"UK"},
  {name:"Norwich North",lat:52.6046,lng:1.2798,c:2798,r:2.8,i:3420,v:1584,ai:26.5,w:53325,reg:"UK"},
  {name:"Norwich South",lat:52.6281,lng:1.2946,c:1708,r:9.1,i:1869,v:638,ai:18.0,w:45829,reg:"UK"},
  {name:"Nottingham East",lat:52.9476,lng:-1.1208,c:2429,r:4.5,i:1950,v:1623,ai:20.0,w:35615,reg:"UK"},
  {name:"Nottingham North and Kimberley",lat:52.9357,lng:-1.1459,c:990,r:2.7,i:1124,v:494,ai:19.3,w:50000,reg:"UK"},
  {name:"Nottingham South",lat:52.9723,lng:-1.1335,c:3018,r:9.6,i:3911,v:1112,ai:22.7,w:58127,reg:"UK"},
  {name:"Nuneaton",lat:52.5200,lng:-1.4600,c:3459,r:6.9,i:3394,v:1746,ai:25.5,w:61184,reg:"UK"},
  {name:"Old Bexley and Sidcup",lat:51.4581,lng:0.1210,c:4742,r:7.3,i:4514,v:3650,ai:24.9,w:50267,reg:"UK"},
  {name:"Oldham East and Saddleworth",lat:53.5389,lng:-2.1180,c:3113,r:5.0,i:2584,v:1666,ai:19.9,w:64652,reg:"UK"},
  {name:"Oldham West, Chadderton and Royton",lat:53.5372,lng:-2.1133,c:1822,r:3.5,i:1775,v:773,ai:16.1,w:61129,reg:"UK"},
  {name:"Orkney and Shetland",lat:58.9936,lng:-2.9569,c:3188,r:4.1,i:2819,v:1232,ai:19.6,w:44254,reg:"UK"},
  {name:"Oxford East",lat:51.7548,lng:-1.2208,c:4737,r:4.4,i:5971,v:3177,ai:17.0,w:40362,reg:"UK"},
  {name:"Oxford West and Abingdon",lat:51.7739,lng:-1.2634,c:2299,r:8.1,i:2331,v:1902,ai:16.8,w:49535,reg:"UK"},
  {name:"Peckham",lat:51.4700,lng:-0.0600,c:1881,r:1.7,i:1659,v:935,ai:24.5,w:41549,reg:"UK"},
  {name:"Pendle and Clitheroe",lat:53.8540,lng:-2.1522,c:2478,r:3.2,i:2729,v:2044,ai:23.8,w:40901,reg:"UK"},
  {name:"Penistone and Stocksbridge",lat:53.5013,lng:-1.6278,c:3324,r:2.2,i:4004,v:2764,ai:20.1,w:39099,reg:"UK"},
  {name:"Penrith and Solway",lat:54.6689,lng:-2.7557,c:4476,r:6.9,i:5646,v:2089,ai:19.9,w:57479,reg:"UK"},
  {name:"Peterborough",lat:52.5700,lng:-0.2400,c:3651,r:4.4,i:3025,v:2109,ai:16.5,w:53789,reg:"UK"},
  {name:"Plymouth Moor View",lat:50.3955,lng:-4.1362,c:2204,r:5.7,i:2422,v:1082,ai:21.6,w:35408,reg:"UK"},
  {name:"Plymouth Sutton and Devonport",lat:50.3494,lng:-4.1614,c:4947,r:2.0,i:5476,v:3701,ai:19.9,w:37803,reg:"UK"},
  {name:"Pontefract, Castleford and Knottingley",lat:53.6910,lng:-1.3110,c:4022,r:2.3,i:4854,v:2343,ai:22.5,w:52654,reg:"UK"},
  {name:"Poole",lat:50.7100,lng:-1.9800,c:3130,r:7.1,i:3445,v:1665,ai:24.9,w:42734,reg:"UK"},
  {name:"Poplar and Limehouse",lat:51.4972,lng:-0.0233,c:3787,r:8.0,i:4498,v:1969,ai:25.3,w:64321,reg:"UK"},
  {name:"Portsmouth North",lat:50.8264,lng:-1.0783,c:2997,r:9.5,i:2595,v:1063,ai:21.7,w:54660,reg:"UK"},
  {name:"Portsmouth South",lat:50.7836,lng:-1.0699,c:4956,r:3.4,i:5839,v:1979,ai:16.3,w:39024,reg:"UK"},
  {name:"Preston",lat:53.7600,lng:-2.7000,c:3132,r:3.0,i:3977,v:1725,ai:17.8,w:40322,reg:"UK"},
  {name:"Putney",lat:51.4600,lng:-0.2200,c:3898,r:9.3,i:3434,v:1426,ai:25.3,w:42277,reg:"UK"},
  {name:"Queen's Park and Maida Vale",lat:51.5194,lng:-0.1758,c:4925,r:5.7,i:5506,v:2656,ai:25.6,w:48802,reg:"UK"},
  {name:"Rawtenstall and Rossendale",lat:53.6736,lng:-2.2761,c:1252,r:7.7,i:1042,v:882,ai:20.8,w:60921,reg:"UK"},
  {name:"Rayleigh and Wickford",lat:51.5657,lng:0.5960,c:2521,r:9.3,i:3207,v:1751,ai:18.7,w:42557,reg:"UK"},
  {name:"Reading Central",lat:51.4330,lng:-0.9658,c:1771,r:3.2,i:2089,v:1245,ai:19.6,w:64829,reg:"UK"},
  {name:"Reading West and Mid Berkshire",lat:51.4370,lng:-0.9801,c:1458,r:8.8,i:1800,v:724,ai:25.0,w:59684,reg:"UK"},
  {name:"Redcar",lat:54.6100,lng:-1.0600,c:2839,r:9.1,i:2500,v:2059,ai:23.2,w:48591,reg:"UK"},
  {name:"Redditch",lat:52.3000,lng:-1.9400,c:3232,r:9.0,i:2924,v:2701,ai:20.3,w:58394,reg:"UK"},
  {name:"Reigate",lat:51.2300,lng:-0.2000,c:4426,r:3.0,i:5452,v:3970,ai:19.6,w:35732,reg:"UK"},
  {name:"Rhondda and Ogmore",lat:51.6259,lng:-3.4599,c:1268,r:9.8,i:1020,v:1079,ai:17.8,w:57080,reg:"UK"},
  {name:"Ribble Valley",lat:53.8800,lng:-2.3800,c:3667,r:2.3,i:3556,v:3135,ai:24.6,w:61458,reg:"UK"},
  {name:"Richmond and Northallerton",lat:54.3400,lng:-1.5100,c:4914,r:1.8,i:4507,v:3860,ai:24.3,w:36136,reg:"UK"},
  {name:"Richmond Park",lat:51.4400,lng:-0.2800,c:2920,r:3.5,i:2964,v:1190,ai:16.2,w:64723,reg:"UK"},
  {name:"Rochdale",lat:53.6100,lng:-2.1600,c:2129,r:9.0,i:1831,v:1315,ai:17.6,w:47854,reg:"UK"},
  {name:"Rochester and Strood",lat:53.1812,lng:-2.8902,c:1551,r:7.3,i:1355,v:1172,ai:22.0,w:38370,reg:"UK"},
  {name:"Romford",lat:51.5800,lng:0.1800,c:4658,r:4.5,i:4227,v:4108,ai:26.6,w:56941,reg:"UK"},
  {name:"Rother Valley",lat:53.3800,lng:-1.2700,c:1946,r:3.0,i:1814,v:754,ai:16.5,w:50262,reg:"UK"},
  {name:"Rotherham",lat:53.4300,lng:-1.3500,c:2514,r:6.2,i:2467,v:894,ai:24.3,w:54593,reg:"UK"},
  {name:"Rugby",lat:52.3700,lng:-1.2600,c:3084,r:6.2,i:3531,v:2745,ai:26.5,w:56532,reg:"UK"},
  {name:"Ruislip, Northwood and Pinner",lat:51.5646,lng:-0.4414,c:2476,r:4.2,i:2499,v:2191,ai:20.6,w:46562,reg:"UK"},
  {name:"Runnymede and Weybridge",lat:51.3826,lng:-0.5656,c:4993,r:1.5,i:5511,v:4291,ai:19.1,w:53327,reg:"UK"},
  {name:"Rushcliffe",lat:52.9000,lng:-1.0900,c:1633,r:2.5,i:1994,v:1275,ai:26.9,w:36485,reg:"UK"},
  {name:"Rutherglen",lat:55.8200,lng:-4.2100,c:3715,r:4.3,i:4172,v:2421,ai:19.8,w:64148,reg:"UK"},
  {name:"Saffron Walden",lat:52.0200,lng:0.2400,c:803,r:7.8,i:985,v:506,ai:23.1,w:64842,reg:"UK"},
  {name:"Salford",lat:53.4800,lng:-2.2900,c:1784,r:6.9,i:2090,v:996,ai:24.5,w:46805,reg:"UK"},
  {name:"Salisbury",lat:51.0600,lng:-1.7900,c:3010,r:6.7,i:3427,v:1586,ai:23.5,w:51292,reg:"UK"},
  {name:"Scarborough and Whitby",lat:54.2713,lng:-0.4014,c:1737,r:6.7,i:1619,v:1476,ai:21.7,w:56646,reg:"UK"},
  {name:"Scunthorpe",lat:53.5800,lng:-0.6500,c:1729,r:2.7,i:2184,v:1107,ai:22.3,w:50824,reg:"UK"},
  {name:"Sedgefield",lat:54.6500,lng:-1.4500,c:4216,r:3.5,i:3736,v:3381,ai:21.5,w:54215,reg:"UK"},
  {name:"Sefton Central",lat:53.5600,lng:-2.9900,c:4275,r:9.1,i:5274,v:1597,ai:20.6,w:59963,reg:"UK"},
  {name:"Selby",lat:53.7800,lng:-1.0600,c:4234,r:2.5,i:3712,v:2067,ai:17.2,w:45699,reg:"UK"},
  {name:"Sevenoaks",lat:51.2700,lng:0.1900,c:4173,r:5.9,i:4283,v:1662,ai:20.7,w:64908,reg:"UK"},
  {name:"Sheffield Brightside and Hillsborough",lat:53.3908,lng:-1.4780,c:3719,r:5.3,i:3864,v:2934,ai:25.1,w:39496,reg:"UK"},
  {name:"Sheffield Central",lat:53.3621,lng:-1.4658,c:2986,r:3.5,i:2942,v:1603,ai:20.6,w:35533,reg:"UK"},
  {name:"Sheffield Hallam",lat:53.4000,lng:-1.4945,c:1042,r:3.0,i:1207,v:522,ai:19.9,w:42254,reg:"UK"},
  {name:"Sheffield Heeley",lat:53.3723,lng:-1.4974,c:3471,r:8.8,i:3126,v:2022,ai:25.5,w:53535,reg:"UK"},
  {name:"Sheffield South East",lat:53.3986,lng:-1.4789,c:2658,r:4.6,i:3073,v:1361,ai:20.9,w:54445,reg:"UK"},
  {name:"Sherwood Forest",lat:53.1200,lng:-1.0500,c:2418,r:6.4,i:3052,v:1101,ai:27.7,w:56356,reg:"UK"},
  {name:"Shipley",lat:53.8200,lng:-1.7700,c:2363,r:7.2,i:2279,v:919,ai:25.1,w:46382,reg:"UK"},
  {name:"Shrewsbury",lat:52.7000,lng:-2.7500,c:3008,r:5.7,i:3761,v:2305,ai:16.3,w:52783,reg:"UK"},
  {name:"Sittingbourne and Sheppey",lat:51.3264,lng:0.7295,c:2742,r:5.4,i:3344,v:1585,ai:21.7,w:61710,reg:"UK"},
  {name:"Skipton and Ripon",lat:53.9708,lng:-2.0068,c:2949,r:8.5,i:3347,v:2233,ai:20.8,w:36217,reg:"UK"},
  {name:"Sleaford and North Hykeham",lat:52.9661,lng:-0.4347,c:4030,r:8.0,i:3462,v:1899,ai:16.9,w:59524,reg:"UK"},
  {name:"Slough",lat:51.5100,lng:-0.5900,c:3963,r:6.3,i:3279,v:2871,ai:24.5,w:49483,reg:"UK"},
  {name:"Smethwick",lat:52.4900,lng:-1.9700,c:1030,r:7.4,i:1039,v:691,ai:28.0,w:59505,reg:"UK"},
  {name:"Solihull West and Shirley",lat:52.3965,lng:-1.7843,c:4462,r:2.7,i:4315,v:2833,ai:16.1,w:64660,reg:"UK"},
  {name:"South Antrim",lat:54.7000,lng:-6.1000,c:2114,r:3.7,i:2599,v:1386,ai:22.1,w:47606,reg:"UK"},
  {name:"South Basildon and East Thurrock",lat:51.5921,lng:0.4231,c:1014,r:4.1,i:1250,v:802,ai:26.3,w:42712,reg:"UK"},
  {name:"South Cambridgeshire",lat:52.1200,lng:0.1000,c:3054,r:4.7,i:3152,v:1890,ai:23.0,w:45971,reg:"UK"},
  {name:"South Cotswolds",lat:51.6700,lng:-2.1000,c:4166,r:3.2,i:5247,v:2732,ai:16.6,w:44427,reg:"UK"},
  {name:"South Derbyshire",lat:52.8000,lng:-1.5400,c:3038,r:5.0,i:3288,v:1603,ai:19.3,w:58882,reg:"UK"},
  {name:"South Devon",lat:50.4000,lng:-3.6500,c:2024,r:7.5,i:2431,v:1367,ai:21.5,w:63045,reg:"UK"},
  {name:"South Dorset",lat:50.6000,lng:-2.4000,c:2668,r:9.0,i:2211,v:1570,ai:23.7,w:36468,reg:"UK"},
  {name:"South Down",lat:54.2500,lng:-5.9000,c:4423,r:2.1,i:4857,v:1986,ai:27.1,w:51831,reg:"UK"},
  {name:"South East Cambridgeshire",lat:52.2500,lng:0.2500,c:4162,r:5.7,i:4731,v:3001,ai:19.5,w:41330,reg:"UK"},
  {name:"South East Cornwall",lat:50.3500,lng:-4.4500,c:4320,r:2.7,i:5438,v:2003,ai:17.2,w:37857,reg:"UK"},
  {name:"South Holland and The Deepings",lat:52.8112,lng:-0.1207,c:4093,r:9.6,i:4123,v:2915,ai:19.1,w:62176,reg:"UK"},
  {name:"South Leicestershire",lat:52.4800,lng:-1.1800,c:1037,r:7.4,i:851,v:839,ai:19.5,w:41980,reg:"UK"},
  {name:"South Norfolk",lat:52.4500,lng:1.2000,c:3244,r:4.2,i:3504,v:1410,ai:26.9,w:44731,reg:"UK"},
  {name:"South Northamptonshire",lat:52.1000,lng:-1.0200,c:4333,r:2.8,i:5198,v:3852,ai:20.7,w:35988,reg:"UK"},
  {name:"South Ribble",lat:53.7100,lng:-2.6700,c:2395,r:6.9,i:2183,v:1557,ai:17.1,w:48933,reg:"UK"},
  {name:"South Shields",lat:54.9900,lng:-1.4300,c:3858,r:5.2,i:4396,v:1592,ai:25.9,w:38663,reg:"UK"},
  {name:"South Shropshire",lat:52.5000,lng:-2.8000,c:4677,r:10.0,i:5938,v:2990,ai:19.5,w:45438,reg:"UK"},
  {name:"South Suffolk",lat:52.0400,lng:0.9500,c:3951,r:5.7,i:4997,v:1584,ai:21.8,w:60919,reg:"UK"},
  {name:"South Swindon",lat:51.5500,lng:-1.8000,c:3310,r:6.1,i:2794,v:1412,ai:19.3,w:61791,reg:"UK"},
  {name:"South West Devon",lat:50.4200,lng:-3.9500,c:4350,r:3.4,i:5491,v:1600,ai:23.2,w:64020,reg:"UK"},
  {name:"South West Hertfordshire",lat:51.6400,lng:-0.4500,c:2246,r:9.5,i:2534,v:847,ai:20.0,w:48488,reg:"UK"},
  {name:"South West Norfolk",lat:52.5000,lng:0.4500,c:1839,r:7.8,i:1635,v:1440,ai:19.6,w:37082,reg:"UK"},
  {name:"Southampton Itchen",lat:50.8720,lng:-1.3992,c:3148,r:2.3,i:3386,v:2466,ai:23.1,w:48841,reg:"UK"},
  {name:"Southampton Test",lat:50.9098,lng:-1.4202,c:1208,r:7.0,i:1046,v:806,ai:20.2,w:46241,reg:"UK"},
  {name:"Southend East and Rochford",lat:51.5189,lng:0.6856,c:1512,r:9.5,i:1460,v:1229,ai:26.5,w:49407,reg:"UK"},
  {name:"Southend West and Leigh",lat:51.5198,lng:0.7121,c:4492,r:2.5,i:4707,v:2896,ai:17.4,w:49034,reg:"UK"},
  {name:"Southport",lat:53.6400,lng:-2.9100,c:2928,r:4.6,i:2631,v:1674,ai:18.4,w:38813,reg:"UK"},
  {name:"Spelthorne",lat:51.4300,lng:-0.5200,c:1807,r:8.9,i:1898,v:1517,ai:16.2,w:63299,reg:"UK"},
  {name:"St Austell and Newquay",lat:50.4792,lng:-4.8041,c:2851,r:8.2,i:3093,v:2078,ai:18.8,w:57501,reg:"UK"},
  {name:"St Helens North",lat:53.4547,lng:-2.7460,c:929,r:4.8,i:983,v:474,ai:26.7,w:37529,reg:"UK"},
  {name:"St Helens South and Whiston",lat:53.4790,lng:-2.7575,c:3300,r:8.2,i:3812,v:1267,ai:18.9,w:52975,reg:"UK"},
  {name:"St Ives",lat:50.2000,lng:-5.4800,c:3396,r:7.4,i:4100,v:1827,ai:25.7,w:48853,reg:"UK"},
  {name:"St Neots and Mid Cambridgeshire",lat:52.1847,lng:0.1340,c:4667,r:1.6,i:5927,v:2690,ai:20.9,w:37641,reg:"UK"},
  {name:"Stafford",lat:52.8000,lng:-2.1100,c:3650,r:2.8,i:3548,v:1559,ai:18.4,w:41589,reg:"UK"},
  {name:"Staffordshire Moorlands",lat:53.1000,lng:-2.0200,c:2190,r:9.8,i:2844,v:1719,ai:21.8,w:49919,reg:"UK"},
  {name:"Stalybridge and Hyde",lat:53.5007,lng:-2.0428,c:4072,r:9.2,i:4787,v:2850,ai:18.4,w:53754,reg:"UK"},
  {name:"Stevenage",lat:51.9000,lng:-0.2000,c:1188,r:7.6,i:1157,v:521,ai:27.6,w:55181,reg:"UK"},
  {name:"Stirling and Strathallan",lat:56.1299,lng:-3.9119,c:3931,r:2.6,i:4773,v:3401,ai:26.9,w:57348,reg:"UK"},
  {name:"Stockport",lat:53.4000,lng:-2.1500,c:3279,r:5.2,i:3976,v:2562,ai:26.4,w:43969,reg:"UK"},
  {name:"Stockton North",lat:54.5351,lng:-1.2997,c:4835,r:6.0,i:6154,v:2000,ai:27.6,w:58624,reg:"UK"},
  {name:"Stockton West",lat:54.5611,lng:-1.3074,c:1774,r:3.2,i:1825,v:851,ai:21.9,w:62243,reg:"UK"},
  {name:"Stoke-on-Trent Central",lat:52.9944,lng:-2.2048,c:2446,r:8.2,i:2927,v:1774,ai:27.3,w:59773,reg:"UK"},
  {name:"Stoke-on-Trent North",lat:52.9703,lng:-2.1807,c:3540,r:8.6,i:3433,v:2397,ai:26.0,w:58788,reg:"UK"},
  {name:"Stoke-on-Trent South",lat:52.9901,lng:-2.1972,c:868,r:2.4,i:1046,v:503,ai:23.3,w:48724,reg:"UK"},
  {name:"Stone, Great Wyrley and Penkridge",lat:52.9121,lng:-2.1435,c:2285,r:8.7,i:2535,v:1166,ai:17.1,w:43130,reg:"UK"},
  {name:"Stourbridge",lat:52.4500,lng:-2.1400,c:3576,r:8.4,i:3076,v:2594,ai:16.5,w:59688,reg:"UK"},
  {name:"Stratford-on-Avon",lat:52.1966,lng:-1.6764,c:1573,r:3.8,i:2011,v:864,ai:18.7,w:61695,reg:"UK"},
  {name:"Stratford and Bow",lat:52.2098,lng:-1.7203,c:2456,r:5.7,i:3138,v:1544,ai:27.9,w:40683,reg:"UK"},
  {name:"Streatham and Croydon North",lat:51.3550,lng:-0.1089,c:3014,r:1.5,i:2675,v:2621,ai:21.5,w:59281,reg:"UK"},
  {name:"Stroud",lat:51.7400,lng:-2.2100,c:1223,r:6.2,i:1505,v:773,ai:20.5,w:62858,reg:"UK"},
  {name:"Suffolk Coastal",lat:52.1000,lng:1.4500,c:4553,r:7.2,i:3815,v:3156,ai:21.3,w:63735,reg:"UK"},
  {name:"Sunderland Central",lat:54.9244,lng:-1.3801,c:2319,r:7.1,i:2587,v:1291,ai:22.3,w:55296,reg:"UK"},
  {name:"Surrey Heath",lat:51.3300,lng:-0.6800,c:2327,r:9.8,i:1927,v:1882,ai:24.2,w:51722,reg:"UK"},
  {name:"Sutton and Cheam",lat:51.3495,lng:-0.2118,c:2680,r:7.9,i:3338,v:2012,ai:25.0,w:36053,reg:"UK"},
  {name:"Sutton Coldfield",lat:52.5600,lng:-1.8200,c:4802,r:9.1,i:4188,v:3232,ai:22.9,w:36400,reg:"UK"},
  {name:"Swansea East",lat:51.6227,lng:-3.9448,c:2447,r:7.9,i:2742,v:1234,ai:25.1,w:43735,reg:"UK"},
  {name:"Swansea West",lat:51.6326,lng:-3.9285,c:4908,r:7.0,i:5901,v:3543,ai:20.6,w:63890,reg:"UK"},
  {name:"Tamworth",lat:52.6300,lng:-1.6900,c:1965,r:2.9,i:2137,v:1580,ai:25.5,w:45417,reg:"UK"},
  {name:"Tatton",lat:53.2900,lng:-2.3600,c:1387,r:5.9,i:1718,v:609,ai:24.9,w:40120,reg:"UK"},
  {name:"Taunton and Wellington",lat:50.9912,lng:-3.1114,c:2110,r:2.0,i:2002,v:1182,ai:27.6,w:63863,reg:"UK"},
  {name:"Telford",lat:52.6700,lng:-2.4400,c:4763,r:3.2,i:4574,v:2815,ai:17.3,w:42806,reg:"UK"},
  {name:"Tewkesbury",lat:51.9900,lng:-2.1600,c:2454,r:4.8,i:3145,v:1219,ai:18.4,w:62263,reg:"UK"},
  {name:"Thirsk and Malton",lat:54.2454,lng:-1.3418,c:2691,r:8.6,i:3010,v:2094,ai:19.8,w:39562,reg:"UK"},
  {name:"Thornbury and Yate",lat:51.6018,lng:-2.5327,c:3146,r:7.2,i:3700,v:1577,ai:20.4,w:62524,reg:"UK"},
  {name:"Thurrock",lat:51.4900,lng:0.3400,c:3446,r:3.7,i:4085,v:1284,ai:25.9,w:51994,reg:"UK"},
  {name:"Tiverton and Minehead",lat:50.9152,lng:-3.4693,c:2285,r:9.5,i:2131,v:1105,ai:16.8,w:51456,reg:"UK"},
  {name:"Tonbridge",lat:51.1950,lng:0.2750,c:2533,r:8.4,i:2167,v:1314,ai:23.7,w:64018,reg:"UK"},
  {name:"Tooting",lat:51.4200,lng:-0.1600,c:3462,r:7.4,i:4110,v:1962,ai:27.3,w:57273,reg:"UK"},
  {name:"Torbay",lat:50.4700,lng:-3.5300,c:2235,r:4.8,i:2688,v:1212,ai:18.2,w:61148,reg:"UK"},
  {name:"Torridge and Tavistock",lat:50.9240,lng:-4.2052,c:3033,r:5.9,i:3441,v:2565,ai:17.6,w:45161,reg:"UK"},
  {name:"Tottenham",lat:51.5900,lng:-0.0700,c:2908,r:8.7,i:3297,v:1941,ai:20.8,w:52211,reg:"UK"},
  {name:"Truro and Falmouth",lat:50.2752,lng:-5.0500,c:1950,r:8.7,i:2328,v:1581,ai:17.8,w:55146,reg:"UK"},
  {name:"Tunbridge Wells",lat:51.1300,lng:0.2600,c:4573,r:9.1,i:5357,v:3665,ai:23.8,w:61360,reg:"UK"},
  {name:"Twickenham",lat:51.4400,lng:-0.3200,c:1351,r:7.5,i:1556,v:927,ai:19.3,w:37019,reg:"UK"},
  {name:"Tynemouth",lat:55.0100,lng:-1.4200,c:3334,r:8.5,i:3122,v:1557,ai:18.7,w:37815,reg:"UK"},
  {name:"Upper Bann",lat:54.4000,lng:-6.3000,c:3639,r:9.8,i:4370,v:1993,ai:24.4,w:37165,reg:"UK"},
  {name:"Uxbridge and South Ruislip",lat:51.5435,lng:-0.4233,c:4322,r:4.3,i:3465,v:3008,ai:17.7,w:43251,reg:"UK"},
  {name:"Vauxhall and Camberwell Green",lat:51.4878,lng:-0.1296,c:3130,r:8.4,i:2565,v:2519,ai:17.3,w:41734,reg:"UK"},
  {name:"Walsall and Bloxwich",lat:52.5985,lng:-1.9778,c:2190,r:6.3,i:1990,v:1722,ai:18.5,w:60182,reg:"UK"},
  {name:"Walthamstow",lat:51.5800,lng:-0.0200,c:928,r:8.1,i:755,v:582,ai:21.1,w:36891,reg:"UK"},
  {name:"Warrington North",lat:53.3736,lng:-2.5579,c:3446,r:7.7,i:3764,v:1964,ai:22.1,w:52662,reg:"UK"},
  {name:"Warrington South",lat:53.3887,lng:-2.6020,c:4981,r:8.3,i:6379,v:2645,ai:27.8,w:37141,reg:"UK"},
  {name:"Warwick and Leamington",lat:52.2742,lng:-1.5930,c:2706,r:7.3,i:3123,v:1623,ai:20.1,w:40697,reg:"UK"},
  {name:"Washington and Gateshead South",lat:54.9318,lng:-1.6141,c:1615,r:7.8,i:1708,v:954,ai:18.4,w:56112,reg:"UK"},
  {name:"Watford",lat:51.6500,lng:-0.3900,c:3153,r:7.5,i:4056,v:2400,ai:27.4,w:62598,reg:"UK"},
  {name:"Weald of Kent",lat:51.1000,lng:0.6000,c:3834,r:7.6,i:3187,v:1775,ai:16.2,w:60906,reg:"UK"},
  {name:"Wellingborough and Rushden",lat:52.3195,lng:-0.7017,c:3832,r:6.9,i:3571,v:2090,ai:18.0,w:53966,reg:"UK"},
  {name:"Wells and Mendip Hills",lat:51.1761,lng:-2.6736,c:985,r:3.0,i:962,v:831,ai:25.7,w:48651,reg:"UK"},
  {name:"Welwyn Hatfield",lat:51.7986,lng:-0.1807,c:1446,r:8.1,i:1497,v:1293,ai:26.9,w:58842,reg:"UK"},
  {name:"West Aberdeenshire and Kincardine",lat:56.9713,lng:-2.6755,c:1338,r:2.4,i:1447,v:842,ai:18.5,w:42558,reg:"UK"},
  {name:"West Bromwich",lat:52.5100,lng:-1.9900,c:3782,r:9.5,i:4879,v:2232,ai:24.8,w:46524,reg:"UK"},
  {name:"West Dorset",lat:50.7500,lng:-2.6000,c:4209,r:8.7,i:3648,v:1502,ai:18.6,w:52560,reg:"UK"},
  {name:"West Ham and Beckton",lat:51.5433,lng:0.0021,c:2391,r:1.6,i:2905,v:1870,ai:21.6,w:36297,reg:"UK"},
  {name:"West Lancashire",lat:53.5500,lng:-2.8500,c:1098,r:4.2,i:1221,v:918,ai:21.8,w:54184,reg:"UK"},
  {name:"West Suffolk",lat:52.2000,lng:0.6000,c:1664,r:3.6,i:2084,v:932,ai:17.2,w:52736,reg:"UK"},
  {name:"West Worcestershire",lat:52.1000,lng:-2.3000,c:1330,r:3.2,i:1367,v:893,ai:23.6,w:56209,reg:"UK"},
  {name:"Westmorland and Lonsdale",lat:54.4104,lng:-2.6872,c:2646,r:2.1,i:3075,v:1004,ai:21.6,w:47006,reg:"UK"},
  {name:"Weston-super-Mare",lat:51.3459,lng:-2.9962,c:1807,r:7.0,i:2070,v:1101,ai:17.7,w:62270,reg:"UK"},
  {name:"Wigan",lat:53.5400,lng:-2.6300,c:1802,r:9.9,i:1647,v:1019,ai:25.5,w:59714,reg:"UK"},
  {name:"Wimbledon",lat:51.4200,lng:-0.2100,c:3462,r:7.8,i:2835,v:1390,ai:27.7,w:59081,reg:"UK"},
  {name:"Winchester",lat:51.0600,lng:-1.3100,c:959,r:1.9,i:882,v:826,ai:18.6,w:55156,reg:"UK"},
  {name:"Windsor",lat:51.4700,lng:-0.6400,c:4707,r:6.9,i:5929,v:2328,ai:17.8,w:35546,reg:"UK"},
  {name:"Wirral West",lat:53.3300,lng:-3.1000,c:3979,r:2.4,i:5119,v:2946,ai:18.2,w:59211,reg:"UK"},
  {name:"Witney",lat:51.7800,lng:-1.4800,c:1483,r:5.9,i:1264,v:1160,ai:26.7,w:62490,reg:"UK"},
  {name:"Woking",lat:51.3100,lng:-0.5500,c:809,r:8.7,i:872,v:648,ai:22.0,w:53595,reg:"UK"},
  {name:"Wokingham",lat:51.4100,lng:-0.8700,c:3297,r:8.3,i:2765,v:1252,ai:22.5,w:43728,reg:"UK"},
  {name:"Wolverhampton North East",lat:52.6030,lng:-2.0710,c:2467,r:1.6,i:2892,v:896,ai:26.0,w:59346,reg:"UK"},
  {name:"Wolverhampton South East",lat:52.6086,lng:-2.0672,c:2723,r:2.5,i:3063,v:1263,ai:21.1,w:38312,reg:"UK"},
  {name:"Wolverhampton West",lat:52.5721,lng:-2.0818,c:2280,r:2.3,i:2656,v:1863,ai:26.2,w:38042,reg:"UK"},
  {name:"Worcester",lat:52.1900,lng:-2.2200,c:4002,r:2.8,i:4415,v:3554,ai:25.2,w:35208,reg:"UK"},
  {name:"Worsley and Eccles",lat:53.4944,lng:-2.3733,c:1114,r:2.5,i:1276,v:756,ai:22.2,w:48668,reg:"UK"},
  {name:"Worthing West",lat:50.8100,lng:-0.3800,c:3524,r:9.3,i:4110,v:2777,ai:27.0,w:60115,reg:"UK"},
  {name:"Wrexham",lat:53.0400,lng:-2.9900,c:3810,r:1.8,i:4345,v:3114,ai:21.2,w:61344,reg:"UK"},
  {name:"Wycombe",lat:51.6200,lng:-0.7400,c:1555,r:9.5,i:1587,v:1148,ai:19.0,w:44016,reg:"UK"},
  {name:"Wyre Forest",lat:52.3800,lng:-2.2500,c:2263,r:4.3,i:1917,v:1343,ai:27.8,w:54620,reg:"UK"},
  {name:"Wythenshawe and Sale East",lat:53.3650,lng:-2.2653,c:4715,r:8.0,i:5744,v:4228,ai:25.0,w:43225,reg:"UK"},
  {name:"Yeovil",lat:50.9400,lng:-2.6300,c:887,r:3.5,i:1102,v:759,ai:19.9,w:58112,reg:"UK"},
  {name:"Ynys Mon",lat:53.2600,lng:-4.3100,c:4054,r:9.1,i:4853,v:2605,ai:17.3,w:59763,reg:"UK"},
  {name:"York Central",lat:53.9519,lng:-1.0710,c:2117,r:6.8,i:2082,v:1366,ai:27.6,w:39833,reg:"UK"},
  {name:"York Outer",lat:53.9254,lng:-1.0973,c:3061,r:9.5,i:3072,v:2609,ai:24.3,w:64023,reg:"UK"},
];

import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function ConstituencyMap(){
  const mapDiv = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [showTrue,setShowTrue] = useState(true);
  const [showAi,setShowAi] = useState(false);
  const [search,setSearch] = useState("");
  const [selected,setSelected] = useState(null);

  const filtered = useMemo(()=>{
    if(!search.trim()) return sampleData;
    const q = search.toLowerCase();
    return sampleData.filter(t=>t.name.toLowerCase().includes(q));
  },[search]);

  useEffect(()=>{
    if(mapRef.current) return;
    const map = L.map(mapDiv.current, { zoomControl:false }).setView([54.2,-2.8],6);
    L.control.zoom({ position:'topleft' }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'© OpenStreetMap' }).addTo(map);
    mapRef.current = map;
  },[]);

  useEffect(()=>{
    if(!mapRef.current) return;
    const map = mapRef.current;
    map.eachLayer(l=>{ if(l instanceof L.CircleMarker) map.removeLayer(l); });
    markersRef.current = [];
    const getSeek = t => showTrue ? t.c+t.i : t.c;
    const getGap = t => t.v-getSeek(t);
    const getColor = t=>{
      if(showAi){
        if(t.ai>=25) return '#dc2626';
        if(t.ai>=18) return '#f59e0b';
        return '#10b981';
      }
      const g=getGap(t);
      if(g<0) return '#dc2626';
      if(g<getSeek(t)*0.3) return '#f59e0b';
      return '#10b981';
    };
    filtered.forEach(t=>{
      const color = getColor(t);
      const seek = getSeek(t);
      const gap = t.v - seek;
      const m = L.circleMarker([t.lat,t.lng],{
        radius: Math.max(6, Math.min(18, Math.sqrt(seek)*0.42+4)),
        color: '#020617',
        weight:1.5,
        fillColor: color,
        fillOpacity: 0.85
      }).addTo(map);
      m.bindPopup(`
        <div style="font-family:Inter,system-ui,sans-serif;min-width:210px">
          <div style="font-weight:900;font-size:13px;margin-bottom:4px">${t.name}</div>
          <div style="font-size:11px;line-height:1.4">
            <b>Claimant:</b> ${t.c.toLocaleString()} (${t.r}%)<br/>
            <b>Inactive want:</b> ${t.i.toLocaleString()}<br/>
            <b>Total seekers:</b> ${(t.c+t.i).toLocaleString()}<br/>
            <b>Vacancies:</b> ${t.v.toLocaleString()}<br/>
            <b>Gap official:</b> ${t.v-t.c}<br/>
            <b style="color:${(t.v-(t.c+t.i))<0?'#dc2626':'#059669'}">Gap true: ${t.v-(t.c+t.i)}</b><br/>
            <b>AI:</b> ${t.ai}% (~${Math.round(t.w*t.ai/100).toLocaleString()} jobs)<br/>
            <div style="margin-top:6px;font-size:10px;color:#64748b">True Gap = Claimant (1.69m) + Inactive want (1.8m of 9.12m) = ~3.5m</div>
          </div>
        </div>
      `);
      m.on('click',()=>setSelected(t));
      markersRef.current.push({marker:m,data:t});
    });
    if(filtered.length===1){
      map.flyTo([filtered[0].lat, filtered[0].lng], 11, {duration:1.2});
      setTimeout(()=>{ const f = markersRef.current.find(x=>x.data.name===filtered[0].name); if(f) f.marker.openPopup(); setSelected(filtered[0]); }, 600);
    } else if(filtered.length>1 && filtered.length<20){
      const group = L.featureGroup(markersRef.current.map(x=>x.marker));
      try{ map.fitBounds(group.getBounds().pad(0.2)); }catch(e){}
    }
  },[filtered,showTrue,showAi]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={()=>setShowTrue(false)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${!showTrue ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'}`}>
            Official (1.69m)
          </button>
          <button onClick={()=>setShowTrue(true)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${showTrue ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-md shadow-teal-500/20' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'}`}>
            True Gap (3.5m)
          </button>
          <button onClick={()=>setShowAi(!showAi)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${showAi ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}>
            <span>AI</span> <span className={`text-[10px] px-1 py-0 rounded ${showAi?'bg-black/20':'bg-slate-800'}`}>{showAi?'ON':'OFF'}</span>
          </button>
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search e.g. Gosport, Mansfield..." className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            {search && (<button onClick={()=>setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded bg-slate-800 text-slate-400 hover:text-white">✕</button>)}
          </div>
          <div className="text-[11px] text-slate-400 font-mono hidden lg:block">{filtered.length}/650</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-3">
        <div ref={mapDiv} className="h-[68vh] lg:h-[72vh] rounded-xl border border-slate-800 overflow-hidden bg-slate-100" />
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-purple-300 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>Legend</h3>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#dc2626] border border-slate-950"></span><span className="text-slate-300"><b className="text-white">Red = Job desert</b> vacancies {'<'} seekers</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#f59e0b] border border-slate-950"></span><span className="text-slate-300"><b className="text-white">Amber = Tight</b> gap {'<'}30% of seekers</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#10b981] border border-slate-950"></span><span className="text-slate-300"><b className="text-white">Green = More vacancies</b></span></div>
              {showAi && (
                <div className="pt-2 border-t border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-amber-400 uppercase">AI Risk Mode</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#dc2626]"></span><span>≥25% jobs at risk</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span><span>18-24% at risk</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#10b981]"></span><span>{'<'}18% at risk</span></div>
                </div>
              )}
            </div>
          </div>

          {selected ? (
            <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/40 space-y-2">
              <div className="flex items-center justify-between"><h4 className="font-black text-sm text-white">{selected.name}</h4><span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selected.v-(selected.c+(showTrue?selected.i:0))<0 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>{selected.v-(selected.c+(showTrue?selected.i:0))<0 ? 'Desert' : 'Surplus'}</span></div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800"><div className="text-slate-500 text-[10px] uppercase">Claimant</div><div className="font-bold font-mono text-white">{selected.c.toLocaleString()} ({selected.r}%)</div></div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800"><div className="text-slate-500 text-[10px] uppercase">Inactive want</div><div className="font-bold font-mono text-white">{selected.i.toLocaleString()}</div></div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800"><div className="text-slate-500 text-[10px] uppercase">Total seekers</div><div className="font-bold font-mono text-purple-300">{(selected.c+selected.i).toLocaleString()}</div></div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800"><div className="text-slate-500 text-[10px] uppercase">Vacancies</div><div className="font-bold font-mono text-teal-300">{selected.v.toLocaleString()}</div></div>
              </div>
              <div className={`p-2.5 rounded-lg border text-xs font-bold ${selected.v-(selected.c+(showTrue?selected.i:0))<0 ? 'bg-red-950/40 border-red-800/50 text-red-300' : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'}`}>Gap {showTrue?'true':'official'}: {selected.v-(selected.c+(showTrue?selected.i:0))} {selected.v-(selected.c+(showTrue?selected.i:0))<0 ? 'jobs short' : 'spare jobs'}</div>
              <div className="p-2 rounded-lg bg-amber-950/20 border border-amber-800/30 text-[11px]"><div className="text-amber-400 font-bold text-[10px] uppercase">AI Exposure</div><div className="text-white font-mono">{selected.ai}% (~{Math.round(selected.w*selected.ai/100).toLocaleString()} jobs)</div></div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 border-dashed text-center"><div className="text-xs text-slate-400">Click a circle or search<br/><span className="font-bold text-slate-300">e.g. type Gosport</span> - map will fly and zoom</div></div>
          )}

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] leading-relaxed text-slate-500"><b className="text-slate-400">True Gap = Claimant (1.69m)</b> House of Commons Library CBP-8748 Aug 2026 + <b className="text-slate-400">Inactive who want job (1.8m of 9.12m)</b> from your screenshot = ~3.5m seekers vs ~820k ONS vacancies. ILO 1.78m is survey-volatile locally, claimant is robust. OSM tiles - no API key. Scale to ONS CC02 for monthly.</div>
        </div>
      </div>
    </div>
  );
}