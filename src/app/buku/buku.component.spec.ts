import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BukuComponent } from './buku.component';

describe('BukuComponent', () => {
  let component: BukuComponent;
  let fixture: ComponentFixture<BukuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BukuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BukuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
