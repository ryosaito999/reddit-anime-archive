var App = React.createClass({
	//var currentTitle = null;

	getInitialState: function() {
		return {
			headerOn: true,
			discussionTitle: "",
			discussionList: [],

		};
	},

	getResourceURL: function(title){
		return "https://www.reddit.com/r/anime/search.json?q=title:" + title + "+AND+discussion&restrict_sr=on&sort=relevance&t=all&limit=100"
	},

	getPicture: function(full_title){
		//add some sort of anime db search here (not sure where to get it...)
	},


	onSubmit: function(discussionTitle){

		var discussionThreadList = [];
		var title = "";

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
							date: parseInt(JSON.stringify(threadList[i].data.created_utc)),
							score: threadList[i].data.score
					}

					discussionThreadList.push(obj);
				}
            }
        });

        //sort threads by oldest first (dont need to parse in episode titles :D)
        discussionThreadList.sort(function(a, b) {
   			return parseFloat(a.date) - parseFloat(b.date);
		});

        //console.log(discussionThreadList);
        //update states
        this.setState({'discussionList': discussionThreadList, 'headerOn': false, 'discussionTitle': discussionTitle.title } );
	},

	render: function(){
		//turn off header once user seraches for anime
		var headerOn = this.state.headerOn ? <Header /> : '';

		return (
			<div className = "App">
				{headerOn}
				<div className = "searchArea">
					<SearchForm onFormSubmit = {this.onSubmit} />
				</div>
                <ThreadListing dataList = {this.state.discussionList} currentTitle = {this.state.discussionTitle} />

			</div>
		);
	}


});

var Header  = React.createClass({

	render: function(){
		return (
			<div className = "header" ref="textHeader" >
				<div className = "headerText">
					<h1>R/Anime Discussion Archive</h1>
					<p>Find any past discussion thread of any anime perviously posted on reddit's anime subreddit. </p>
					<p>Enter an anime title and hit serach!</p>
				</div>

			</div>
		);
	}
});



var SearchForm = React.createClass({
	
  	getInitialState: function(){
		return {margin: 20 , title: ''} ;
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

		//send title to main app root class 
		this.props.onFormSubmit({ title: title });
		this.setState({title: "", margin: 0});

	},

	render: function(){

		return (
			<form className="searchForm" onSubmit={this.handleSubmit} >
				<input
					className = "inputBox"
					ref = "input"
					type="text"
					placeholder = "Enter an anime title"
					value = {this.state.title}
					onChange = {this.handleTitleChange} 
				/>

				<input className="submitBtn" type= "submit" value = "Post" />
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
			        <Thread title={node.title} key = {node.url} score = {node.score} date = {node.date} > </Thread>
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
var Thread = React.createClass({
	render: function(){
		
		return (
			<div className = "Thread">
				<ul><li><a href={this.props.url}>{this.props.title}</a></li></ul>
			</div>
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


