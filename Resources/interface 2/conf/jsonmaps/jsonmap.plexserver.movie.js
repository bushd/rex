jsonmap = {
	plexserver: {
		baseContainer: {
			id: '{@ratingKey}',
			title: '{@title}',
			subtitle: '{@subtitle}',
			plot: '{@summary}',
			short: '',
			genre: [],
			year: '{@year}',
			contentRating: '{@contentRating}',
			studio: '{@studio}',
			country: '{@country}',
			ratings: [],
			tags: [],
			languages: [],
			watched: false,
			cover: '',
			backdrop: '',
			media: [],
			mediaLoader: 'plexserver',
		},

		sections: {
			id: '{@key}',
			title: '{@title}',
			type: '{@type}',
			language: '{@language}',
			backdrop: '',
			folder: [],
			mediaLoader: 'plexserver',
		},

		movie: {
			imdb: '',
			director: [],
			writer: [], 
			producer:[],
			cast: [],
		},

		show: {
			episodes: '{@leafCount}',
			seasons: '',
			genre: [],
			year: '{@year}',
			contentRating: '{@contentRating}',
			viewedEpsiodes: '{@viewedLeafCount}',
		},

		season: {
			showId: '{@parentRatingKey}',
			season: '{@index}',
			show: '{@parentTitle}',
			episodes: '{@leafCount}',
			watchedEpisodes: '{@viewedLeafCount}',
			showPlot: '',
		},

		epsiode: {
			thetvdb: '',
			seasonId: '{@parentRatingKey}',
			showId: '',
			show: '{@grandparentTitle}',
			seasonTitle: '',
			season: '',
			contentRating: '{@contentRating}',
			studio: '{@studio}',
			director: [],
			writer: [], 
			producer:[],
			cast: [],
		},

		media: {
			id: '{@id}',
			available: false,
			duration: '{@duration}',
			videoBitrate: '{@bitrate}',
			height: '{@height}',
			width: '{@width}',
			aspectRatio: '{@aspectRatio}',
			resolution: '{@videoResolution}',
			frameRate: '{@videoFrameRate}',
			videoCodec: '{@videoCodec}',
			audioCodec: '{@audioCodec}',
			audioChannels: '{@audoChannels}',
			files: [],
			audioTracks: [],
			videoTracks: [],
			subtitles: [],
			mediaLoader: 'plexserver',
		}
	}
};