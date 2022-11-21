import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo-dois';
  public form: FormGroup;
  public listPublic = new Array();
  public descricao: string;
  public status: string;

  public optionStatus = ['Do', 'Doing'];
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createForm();
    const todo1: Todo = {
      descricao: 'todo1',
      status: this.optionStatus[0],
      id: this.contador,
    };
    this.contador++;
    this.listOfTodos.push(todo1);
    this.listPublic = this.listOfTodos;
  }

  private index: number;
  private done: number;
  private contador = 0;
  private listOfTodos = new Array(); // mantem o valor original

  public addTodo(): void {
    if (this.form.valid) {
      if (this.index) {
        this.listOfTodos[this.index] = this.form.value;
        this.index = null;
        this.listPublic = this.listOfTodos;
      } else {
        if (this.form.value.status == undefined)
          this.form.value.status = this.optionStatus[0];
        this.form.value.id = this.contador;
        this.contador++;
        this.listOfTodos.push(this.form.value);
        this.listPublic = this.listOfTodos;
      }
      this.form.reset();
    }
  }

  public remove(id: number) {
    const index = this.listOfTodos.findIndex((i) => i.id == id);
    this.listOfTodos.splice(index, 1);
    this.listPublic = this.listOfTodos;
    this.form.reset();
  }

  public edit(id: number) {
    const a = this.listOfTodos.find((i) => i.id == id);
    this.descricao = a.descricao;
    this.status = a.status;
    this.index = id;
  }

  public finalizado(id: number) {
    this.listOfTodos[id].status != 'Done'
      ? (this.listOfTodos[id].status = 'Done')
      : (this.listOfTodos[id].status = this.optionStatus[0]);

    this.done++;
  }

  public filter(status) {
    const box = this.listOfTodos.filter((i) => i.status == status);
    this.listPublic = box;
  }

  public todos() {
    this.listPublic = this.listOfTodos;
  }

  private createForm() {
    this.form = this.fb.group({
      descricao: this.fb.control('', [Validators.required]),
      status: this.fb.control(this.optionStatus[0]),
    });
  }

  get control() {
    return this.form.controls;
  }
}

export interface Todo {
  descricao: string;
  status: string;
  id: number;
}
