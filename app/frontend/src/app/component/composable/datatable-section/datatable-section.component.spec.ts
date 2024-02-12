import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableSectionComponent } from './datatable-section.component';

describe('DatatableSectionComponent', () => {
  let component: DatatableSectionComponent;
  let fixture: ComponentFixture<DatatableSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatatableSectionComponent]
    });
    fixture = TestBed.createComponent(DatatableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
