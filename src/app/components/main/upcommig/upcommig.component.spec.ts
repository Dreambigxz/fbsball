import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcommigComponent } from './upcommig.component';

describe('UpcommigComponent', () => {
  let component: UpcommigComponent;
  let fixture: ComponentFixture<UpcommigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcommigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcommigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
