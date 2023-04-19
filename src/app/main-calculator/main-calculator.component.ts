import { HashLocationStrategy } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main-calculator',
  templateUrl: './main-calculator.component.html',
  styleUrls: ['./main-calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainCalculatorComponent {
  calcForm = this.fb.group({
    rate: [null, [Validators.required]],
    discount: [null, [Validators.required]],
    tax: [null, [Validators.required]],
    qty: [null, [Validators.required]],
    free: [null, [Validators.required]],
    return: [null, [Validators.required]],
  });
  value$ = new BehaviorSubject<Result>({
    amount: 0,
    return_qty: 0,
    return_free: 0,
  });
  constructor(private fb: FormBuilder) {}
  calculate() {
    if (this.calcForm.valid) {
      const vals = this.calcForm.value;
      const total = (vals.qty ?? 0) + (vals.free ?? 0) - (vals.return ?? 0);
      const r = 0.25;
      let NQF = 0;
      if ((vals.qty ?? 0) > 0 && (vals.free ?? 0) >= 0) {
        const SSP = (vals.free ?? 0) / ((vals.qty ?? 0) + (vals.free ?? 0));
        NQF = total * SSP;
      }
      let QF = this.roundDownTo0_25(NQF)
      let mul_result = 0,
        count = 1;
      while (mul_result < NQF) {
        mul_result = r * count;
        if (mul_result <= NQF) {
          count += 1;
        }
      }
      console.log(mul_result);
      console.log(count);
      QF = r * (count - 1);
      const Q = total - QF;
      const rtn_qty = (vals.qty ?? 0) - Q;
      this.value$.next({
        amount: Math.round(
          rtn_qty *
            (vals.rate ?? 0) *
            (1 + (vals.tax ?? 0) / 100) *
            (1 - (vals.discount ?? 0) / 100)
        ),
        return_qty: rtn_qty,
        return_free: (vals.free ?? 0) - QF,
      });
    }
  }
  clear() {
    this.calcForm.reset();
    this.value$.next({ amount: 0, return_qty: 0, return_free: 0 });
  }
  roundDownTo0_25(num: number): number {
    return Math.floor(num / 0.25) * 0.25;
  }
}

interface CalcForm {
  rate: number;
  discount: number;
  tax: number;
  qty: number;
  free: number;
  return: number;
}
interface Result {
  amount: number;
  return_qty: number;
  return_free: number;
}
