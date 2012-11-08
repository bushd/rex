reX.complexFilterKeyMapping = [
	'cast', 'actor', 'resolution', 'sd', 'hd'
]

reX.filter = function(objects, key, condition, value) {
	
		var fn;

		switch (condition.toLowerCase()) {

			case '=':
			case '==':
			case 'equals':
						fn = (function(compareValue, conditionValue) {
							return (compareValue == conditionValue);
						});
						break;

			case '!=':
			case '<>':
			case 'equalsnot':
			case 'notequal':
						fn = (function(compareValue, conditionValue) {
							return (compareValue != conditionValue);
						});
						break;

			case '<':
			case 'lt':
			case 'islessthan':
						fn = (function(compareValue, conditionValue) {
							return (compareValue < conditionValue);
						});
						break;

			case '<=':
			case 'le':
			case 'islessorequalthan':
						fn = (function(compareValue, conditionValue) {
							return (compareValue <= conditionValue);
						});
						break;

			case '>':
			case 'gt':
			case 'isgreaterthan':
						fn = (function(compareValue, conditionValue) {
							return (compareValue > conditionValue);
						});
						break;

			case '>=':
			case 'ge':
			case 'isgreaterorequalthan':
						fn = (function(compareValue, conditionValue) {
							return (compareValue >= conditionValue);
						});
						break;

			case 'notin':
						fn = (function(compareValue, conditionValues) {
							return !conditionValues.contains(compareValue);
						});
						break;

			case 'in':
						fn = (function(compareValue, conditionValues) {
							return conditionValues.contains(compareValue);
						});
						break;

			default:
						fn = (function(compareValue, conditionValues) {
							return false;
						});
						break;
								
		}

		return reX.simpleFilter(objects, fn, key, value);
}

reX.simpleFilter = function(objects, fn, key, value) {
	result = new Array();
	objects.each(function(json) {
		if (fn(json[key], value)) {
			result.push(json);
		}
	});

	return result;
}

reX.complexFilter = function(objects, fn, key, value) {

	var get;

	switch (key.toLowerCase) {

		case 'resolution': 
					get = (function(item) {
						return item['media'];
					});
					break;
	}

	result = new Array();
	objects.each(function(json) {
		var obj = get(json);
		if (fn(obj[key], value)) {
			result.push(json);
		}
	});

	return result;
}