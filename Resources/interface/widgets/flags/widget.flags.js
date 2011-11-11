
    function init() {
        var request = new Request.HTML({
            url: 'widgets/flags/flags.html',
            method: 'get',
            update: 'widgets',
            onSuccess: function(responseTree, responseElements, responseHTML, responseJavaScript) {            
                window.fireEvent('flagWdgetReady');
            }
        }).send();
    };
    
    function update(item) {
        var media = reX.state.section.json[item].Media;
        
        console.log(media);
        
        if(reX.preferences.widgets.flags.resolution == true) {
            var resolutions = $$('#widgets #flags .resolutionFlag');
            resolutions.each(function(element) {
                element.set('text', media['@videoResolution']);
                console.log('set resolution to ' + media['@videoResolution']);
                element.show();
            });
        }
    };

window.addEvent('domready', function () {
    init();
});


window.addEvent('flagWidgetReady', function () {


    console.log('hier');

    reX.preferences.widgets.flags = {
                resolution: true,
                audio: true,
                channels: true,
                codec: true,
                ratio: true
            }


    reX.state.events = {

        selectionChange: function(item) {
            var i = item.getProperty('idx');
            console.log('updating ' + i);
            $$('#widgets #flags').getChildren().hide();
            update(i);
        }
    }

    window.addEvents(reX.state.events);
    
    

});

