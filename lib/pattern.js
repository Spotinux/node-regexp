var fs = require('fs');
var DefaultLocalePattern = process.env.LANG.split('_')[0].toLowerCase();
var LocalePattern = null;

patterns = {
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
        LocalPattern = l.toLowerCase()
    },
    
    getLocale: function() {
        if (LocalePattern != null) {
            return LocalePattern;
        }
        
        return 'us';
    },
    
    get: function(name) {
        locale = DefaultLocalePattern;
        
        if (LocalePattern != null) {
            locale = LocalePattern; 
        }
                        
        if (this.locales[locale] == undefined) {
            locale = 'us';
        }
                
        if (this.locales[locale][name] != undefined) {
            return this.locales[locale][name];
        }
            
        return '';
    }
}

fs.readdirSync(__dirname + '/locales/').forEach(function(e) {
    lang = e.split('.')[0].toLowerCase();
    patterns.locales[lang] = require(__dirname + '/locales/' + e); 
});

Object.defineProperty(patterns, 'address', {get: function() { return patterns.get('address') } });
Object.defineProperty(patterns, 'zipCode', {get: function() { return patterns.get('zipCode') } });
Object.defineProperty(patterns, 'phone', {get: function() { return patterns.get('phone') } });
Object.defineProperty(patterns, 'date', {get: function() { return patterns.get('date') } });
Object.defineProperty(patterns, 'siret', {get: function() { return patterns.get('siret') } });
Object.defineProperty(patterns, 'siren', {get: function() { return patterns.get('siren') } });
Object.defineProperty(patterns, 'iban', {get: function() { return patterns.get('iban') } });
Object.defineProperty(patterns, 'state', {get: function() { return patterns.get('state') } });

module.exports = patterns;