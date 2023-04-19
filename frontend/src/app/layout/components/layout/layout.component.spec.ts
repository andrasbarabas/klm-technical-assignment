import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';

import { LayoutComponent } from './layout.component';
import { DebugElement } from '@angular/core';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, MatToolbarModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              firstChild: {
                data: {
                  title: 'Booking'
                }
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create LayoutComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set title', () => {
    expect(component.title).toBe('Booking');
  });

  it('should display the title in the toolbar', () => {
    const titleElement: DebugElement = fixture.debugElement.query(By.directive(MatToolbar));

    expect(titleElement.nativeElement.textContent).toBe('Booking');
  });
});
