var fs = require('fs');
var DefaultLocalePattern = process.env.LANG.split('_')[0].toLowerCase();
var LocalePattern = null;

var patterns = {
    // common regex
    email: '^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$',
    hex: '^#?([a-f0-9]{6}|[a-f0-9]{3})$',
    html: '^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$',
    ip: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    slug: '^([a-z0-9-]+)$',
    url: '^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$',
    
    // credit card
    creditcard: require('./creditcard'),
    
    // locales
    locales: {},
    
    // function
    setLocale: function(l) {
        LocalPattern = l.toLowerCase();
    },
    
    getLocale: function() {
        if (LocalePattern !== null) {
            return LocalePattern;
        }
        
        return 'us';
    },
    
    get: function(name) {
        var locale = DefaultLocalePattern;
        
        if (LocalePattern !== null) {
            locale = LocalePattern; 
        }
                        
        if (this.locales[locale] === undefined) {
            locale = 'us';
        }
                
        if (this.locales[locale][name] !== undefined) {
            return this.locales[locale][name];
        }
            
        return '';
    }
};

fs.readdirSync(__dirname + '/locales/').forEach(function(e) {
    var lang = e.split('.')[0].toLowerCase();
    patterns.locales[lang] = require(__dirname + '/locales/' + e);

    for(var key in patterns.locales[lang]) {
        (function(k){
            "use strict";
            function set(key) {
                if (patterns.hasOwnProperty(key) === false) {
                    Object.defineProperty(patterns, key, {
                        get: function () {
                            return patterns.get(key);
                        }
                    });
                }
            };

            set(k);
        })(key);
    }
});

module.exports = patterns;