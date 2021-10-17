import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoRegistroComponent } from './lancamento-registro.component';

describe('LancamentoRegistroComponent', () => {
  let component: LancamentoRegistroComponent;
  let fixture: ComponentFixture<LancamentoRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
