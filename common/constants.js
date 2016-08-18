this.Constants = new function(){
    this.configAPIUrl = {
            trueData : {
                server : 'http://api.fermat.org',
                port : {
                    devs : 'env=development'
                },
                route : {
                    comps : '/v1/repo/comps',
                    procs : '/v1/repo/procs',
                    user : '/v1/repo/devs',
                    servers : '/v1/network/servers',
                    nodes : '/v1/network/node',
                    login : '/v1/auth/login',
                    logout : '/v1/auth/logout'
                }
            },
            testData : {
                server : 'json/testData',
                port : {
                    devs : ''
                },
                route : {
                    comps : 'comps.json',
                    procs : 'procs.json',
                    user : 'devs.json',
                    servers : 'servers.json',
                    nodes : 'node.json'
                }
            }
    };


    this.test_map = {load : "table",table : {top : "",bottom : "",right : "stack",left : ""},stack : {top : "",bottom : "",right : "",left : "table"} };
    this.testFlow = [
        {
            "platfrm": "CBP",
            "name": "connection request from customer to broker",
            "desc": "a customer sends a connection request to crypto broker in order to be able to see his products and start a negotiation.",
            "prev": "list crypto brokers",
            "next": null,
            "steps": [
                {
                    "id": 0,
                    "title": "select broker and submit request",
                    "desc": "the customer selects a broker from the list and submits the request to connect to him.",
                    "type": "start",
                    "next": [
                        {
                            "id": "1",
                            "type": "direct call"
                        }
                    ],
                    "name": "crypto broker community",
                    "layer": "sub app",
                    "platfrm": "CBP"
                },
                {
                    "id": 1,
                    "title": "route request to network service",
                    "desc": "the module routes this request to the network service to reach the selected broker.",
                    "type": "activity",
                    "next": [
                        {
                            "id": "2",
                            "type": "direct call"
                        }
                    ],
                    "name": "crypto broker community",
                    "layer": "sub app module",
                    "platfrm": "CBP"
                },
                {
                    "id": 2,
                    "title": "call the broker to deliver the request",
                    "desc": "the network service places a call to the broker and then it delivers the request via the fermat network.",
                    "type": "activity",
                    "next": [
                        {
                            "id": "1",
                            "type": "direct call"
                        }
                    ],
                    "name": "crypto broker",
                    "layer": "actor network service",
                    "platfrm": "CBP"
                }
            ],
            "upd_at": "5629db8be934756e08c9751a",
            "_id": "5629db8be934756e08c9751b"
        }
    ];
    this.testNetworkNodes = [
        {
            id : "server0",
            type : "node",
            subType : "server",
            os : "linux",
            ady : [
                {
                    id : "server1",
                    linkType : "connected"
                }
            ]
        },
        {
            id : "server1",
            type : "node",
            subType : "server",
            os : "windows",
            ady : [
                {
                    id : "server2",
                    linkType : "connected"
                }
            ]
        },
        {
            id : "server2",
            type : "node",
            subType : "pc",
            os : "linux",
            ady : []
        }
    ];
    this.testNetworkClients = {
        server0 : [
            {
                id : "client0",
                type : "client",
                subType : "phone",
                ady : [
                    {
                        id : "server0",
                        linkType : "connected"
                    },
                    {
                        id : "client3",
                        from : "nService0",
                        linkType : "connected"
                    }
                ]
            },
            {
                id : "client1",
                type : "client",
                subType : "pc",
                ady : [
                    {
                        id : "server0",
                        linkType : "connected"
                    }
                ]
            },
            {
                id : "client2",
                type : "client",
                subType : "phone",
                ady : [
                    {
                        id : "server0",
                        linkType : "connected"
                    }
                ]
            }
        ],
        server1 : [
            {
                id : "client3",
                type : "client",
                subType : "phone",
                ady : [
                    {
                        id : "server1",
                        linkType : "connected"
                    },
                    {
                        id : "client0",
                        from : "nService0",
                        linkType : "connected"
                    }
                ]
            }
        ],
        server2 : []
    };
    this.testNetworkServices = {
        client0 : [
            {
                id : "wallet0",
                type : "wallet",
                subType : "bitcoin_wallet",
                currency : "bitcoin",
                symbol : "BTC",
                balance : "0.0123",
                ady : [
                    {
                        id : "client0",
                        linkType : "installed"
                    }
                ]
            },
            {
                id : "nService0",
                type : "nservice",
                subType : "ukn_service",
                ady : [
                    {
                        id : "client0",
                        linkType : "running"
                    }
                ]
            },
            {
                id : "nService1",
                type : "nservice",
                subType : "ukn_service",
                ady : [
                    {
                        id : "client0",
                        linkType : "running"
                    }
                ]
            },
            {
                id : "nService2",
                type : "nservice",
                subType : "ukn_service",
                ady : [
                    {
                        id : "client0",
                        linkType : "running"
                    }
                ]
            }
        ],
        client1 : [],
        client2 : [],
        client3 : [
            {
                id : "nService0",
                type : "nservice",
                subType : "ukn_service",
                ady : [
                    {
                        id : "client3",
                        linkType : "running"
                    }
                ]
            }
        ]
    };


    this.layers = {
        
        size : function(){
            var count = 0;
            
            for(var key in this){
                //if(this.hasOwnProperty(key))
                    count++;
            }
            
            return count - 1;
        }
    };

    this.platforms = {
        
        size : function(){
            var count = 0;
            
            for(var key in this){
                //if(this.hasOwnProperty(key))
                    count++;
            }
            
            return count - 1;
        }
    };

    this.superLayers = {
        
        size : function(){
            var count = 0;
            
            for(var key in this){
                //if(this.hasOwnProperty(key))
                    count++;
            }
            
            return count - 1;
        }
    };

    this.API_ENV = 'testing';
    this.CLIENT_ID = '1d65cbed13dbd026bec8';

    switch(window.location.href.match("//[a-z0-9]*.[a-z0-9]*")[0].replace("//", '')) {
        case "dev.fermat":
            this.API_ENV = 'production';
            this.CLIENT_ID = 'd00a7c7d4489139327e4';
            break;
        case "dev.bitdubai":
            this.API_ENV = 'development';
            this.CLIENT_ID = 'f98fdd310fe6284f5416';
            break;
        case "lab.bitdubai":
            this.API_ENV = 'testing';
            this.CLIENT_ID = '1d65cbed13dbd026bec8';
            break;
    }
}