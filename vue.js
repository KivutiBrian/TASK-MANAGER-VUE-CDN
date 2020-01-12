new Vue({
    el:"#app",
    data: {
        title: "TASKS",
        task: '',
        errorMessage: '',
        beforeEditCache: '',
        filter: 'all',
        display:false,
        tasks:[ 
            {id:1,title:"Cook ugali",complete:false,editing:false},
            {id:2,title:"Wash the dishes",complete:false,editing:false},
            
        ]
    },
    directives: {
        focus: {
          // directive definition
          inserted: function (el) {
            el.focus()
          }
        }
      },

    computed: {
        // return the  number of remaining tasks
        remaining(){
            return this.tasks.filter(todo => !todo.complete).length
        },
        anyRemaining(){
            return this.remaining != 0
        },
        filteredTasks(){
            if (this.filter == 'all'){
                return this.tasks
            }else if(this.filter == 'active'){
                return this.tasks.filter(todo => !todo.complete)
            }else if(this.filter == 'complete'){
                return this.tasks.filter(todo => todo.complete)
            }
        },
        showClearCompleteButton(){
            return this.tasks.filter(todo => todo.complete).length > 0
        }
    },
    
    methods: {
        // add a task
        addTask(){

            // check if the input is blank
            if (this.task.trim() == 0){
                // this.display = true
                this.errorMessage = 'Input cannot be blank'
                this.display = true
                // disable the message after 5seconds
                setTimeout(()=>{
                    this.display=false
                    this.errorMessage = ''
                },5000)
                return
            }

            // if not blank, add the item
            this.tasks.push({
                id: this.tasks.length + 1,
                title: this.task
            });
            this.task = '';
        },

        // remove a task
        removeTask(index){
            this.tasks.splice(index,1);
        },

        // edit a task
        editTask(task){
            // before you can edit a task, 
            this.beforeEditCache = task.title
            task.editing = true
        },

        // done editing
        doneEditing(task){
            // check if there is an empty string
            if (this.task.trim() == ''){
                task.editing = this.beforeEditCache
            }
            task.editing = false
        },

        // cancel editing
        cancelEdit(task){
            task.title = this.beforeEditCache
            task.editing = false
        },

        // check all the tasks
        checkAllTasks(){
            this.tasks.forEach(task=> task.complete = event.target.checked)
        },

        clearComplete(){
            this.tasks = this.tasks.filter(task => !task.complete)
        }
    },
})