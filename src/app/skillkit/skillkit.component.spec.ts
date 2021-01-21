import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillkitComponent } from './skillkit.component';

describe('SkillkitComponent', () => {
  let component: SkillkitComponent;
  let fixture: ComponentFixture<SkillkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillkitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
