import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

function urlImagenValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  const isValid = /\.(jpg|jpeg|png)$/i.test(value);
  return isValid ? null : { formatoInvalido: true };
}

@Component({
  selector: 'app-ingrediente-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingrediente-dialog.component.html',
  styleUrls: ['./ingrediente-dialog.component.css']
})
export class IngredienteDialogComponent implements OnChanges {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() data: any | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      unidad: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      sitioCompra: ['', Validators.required],
      imagen: ['', urlImagenValidator]
    });
  }

  ngOnChanges() {
    if (this.data) {
      this.form.patchValue(this.data);
    } else {
      this.form.reset({ valor: 0 });
    }
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.visibleChange.emit(false);
    }
  }

  onCancel() {
    this.cancel.emit();
    this.visibleChange.emit(false);
  }

  get f() {
    return this.form.controls;
  }
}
