

reX.PreferenceManager = new Class({

	initialize: function() {
        reX.preferences = Object.merge(reX.preferences, JSON.decode(js2objcBridge.loadPreferences()));
        console.log(JSON.encode(reX.preferences));
    },
    
    save: function() {
        js2objcBridge.setPreferences(JSON.parse(this.preferences));
    },
    
    set: function(key, value) {
        reX.preferences[key] = value;
    },
    
    get: function(key) {
        return reX.preferences[key];
    }
});

reX.preferences = {
    accounts: {
        name: 'Accounts',
        items: {
            rex: {
                name: 'reX',
                description: 'reX User Accounts',
                type: 'group',
                items: [{
                    username: {
                        name: 'Name',
                        description: '',
                        value: 'baschdi',
                        type: 'text'
                    }, 
                    password: {
                        name: 'Password',
                        description: '',
                        type: 'password',
                        value: undefined
                    }, 
                    email: {
                        name: 'Email',
                        description: '',
                        type: 'email',
                        value: 'bushd@gmx.net'
                    }
                }]
            },
            myplex: {
                name: 'myPlex',
                description: 'myPlex User Accounts',
                type: 'group',
                items: [{
                    username: {
                        name: 'Username / email',
                        description: '',
                        value: 'bushd@gmx.net',
                        type: 'text'
                    }, 
                    password: {
                        name: 'Password',
                        description: '',
                        type: 'password',
                        value: undefined
                    }
                }]
            },
            google: {
                name: 'google',
                description: 'google Login',
                type: 'group',
                items: []
            },
            facebook: {
                name: 'facebook',
                description: 'facebook Login',
                type: 'group',
                items: []
            },
            twitter: {
                name: 'Twitter',
                description: 'Twitter Account',
                type: 'group',
                items: []
            }
        }
    }, 
    system: {
        name: 'System',
        items: {}
    }, 
    video: {
        name: 'Video',
        items: {
            refreshrate: {
                name: 'Refresh Rate',
                description: 'match the refresh rate of monitor and video if possible',
                value: true,
                type: 'boolean'
            }
        }
    }, 
    audio: {
        name: 'Audio',
        items: {}
    }, 
    skin: {
        name: 'Skin',
        items: {
            skin: {
                name: 'Skin',
                description: '',
                type: 'dynmaiclist',
                dynamicvalues: 'skins'
            }, 
            theme: {
                name: 'Theme',
                description: '',
                type: 'dynmaiclist',
                dynamicvalues: 'themes'
            }
        }
    }, 
    lookandfeel: {
        name: 'Look And Feel',
        items: {}
    },
    plugins: {
        name: 'Plugins',
        items: {
            plugin: {
                name: 'Plugins',
                description: '',
                type: 'dynmaiclist',
                dynamicvalues: 'plugins'
            }
        }
    }
};