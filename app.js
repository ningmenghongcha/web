//存取localStorage中的数据
var store={    //封装一个对象
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));  //将数据转换为json形式的字符串

    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key))||[];
        //获得的数据是json字符串，需要用json.parse解析一下,若没取到就返回空
    }
}
//过滤的时候分三种情况：all、finished、unfinished
var filter={
    all:function(list){
        return list;
    },
    finished:function(list){
        return list.filter(function(item){
            return item.isChecked;
        })
    },
    unfinished:function(list){
        return list.filter(function(item){
            return !item.isChecked;
        })
    }
}
var vm2=new Vue({
    el:"#uuu",
    data:{
        todo:"",
        edtorTodos:'' ,//记录正在编辑的数据
        beforeTitle:''  ,//记录一下正在编辑的数据的title
        visibility:"all",  //通过这个属性值的变化对数据进行筛选
		currentlist:{storelist:[],listname:''},
		lists:[],
		searchValue:''
    },
    watch:{           //监控功能
        /* list:function(){      //监控list这个属性，当值发生变化时就会执行后面的函数
             store.save("sjj",this.list);
         }//浅监控*/
        currentlist:{
           handler:function(a){
               store.save(a.listname,a.storelist);
           },
           deep:true          //深监控
        }
    },
    computed:{
        noCheckeLength:function(){
            return  this.currentlist.storelist.filter(function(item){
                return !item.isChecked
            }).length
        },
        filteredList:function(){//找到了过滤函数就返回过滤后的数据，如果没有则返回所有数据
            return filter[this.visibility] ? filter[this.visibility](this.currentlist.storelist) : this.currentlist.storelist;
        }
    },
    methods:{ //统一管理事件处理函数
        addTodo:function(){   /*//添加任务
            //向list中添加一项任务
            //事件处理函数中的this指向的是当前这个根实例*/
            this.currentlist.storelist.push({
                /*title:ev.target.value*/
                title:this.todo,   //替换上面的语句，减少dom操作
                isChecked:false
            });
            this.todo='';  //数据更新视图
        },
        deleteTodo:function(todo){  //删除任务
            var index=this.currentlist.storelist.indexOf(todo);
            this.currentlist.storelist.splice(index,1);
        },
        edtorTodo:function(todo){  //编辑任务
            console.log(todo);
            this.edtorTodos=todo;//用数据记录一下现在正在编辑的信息,
            // 编辑任务的时候，记录一项编辑这条任务的title，方便取消编辑的是好重新给之前的title
            this.beforeTitle=todo.title;
        },
        edtorTodoed:function(todo){  //编辑任务成功
            this.edtorTodos="";
        },
        cancelTodo:function(todo){ //取消编辑任务
            /*console.log(123);*/
            todo.title=this.beforeTitle;
            this.beforeTitle='';
            //让div显示出来，input框隐藏，可以选择将正在编辑的信息置为空
            this.edtorTodos='';

        },
		sort1:function(){//排序
				this.currentlist.storelist.sort((a,b) => a.title.localeCompare(b.title));
   		},
		slist:function(list){
			this.currentlist=list;
		}
	},
    directives:{ // 解决[Vue warn]: Failed to resolve directive的问题
        "focus":{
            update(el,binding){
                /* console.log(el);
                console.log(binding);*/
                if(binding.value){
                    el.focus();//当选中某个input时自动获得焦点
                }
            }
        }
    }
});
