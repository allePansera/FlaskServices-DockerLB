import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagraficaBaseComponent } from './anagrafica-base.component';

describe('AnagraficaBaseComponent', () => {
  let component: AnagraficaBaseComponent;
  let fixture: ComponentFixture<AnagraficaBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnagraficaBaseComponent]
    });
    fixture = TestBed.createComponent(AnagraficaBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
