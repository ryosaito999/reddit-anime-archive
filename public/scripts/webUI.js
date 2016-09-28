var App = React.createClass({
	//var currentTitle = null;

	getInitialState: function() {
		return {
			titleActive: false,
			discussionTitle: "",
			discussionList: [],

		};
	},

	getResourceURL: function(title){
		return "https://www.reddit.com/r/anime/search.json?q=title:" + title + "+AND+discussion+AND+episode+AND+Spoilers%29+AND+%28+NOT+rewatch+NOT+trivia%29&restrict_sr=on&sort=relevance&t=all&limit=100"
	},

	getPicture: function(full_title){
		//add some sort of anime db search here (not sure where to get it...)
	},



	onSubmit: function(discussionTitle){

		var discussionThreadList = [];
		var title = "aaaaa";

        $.ajax({
            type: 'get',
            url: this.getResourceURL(discussionTitle.title),
            async: false,
            success: function(data) {
				//testing json data 				
				var threadList = data.data.children;
				//console.log(threadList);
				for(var i =0 ; i < threadList.length ; ++i){

					//push these discussions into list using objs
					var obj = { 
							title: threadList[i].data.title,
							url: threadList[i].data.url,
							date: parseInt(JSON.stringify(threadList[i].data.created_utc))
					}

					discussionThreadList.push(obj);
				}
            }
        });

        //sort threads by oldest first (dont need to parse in episode titles :D)
        discussionThreadList.sort(function(a, b) {
   			return parseFloat(a.date) - parseFloat(b.date);
		});

        console.log(discussionThreadList);
        this.setState({'discussionList': discussionThreadList, 'titleActive': true, 'discussionTitle': discussionTitle.title } );

	},

	render: function(){
		return (
			<div className = "App">
				<SearchForm onFormSubmit = {this.onSubmit} />
                <ThreadListing dataList = {this.state.discussionList} currentTitle = {this.state.discussionTitle} />

			</div>
		);
	}


});


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
					placeholder = "Enterpran anime title"
					value = {this.state.title}
					onChange = {this.handleTitleChange} 
				/>

				<input type= "submit" value = "Post" />
			</form>

		);
	}
});



var ThreadListing = React.createClass({
	render: function(){

		var currentTitle = this.props.currentTitle;
		var threadNodes = this.props.dataList.map(
			function(node){	
				return(
					//<div> {node.title} </div>
					<ul><li><a href={node.url} > {node.title} </a></li></ul>

				);
			}
		);

		//console.log( this.props.dataList);
		
		return (
			<div className = "ThreadListing">
				<h1> {currentTitle} </h1>
				{threadNodes}
			</div>
		);
	}
});


// var Thread= React.createClass({

// 	render: function(){
// 		return (
// 				<div className = "Thread">
// 					<h2 className = "ThreadName">
// 						{this.props.name}
// 					</h2>
// 				</div>
// 			);
// 	}
// });


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


