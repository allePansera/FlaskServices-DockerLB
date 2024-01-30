import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagTestComponent } from './anag-test.component';

describe('AnagTestComponent', () => {
  let component: AnagTestComponent;
  let fixture: ComponentFixture<AnagTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnagTestComponent]
    });
    fixture = TestBed.createComponent(AnagTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
