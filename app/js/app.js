(function () {
  var app = new Ractive({
    el: '#mainContent',
    template: '#bars-tpl',
    data: {
      progressData:[
		{name:'bar1', level:25},
		{name:'bar2', level:10},
		{name:'bar3', level:5},
	  ],
	  levels: [
		{nextlevel:25}, 
		{nextlevel:10}, 
		{nextlevel:-10}, 
		{nextlevel:-25}
	  ],
	  minLevel : 0,
	  maxLevel : 100 
    },
    getNextLevel: function(nextlevel){

		var getbar = this.get('value');

		if(getbar === null) { 
			return;
		}			
		var newLevel = (this.get('progressData[' + getbar + '].level') + nextlevel);
		
		if(newLevel < 0) {
			newLevel = 0;
		} else if (newLevel > 100) {
			newLevel = 100;
		}
		
		this.set('progressData[' + getbar + '].level', newLevel);
	}
  });
}());