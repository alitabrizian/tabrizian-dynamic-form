import {Component, OnInit} from '@angular/core';
import {Form, FormGroup} from '@angular/forms';
import {FormlyFormOptions, FormlyFieldConfig} from '@ngx-formly/core';
import {FormlyJsonschema} from '@ngx-formly/core/json-schema';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  type: string;
  public years = [
    {value: '1', viewValue: '2008'},
    {value: '2', viewValue: '2009'},
    {value: '3', viewValue: '2010'},
    {value: '4', viewValue: '2011'},
    {value: '5', viewValue: '2012'},
    {value: '6', viewValue: '2013'},
    {value: '7', viewValue: '2014'},
    {value: '8', viewValue: '2015'},
    {value: '9', viewValue: '2016'},
    {value: '10', viewValue: '2017'},
    {value: '11', viewValue: '2018'},
    {value: '12', viewValue: '2019'},
    {value: '13', viewValue: '2020'},
    {value: '14', viewValue: '2021'},
  ];
  spinner = false;
  falsy: boolean;
  selectedYear: any;


  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
  }
  ngOnInit() {
    this.loadExample(this.years[0]);
  }

  loadExample(year) {
    this.selectedYear = year.value;
    this.http.get<any>(`assets/${year.value}.json`).pipe(
      tap(({schema, model}) => {
        setTimeout(() => {
          this.spinner = true;
        }, 2000);
        this.type = year.value;
        this.form = new FormGroup({});
        this.options = {};
        this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
        this.model = model;
      }),
    ).subscribe(() => {
      this.spinner = false;
      this.falsy = false;
    }, () => {
      this.spinner = true;
      this.falsy = true;
    });
  }

  submit() {
    this.openDialog(this.model);
  }

  openDialog(model) {
    this.dialog.open(DialogComponent, {
      data: {
        model
      }
    });
  }
}
