import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExercisesComponent } from './list-exercises.component';

describe('ListExercisesComponent', () => {
  let component: ListExercisesComponent;
  let fixture: ComponentFixture<ListExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExercisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
