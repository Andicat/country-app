import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CountryService } from 'src/app/services/country.service';

import { CountryEditComponent } from './country-edit.component';

describe('CountryEditComponent', () => {
  let component: CountryEditComponent;
  let fixture: ComponentFixture<CountryEditComponent>;
    
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: CountryService },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                name: 'Russia'
              })
            }
          }
        }
      ],
      declarations: [CountryEditComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
