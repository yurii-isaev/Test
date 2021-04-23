import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepComp } from './dep.comp';

describe('DepComponent', () => {
  let component: DepComp;
  let fixture: ComponentFixture<DepComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepComp]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create department component', () => {
    expect(component).toBeTruthy();
  });
});
