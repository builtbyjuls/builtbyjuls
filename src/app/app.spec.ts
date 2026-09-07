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
    expect(compiled.textContent).toContain('Synthetic implementation - API slice complete');
    expect(compiled.textContent).toContain(
      'API-only v1 slice for service offerings and queue requests',
    );
  });

  it('should offer the condensed one-page resume from every resume link', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>(
      'a[href="/resume/Julius_Cessar_Lapugot_Resume_One_Page_Condensed.pdf"]',
    );
    expect(links.length).toBe(2);
    links.forEach((link) => {
      expect(link.download).toBe('Julius_Cessar_Lapugot_Resume_One_Page_Condensed.pdf');
    });
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

  it('should present Q-ify progress and claims for the current API slice', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const meta = TestBed.inject(Meta);

    await router.navigateByUrl('/projects/q-ify');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    let content = compiled.textContent ?? '';
    expect(content).toContain('API v1 slice complete - Not launched');
    expect(content).toContain('Queue request API slice complete');
    expect(content).toContain('There is no runner assignment');
    expect(content).toContain('View Q-ify on GitHub');
    expect(content).toContain('AI-assisted engineering workflow');
    expect(content).toContain('I keep final accountability for design, code, tests');
    expect(content).toContain('private-sector pasuyo marketplace');
    expect(content).not.toContain('Phase 6');

    const phase2 = compiled.querySelector<HTMLButtonElement>('[data-phase="phase2"]');
    expect(phase2?.getAttribute('aria-pressed')).toBe('true');

    const phase0 = compiled.querySelector<HTMLButtonElement>('[data-phase="phase0"]');
    phase0?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(phase0?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Foundation layer complete.');
    expect(content).toContain('Flyway migrations V1 through V5');

    const phase1 = compiled.querySelector<HTMLButtonElement>('[data-phase="phase1"]');
    phase1?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(phase1?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Catalog and identity API baseline complete');
    expect(content).toContain('/api/v1/demo/actors');
    expect(content).toContain('/api/v1/service-offerings');

    const phase2Button = compiled.querySelector<HTMLButtonElement>('[data-phase="phase2"]');
    phase2Button?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(phase2Button?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Queue request API slice complete.');
    expect(content).toContain('`/api/v1/queue-requests`');

    const next = compiled.querySelector<HTMLButtonElement>('[data-phase="next"]');
    next?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(next?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Next engineering milestone.');
    expect(content).toContain('No runner assignment');

    expect(meta.getTag("name='description'")?.content).toContain(
      'Java backend for a private-sector pasuyo marketplace',
    );
    expect(meta.getTag("property='og:title'")?.content).toBe(
      'Q-ify Backend Case Study | Julius Lapugot',
    );
  });
});
