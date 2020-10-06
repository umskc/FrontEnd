import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokengeneratorComponent } from './tokengenerator.component';

describe('TokengeneratorComponent', () => {
  let component: TokengeneratorComponent;
  let fixture: ComponentFixture<TokengeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokengeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokengeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
