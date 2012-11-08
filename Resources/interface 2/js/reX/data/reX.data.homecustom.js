Data.HomeCustom = new Class({

	Extends: BaseData,

	get: function() {
		return {
			return [
			{
				'@title': 'Movies',
				'attributes': {
					'data-type': 'custom',
				}
			},
			{
				'@title': 'Shows',
				'attributes': {
					'data-type': 'custom',
				}
			},
			{
				'@title': 'Erotic',
				'attributes': {
					'data-type': 'custom',
				}
			},
			{
				'@title': 'Music',
				'attributes': {
					'data-type': 'custom',
				}
			},
			{
				'@title': 'Picture',
				'attributes': {
					'data-type': 'custom',
				}
			},
			{
				'@title': 'Settings',
				'attributes': {
					'data-type': 'plugin',
				}
			}
		};
	}

});