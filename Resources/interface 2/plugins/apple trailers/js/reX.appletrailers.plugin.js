function StringToXML(text){
                if (window.ActiveXObject){
                  var doc=new ActiveXObject('Microsoft.XMLDOM');
                  doc.async='false';
                  doc.loadXML(text);
                } else {
                  var parser=new DOMParser();
                  var doc=parser.parseFromString(text,'text/xml');
                }
                return doc;
            }
 


if ( typeof(appletrailers) == 'undefined' ) appletrailers = function() {};

appletrailers.version = '0.1 alpha';
appletrailers.build = '10.12.2011'

appletrailers.getJustAdded = function (callback) {    
    var request = new Request.JSON({
        url: 'http://trailers.apple.com/trailers/home/feeds/just_added.json',
        method: 'post',
        onRequest: function() {
            reX.debug('[APPLETRAILERS][REQUEST]', REX_DEBUG);
        },
        onFailure: function(msg) {
            reX.debug('[APPLETRAILERS][FAILURE] uhoh! something went wrong. ' + msg, REX_ERROR);
        },
        onSuccess: function(json){
            callback(json);
        }
    }).send();
}

appletrailers.getTrailers = function (location, callback) {    
    var request = new Request.HTML({
        url: 'http://trailers.apple.com' + location + 'includes/playlists/web.inc',
        evalScripts: false,
        onSuccess: function(tree){
            result = [];

            Slick.search(tree[2], 'li.trailer').each(function(item) {
                var title = item.getElement('div.first h3').get('text');
                var longtext = item.getElement('div.first p').get('text');
                
                var index = longtext.indexOf('Posted:');
                var date = longtext.substr(index+8, 8);
                
                var index = longtext.indexOf('Runtime:');
                var runtime = longtext.substr(index+9).trim();
                
                console.log(title);
                console.log(date);
                console.log(runtime);
                
                var image = item.getElement('div.last img[alt="Teaser"]').get('src');
                var trailers = [];
                
                item.getElements('div.last ul.dropdown-overlay a[rel]').each(function(trailer) {
                    trailers.push({"url":trailer.getProperty('href')});
                });
                
                
                console.log(image);
                
                var obj = {
                    "title": title,
                    "date": date,
                    "runtime": runtime,
                    "thumb": image,
                    "trailers": trailers
                };
                
                result.push(obj);
            });
            
                    
            callback(result);
        }
    }).send();
}
