import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, map, Observable, of, startWith } from 'rxjs';
import { Exercise } from '../exercise.model';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ExerciseService } from '../../services/exercise/exercise.service';
import { SubjectService } from '../../services/subject/subject.service';

@Component({
  selector: 'app-form-exercise',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  templateUrl: './form-exercise.component.html',
  styleUrl: './form-exercise.component.css'
})
export class FormExerciseComponent {
  exerciseForm: FormGroup;
  @Input() subject?: BehaviorSubject<Exercise | undefined>;
  @Input() state?: "none" | "pending" | "done";
  @Input() extraError?: Observable<{ duplicate: boolean }>;
  exerciseValue?: Exercise;
  @Output() onSubmit = new EventEmitter<Exercise>();
  loading: boolean = false;
  exercises: Exercise[] = [];


  myControl = new FormControl<string | Exercise>('');
  options: Exercise[] = [];
  filteredOptions?: Observable<Exercise[]>;
  filteredValueOptions?: Observable<Exercise[]>;

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
  ) {
    this.exerciseForm = this.formBuilder.group({
      label: ['', Validators.required],
      matiere: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    console.log("data TO EDIT ", this.subject);
    this.subject?.subscribe((currentSubject: any) => {
      this.exerciseValue = currentSubject;
      this.exerciseForm = new FormGroup({
        label: new FormControl(this.exerciseValue?.label || '', [Validators.required]),
        matiere: new FormControl(this.exerciseValue?.matiere || '', [Validators.required]),
      });
    })
    this.subjectService.list().subscribe({
      next: (response => {
        if (response?.status == "200") {
          this.options = response?.data.docs
          this.filteredOptions = of(response?.data.docs)
        }
      })
    })
    console.log("this.myControl?.valueChanges ", this.myControl?.valueChanges);
    this.myControl.valueChanges.subscribe((newValue) => {
      console.log("new Value ", newValue);
      if (typeof newValue !== 'string') {
        this.exerciseForm.get('matiere')?.setValue((newValue as unknown as Exercise));
      }
      else if (!newValue) {
        this.exerciseForm.get('matiere')?.setValue(undefined);
        this.exerciseForm.setErrors({ required: true })
      }
      const name = typeof newValue !== 'string' ? (newValue as unknown as Exercise)?.label : newValue;
      // Exécutez votre logique ici lorsque la valeur change
      this.filteredOptions = of(this._filter(name as string) || this.options)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes as any)?.extraError) {
      this.extraError?.subscribe((error) => {
        this.exerciseForm.get('matiere')?.setErrors(error);
      })
    }
  }

  displayFn(exercice: Exercise): string {
    return exercice?.label || '';
  }

  private _filter(name: string): Exercise[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option?.label?.toLowerCase().includes(filterValue));
  }

  getLabelErrorMessage() {
    if (this.exerciseForm.get('label')?.touched && this.exerciseForm.get('label')?.hasError('required')) {
      return 'Vous devez entrer le libellé de l\'exercice';
    }
    return '';
  }

  getMatiereErrorMessage() {
    if (this.exerciseForm.get('matiere')?.hasError('required')) {
      return 'Vous devez choisir une matière';
    }
    else if (this.exerciseForm.get('matiere')?.hasError('duplicate')) {
      return 'Matière et libellé doivent être unique'
    }
    return '';
  }
  onSubmitForm() {
    const { label, matiere } = this.exerciseForm?.value;
    if (this.exerciseForm?.valid) {
      this.onSubmit.emit({
        label,
        matiere
      })
    }
    else {
      console.log("Form not valid");
    }

  }
}
