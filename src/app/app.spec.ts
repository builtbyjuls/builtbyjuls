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

    const compiled = fixture.nativeElement as HTMLElement;
    let content = compiled.textContent ?? '';
    expect(content).toContain('Phase 1 complete - Not launched');
    expect(content).toContain('Venue and booking workflow complete');
    expect(content).toContain('No authentication, runner assignment');
    expect(content).toContain('View the implementation on GitHub');
    expect(content).toContain('AI-assisted engineering workflow');
    expect(content).not.toContain('Phase 0 is in progress');

    const phase0 = compiled.querySelector<HTMLButtonElement>('[data-phase="phase0"]');
    phase0?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(phase0?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Foundation complete');
    expect(content).toContain('No venue or booking behavior existed yet');

    const next = compiled.querySelector<HTMLButtonElement>('[data-phase="next"]');
    next?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(next?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Authenticated runner assignment');
    expect(content).toContain('Planned direction, not completed implementation');
    expect(meta.getTag("name='description'")?.content).toContain('Phase 1 implements venue policy');
    expect(meta.getTag("property='og:title'")?.content).toBe(
      'Q-ify Backend Case Study | Julius Lapugot',
    );
  });
});
