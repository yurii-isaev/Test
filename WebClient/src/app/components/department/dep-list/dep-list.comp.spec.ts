import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepListComp } from './dep-list.comp';

describe('DepListComp', () => {
  let component: DepListComp;
  let fixture: ComponentFixture<DepListComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepListComp]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepListComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create department list component', () => {
    expect(component).toBeTruthy();
  });
});
