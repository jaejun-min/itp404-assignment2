
let redditTemplateString = document.getElementById('reddit-template').innerHTML;
let renderReddit = Handlebars.compile(redditTemplateString);


Handlebars.registerHelper('formatted-num', function(num){
  return num.toLocaleString('commas');
});

$('#search').on('submit', function(event){

	event.preventDefault();
	$('#results').html(
		'<div class="loader"></div>');
	let searchName = $('#searchText').val();
	let url = 'https://www.reddit.com/r/' + searchName + '.json'
	fetch(url).then(function(response){
		let promise = response.json();
		return promise;
	}).then(function(lists){
		console.log(lists)
		

	let renderedReddit = renderReddit({
	    reddits: lists
	  });
	  $('#results').html(renderedReddit);
	}, function(error){
		console.log('error', error);
		console.error('an error occured');
		$('#results').html("<h2>Opps! Something went wrong!</h2>");
	});
});

