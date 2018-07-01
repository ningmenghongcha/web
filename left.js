const STORAGE_KEY = 'abc123';
var store2={
	fetch: function () {
        return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
		console.log(localStorage[STORAGE_KEY])
    },
    save: function (items) {
        window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(items))
		console.log(items)
    }
};

Vue.component('ab',{
	template:'#abcd',
	data:function(){return {
		newList:{
			id:0,
			listname:'未命名清单',
			listhref:'todolist.html',
			storelist:[]
		},
		 lists:store2.fetch()
	}},
	methods:{
		createList: function () {
			this.lists.push(this.newList);
			// 添加完newList后，重置newList
			this.newList={listname:'未命名清单',listhref:'todolist.html',storelist:[]};
			store2.save(this.lists);
		},
		deleteList: function (index) {
			this.lists.splice(index,1);
		},
		logout:function(){
			alert("注销成功");
			window.location.href='login.html';
		}
	},
	watch:{           //监控功能
		lists:{
	  	 	handler:function(lists){
		        store2.save(lists);
	   		},
  	    	deep:true          //深监控
		}
	}
	}
);