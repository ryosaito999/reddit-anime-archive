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
		return "https://www.reddit.com/r/anime/search.json?q=title:" + title + "+AND+discussion+NOT+rewatch+NOT+dub+NOT+only&restrict_sr=on&sort=relevance&t=all&limit=100"
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
				console.log(threadList);
				for(var i =0 ; i < threadList.length ; ++i){
					var title = threadList[i].data.title;
					//console.log(title);
					var regex =  /.*(Episode|OVA|Movie|Film).*(\d+|)\s+.*discussion/i
					
					if(regex.test(title)){

						//push these discussions into list using objs
						var obj = { 
								title: threadList[i].data.title,
								url: threadList[i].data.url,
								date: parseInt(JSON.stringify(threadList[i].data.created_utc)),
								score: threadList[i].data.score,
								key: threadList[i].data.id

						}

						//console.log(obj.key);

						//console.log(obj.url)

						discussionThreadList.push(obj);
					}
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
				<div className = "HeaderArea">
					<Header/>
					<div className = "searchArea">
						<SearchForm onFormSubmit = {this.onSubmit} />
					</div>
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
					<h1>R/Anime Episode Discussion Archive</h1>
				</div>
			</div>
		);
	}
});



var SearchForm = React.createClass({
	
	log: function(){
		console.log("test");
		return;
	},

  	getInitialState: function(){
		return { title: ''} ;
	},

    componentDidMount: function() {
    	//from typahead docs
        var titles = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: data 
         });

        $(this.refs.input).typeahead({
		  hint: false,
		  highlight: true,
		  minLength: 2
		},
		
		{
		  name: 'titles',
		  source: titles
		});

        //not sure why this works?????
		$(this.refs.input).bind('typeahead:select', function(ev, suggestion) {
  			console.log('Selection: ' + suggestion);
		}).on("typeahead:selected typeahead:autocompleted", this.handleSubmit);

		//on enter key pressed, autocomplete first avaialbe result 
        var searchBoxRef = $(this.refs.input);
        searchBoxRef.keydown(function(e) {
        	//if enter key is pressed
            if (e.which == 13) { 
                var dummyEvent = $.Event('keydown');
                dummyEvent.which = dummyEvent.keyCode = 9; // replicate
                searchBoxRef.trigger(dummyEvent);
            }
        });



    },


  	handleTitleChange: function(e) {
  		this.setState( { title: e.target.value});
  	},

	handleSubmit: function(e, title){
		e.preventDefault();
		
		var title = title.trim();
		if(!title){
			return;
		}

		//send title to main app root class 
		this.props.onFormSubmit({ title: title});
		this.setState({title: "", margin: 0});
	},

	render: function(){

		return (
			//will bubble up without using form
			<input
				className = "searchBox"
				ref = "input"
				type="text"
				placeholder = "Lookup an anime title"
				value = {this.state.title}
				onChange = {this.handleTitleChange} 
			/>
		);
	}
});

var TitleInfo  = React.createClass({


	componentDidUpdate() {
		ReactDOM.findDOMNode(this).scrollTop = 0;
	},


	render: function(){
		return (
			<div className = "titleInfo">
				<h1> {this.props.title} </h1>
			</div>
		);
	}
});

var ThreadListing = React.createClass({


	render: function(){

		var currentTitle = this.props.currentTitle;
		var threadNodes = this.props.dataList.map(
			function(node){	
				return(
			        <Thread key = {node.key} title={node.title} url = {node.url} score = {node.score} date = {node.date} > </Thread>
				);
			}
		);
		//console.log( this.props.dataList);
		
		return (
			<div className = "ThreadListing">
				<TitleInfo title = {currentTitle}/>
				{threadNodes}
			</div>
		);
	}
});
var Thread = React.createClass({
	render: function(){
		
		return (
			<div className = "Thread">
				<a href={this.props.url} >{this.props.title}</a>
			</div>
		);
	}
});

ReactDOM.render(
	<App />, 
	document.getElementById('content')
);


