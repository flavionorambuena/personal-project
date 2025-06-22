import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MealRegisterComponent } from './meal-register.component';

describe('MealRegisterComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MealRegisterComponent]
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MealRegisterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
