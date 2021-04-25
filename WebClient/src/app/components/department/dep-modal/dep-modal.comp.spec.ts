import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepModalComp } from './dep-modal.comp';

describe('DepModalComp', () => {
  let component: DepModalComp;
  let fixture: ComponentFixture<DepModalComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepModalComp]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepModalComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create department modal component', () => {
    expect(component).toBeTruthy();
  });
});
