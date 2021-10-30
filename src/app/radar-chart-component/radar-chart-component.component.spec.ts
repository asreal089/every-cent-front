import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartComponentComponent } from './radar-chart-component.component';

describe('RadarChartComponentComponent', () => {
  let component: RadarChartComponentComponent;
  let fixture: ComponentFixture<RadarChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarChartComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
