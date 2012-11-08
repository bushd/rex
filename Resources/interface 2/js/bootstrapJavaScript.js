//bootstrap rex JS files
files = [
	//mootools
	'js/mootools/mootools.js',
	'js/mootools/mootools.more.js',

	//regular JS
	'js/xml2json.js',
	'js/less.js',

	//singelston
	'js/mootools/mt.class.singleton.js',

	//mootools plugins

	//mootools overwrites
	'js/mootools/mt.json.js',
	'js/mootools/mt.overwrites.js',

	//reX
	'js/reX/reX.js',

	//helper classes
	'js/mootools/mt.class.debug.js',
	'js/mootools/mt.request.xml2json.js',
	'js/mootools/mt.class.lazyload.js',
	'js/mootools/mt.class.messagecenter.js',
	'js/mootools/mt.class.publisher.js',
	'js/mootools/mt.class.listener.js',
	'js/mootools/mt.class.substitute.js',
	'js/mootools/mt.class.template.js',
	'js/mootools/mt.class.skin.js',
	'js/mootools/mt.class.overlay.js',

	//reX specific plugins
	
	'js/reX/reX.controls.v2.js',
	'js/reX/reX.resourcemanager.js',
    'js/reX/reX.utility.js',
	'js/reX/reX.mediaplayer.js',
	'js/reX/reX.json2html.js',
	'js/reX/reX.mediamanager.js',
	'js/reX/reX.skinmanager.js',
	'js/reX/reX.preferencemanager.js',
	'js/reX/reX.menu.js',
	'js/reX/reX.plugin.js',
	'js/reX/reX.scrolllist.js',
	'js/reX/reX.sortfilter.js',
	'js/reX/reX.filter.js',
	'js/reX/reX.restrictions.js',
	'js/reX/reX.user.js',

	//reX Data
	'js/reX/data/reX.data.js',
	'js/reX/data/reX.data.home.js',
	'js/reX/data/reX.data.homegrouped.js',

	//reX MediaLoader
	'js/reX/reX.medialoader.js',

	'conf/jsonmaps/jsonmap.plexserver.movie.js',
	'js/reX/medialoader/reX.medialoader.movie.plexserver.js',

	//reX Moduls
	'js/reX/modules/reX.module.js',
	'js/reX/modules/reX.module.list.js',
	'js/reX/modules/reX.module.scroller.js',

	//for debugging:
	'js/fake.js'
]

for (var i in files) {
	document.write('<scr' + 'ipt type="text/javascript" src="' + files[i] + '"></scr' + 'ipt>');
}

        