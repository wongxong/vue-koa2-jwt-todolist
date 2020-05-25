<template>
  <div class="todoList-container">
    <h3 class="todoList-title">欢迎：{{ user_name }}! 你的待办事项是：</h3>
    <el-input 
      type="text" 
      v-model="nextTask" 
      placeholder="请输入待办事项"
      @keydown.enter.native="addTask"></el-input>
    <el-tabs v-model="activeName">
      <el-tab-pane label="待办事项" name="todo">
        <template v-if="tasks.todo.length">
          <ul class="task-lists">
            <li 
              class="task-item"
              v-for="(item, index) in tasks.todo"
              :key="index">
              <span>{{ index + 1 }}. {{ item.text }}</span>
              <div class="pull-right">
                <el-button type="primary" size="mini" @click="updateTask(item)">完成</el-button>
                <el-button type="primary" size="mini" @click="removeTask(item)">删除</el-button>
              </div>
            </li>
          </ul>
        </template>
        <template v-else>
          <p class="no-data">暂无待办事项</p>
        </template>
      </el-tab-pane>
      <el-tab-pane label="已完成事项" name="done">
        <template v-if="tasks.done.length">
          <ul class="task-lists">
            <li 
              class="task-item is-done"
              v-for="(item, index) in tasks.done"
              :key="index">
              <span>{{ index + 1 }}. {{ item.text }}</span>
              <div class="pull-right">
                <el-button type="primary" size="mini" @click="updateTask(item)">还原</el-button>
              </div>
            </li>
          </ul>
        </template>
        <template v-else>
          <p class="no-data">暂无已完成事项</p>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    queryTodoLists, 
    createTodoList, 
    updateTodoList, 
    removeTodoList 
  } from '../api/todo_list';

  export default {
    name: 'WxTodoList',
    computed: {
      tasks() {
        const res = {
          todo: [],
          done: []
        };
        this.lists.forEach(item => {
          if(item.status === 1) {
            res.done.push(item);
          } else {
            res.todo.push(item);
          }
        });
        return res;
      }
    },
    data() {
      return {
        user_name: '',
        nextTask: '',
        activeName: 'todo',
        lists: []
      }
    },
    methods: {
      addTask() {
        console.log(this.nextTask);
        if(!this.nextTask.trim()) return;
        createTodoList({
          user_id: 1,
          status: 0,
          text: this.nextTask.trim()
        }).then(res => {
          this.$message.success(res.message);
          this.lists.push(res.data);
          this.nextTask = '';
        });
      },
      updateTask(item) {
        updateTodoList(item.id, { 
          status: item.status === 0 ? 1 : 0
        }).then(res => {
          this.$message.success(res.message);
          item.status = res.data.status;
        }).catch(err => {
          this.$message.error(err.message);
        });
      },
      removeTask(item) {
        removeTodoList(item.id).then(res => {
          this.$message.success(res.message);
          this.lists = this.lists.filter(({ id }) => id !== item.id);
        });
      }
    },
    created() {
      queryTodoLists({ user_id: 1 }).then(res => {
        this.lists = res.data.rows || [];
      });
    }
  }
</script>

<style lang="scss">
  .todoList-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .todoList-title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
  }

  .task-lists {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .task-item {
    margin-bottom: 10px;
    
    > span {
      font-size: 20px;
      line-height: 28px;
    }

    &.is-done {
      > span {
        text-decoration: line-through;
        color: #ccc;
      }
    }
  }

  .pull-right {
    float: right;
  }

  .no-data {
    text-align: center;
    color: #aaa;
  }
</style>