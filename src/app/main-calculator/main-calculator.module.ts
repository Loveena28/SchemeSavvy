import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCalculatorComponent } from './/main-calculator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, MatFormFieldModule,MatButtonModule,MatInputModule,ReactiveFormsModule],
  declarations: [MainCalculatorComponent],
  exports: [MainCalculatorComponent],
})
export class MainCalculatorModule {

}
