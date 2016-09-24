var App = React.createClass({
	//var currentTitle = null;

	render: function(){
		return (
			<div>
				<SearchForm />
			</div>
		);
	}
});

// var Header = React.createClass({

// 	render: function(){
// 		return (

// 		);
// 	}
// });

var SearchForm = React.createClass({
	
  	getInitialState: function(){
		return {title: ''} ;
	},

  	handleTitleChange: function(e) {
  		this.setState( { title: e.target.value});
  	},

  	returnRedditJSONResult: function(title){
  		//reddit api comes in here
  		//make a GET request using the data
  	},

  	returnJSON: function(url){
  		var data = "";
		//fetch api instead of ajax call (wanted to try it)
		fetch(url).then(function(response) {
  			//return response.json();
		}).then(function(data) {
			data = JSON.stringify(data) ;
		}).catch(function(err) {
			// Error :(
		});

		return data;

  	},

	handleSubmit: function(e){
		e.preventDefault();
		
		var title = this.state.title.trim();
		if(!title){
			return;
		}
		console.log(title); 
		var jsonData = this.returnJSON("https://www.reddit.com/r/anime/search.json?q=" + title + "&sort=new");

		console.log(jsonData);
  		//returnRedditJSONResult(title);
		//this.props.onCommentSubmit({author: author, text:text});
		//this.setState({title: ''});
	},

	render: function(){
		return (
			<form className="SearchForm" onSubmit={this.handleSubmit}>
				<input
					type="text"
					placeholder = "Enter an anime title"
					value = {this.state.title}
					onChange = {this.handleTitleChange} 
				/>

				<input type= "submit" value = "Post" />
			</form>

		);
	}
});

// var ThreadList = React.createClass({
// 	//
// 	render: function(){
// 		return (

// 		);
// 	}
// });


// var Thread = React.createClass({

// 	render: function(){
// 		return (

// 		);
// 	}
// });




ReactDOM.render(
	<App />, 
	document.getElementById('content')
);


