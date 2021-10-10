import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoNovoComponent } from './orcamento-novo.component';

describe('OrcamentoNovoComponent', () => {
  let component: OrcamentoNovoComponent;
  let fixture: ComponentFixture<OrcamentoNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcamentoNovoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
