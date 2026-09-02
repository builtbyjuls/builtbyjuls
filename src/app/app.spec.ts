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
    expect(compiled.textContent).toContain('Synthetic implementation - Phase 3 complete');
    expect(compiled.textContent).toContain(
      'controlled queue-task progress through READY_FOR_HANDOFF',
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

  it('should present Q-ify implementation progress without claiming marketplace validation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const meta = TestBed.inject(Meta);

    await router.navigateByUrl('/projects/q-ify');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    let content = compiled.textContent ?? '';
    expect(content).toContain('Phase 3 complete - Not launched');
    expect(content).toContain('Queue-task workflow complete');
    expect(content).toContain('READY_FOR_HANDOFF');
    expect(content).toContain('View Q-ify on GitHub');
    expect(content).toContain('AI-assisted engineering workflow');
    expect(content).toContain('I remain accountable for the final design, code, tests');
    expect(content).toContain('private-sector pasuyo marketplace');
    expect(content).not.toContain('Phase 0 is in progress');

    const phase3 = compiled.querySelector<HTMLButtonElement>('[data-phase="phase3"]');
    expect(phase3?.getAttribute('aria-pressed')).toBe('true');

    const phase0 = compiled.querySelector<HTMLButtonElement>('[data-phase="phase0"]');
    phase0?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(phase0?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Foundation complete');
    expect(content).toContain('No venue, booking, runner, or task behavior existed yet');

    const phase1 = compiled.querySelector<HTMLButtonElement>('[data-phase="phase1"]');
    phase1?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(phase1?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Venue and booking workflow complete');
    expect(content).toContain('No authentication, runner assignment');

    const phase2 = compiled.querySelector<HTMLButtonElement>('[data-phase="phase2"]');
    phase2?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(phase2?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Runner dispatch workflow complete');

    const next = compiled.querySelector<HTMLButtonElement>('[data-phase="next"]');
    next?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(next?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Finish a real handoff lifecycle before expanding scope');
    expect(content).toContain('Planned direction, not completed implementation');
    expect(meta.getTag("name='description'")?.content).toContain(
      'private-sector pasuyo marketplace for permitted, transferable queues',
    );
    expect(meta.getTag("property='og:title'")?.content).toBe(
      'Q-ify Phase 3 Backend Case Study | Julius Lapugot',
    );
  });
});
