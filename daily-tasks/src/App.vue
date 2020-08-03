<template>
  <v-app>
    <v-app-bar app color="purple darken-3" dark>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/T-Guerrero"
        target="_blank"
        text>
        <span class="mr-2">Github Profile</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Modal />
      </v-container>
      <v-divider/>
      <v-container>
        <p class="overline">Tarefas existentes: {{tasksCount}}</p>
        <v-row>
          <v-col
            v-for="(task, index) in tasks"
            :key="index"
            cols="12" sm="4" md="3">
            <Tarefa :task="task" :id="index"/>
          </v-col>
        </v-row>
      </v-container>
      <Calendario />
    </v-main>
  </v-app>
</template>

<script>

import Modal from './components/modal';
import Tarefa from './components/task';
import Calendario from './components/calendar';
import store from './store/index';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  store,
  components: {
    Modal,
    Tarefa,
    Calendario
  },
  computed: {
    tasks(){
      return this.$store.state.tasks;
    },
    ...mapGetters([
      'tasksCount'
    ])
  }
};
</script>
