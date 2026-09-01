import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the routed home page', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('reliable Java systems');
  });

  it('should restore complete home social metadata after route navigation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const meta = TestBed.inject(Meta);

    await router.navigateByUrl('/projects/q-ify');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(meta.getTag("property='og:image'")).toBeNull();

    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(meta.getTag("property='og:image'")?.content).toBe('https://builtbyjuls.com/og.png');
    expect(meta.getTag("property='og:image:width'")?.content).toBe('1672');
    expect(meta.getTag("property='og:image:height'")?.content).toBe('941');
  });

  it('should present Q-ify implementation progress without claiming marketplace validation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const meta = TestBed.inject(Meta);

    await router.navigateByUrl('/projects/q-ify');
    fixture.detectChanges();
    await fixture.whenStable();

    const content = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(content).toContain('Foundation in progress - Not launched');
    expect(content).toContain('Phase 0 is in progress');
    expect(content).toContain('integration testing with Testcontainers');
    expect(content).toContain('remaining Phase 0 plan');
    expect(content).toContain('Venues and Bookings');
    expect(content).not.toContain('Product development should begin only after');
    expect(meta.getTag("name='description'")?.content).toContain('Phase 0 foundation work');
  });
});
