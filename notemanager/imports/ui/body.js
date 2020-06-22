import { Template } from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import './body.html';

import {Tasks} from '../api/tasks';

import './task'

Template.body.onCreated(function bodyOnCreated(){
    this.state = new ReactiveDict();
})

Template.body.helpers({
  tasks(){
      return Tasks.find({}, {sort: {createdAt: -1}});
  }
})

Template.body.events({
    'submit .new-task'(event) {
        event.preventDefault();
        console.log(event.target.text.value);
        const target = event.target;
        const text = target.text.value;

        Tasks.insert({
            text,
            createdAt: new Date(),
        })
        target.text.value = '';
    }
})