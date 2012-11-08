Data.HomeGrouped = new Class({

	Extends: BaseData,

	get: function() {

		return [
			{
				'@title': 'Movies',
				'attributes': {
					'data-type': 'group',
					'data-media': 'movie'
				}
			},
			{
				'@title': 'Shows',
				'attributes': {
					'data-type': 'group',
					'data-media': 'show'
				}
			},
			{
				'@title': 'Music',
				'attributes': {
					'data-type': 'group',
					'data-media': 'artist'
				}
			},
			{
				'@title': 'Picture',
				'attributes': {
					'data-type': 'group',
					'data-media': ''
				}
			},
			{
				'@title': 'Settings',
				'attributes': {
					'data-type': 'plugin',
				}
			}
		];
	}

});