var App = React.createClass({
	//var currentTitle = null;

	getInitialState: function() {
		return {
			titleActive: false,
			discussionTitle: null,
			discussionList: null,

		};
	},

	getResourceURL: function(title){
		return "https://www.reddit.com/r/anime/search.json?q=" + title +" &restrict_sr=on&sort=relevance&t=all";
	},

	getPicture: function(full_title){

	},

	onSubmit: function(discussionTitle){
		var discussionThreadList = [];
		//console.log(this.getResourceURL(discussionTitle.title));
			
        $.ajax({
            type: 'get',
            url: this.getResourceURL(discussionTitle.title),
            async: false,
            success: function(data) {
				console.log(JSON.stringify(data));

            }
        });


	},

	render: function(){
		return (
			<div>
				<SearchForm onFormSubmit = {this.onSubmit} />
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
  		
  	},

	handleSubmit: function(e){
		e.preventDefault();
		
		var title = this.state.title.trim();
		if(!title){
			return;
		}

		this.props.onFormSubmit({ title: title })
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


