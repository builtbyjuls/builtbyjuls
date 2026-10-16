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

  it('should render the routed home page with core headline, metrics, and experience', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Architecting high-throughput, resilient enterprise systems.',
    );
    expect(compiled.textContent).toContain('50-90%');
    expect(compiled.textContent).toContain('Query & Reporting Latency Cut');
    expect(compiled.textContent).toContain('High-Frequency Telemetry Ingestion');
    expect(compiled.textContent).toContain('Exist Software Labs, Inc.');
    expect(compiled.textContent).toContain('Senior Java Software Engineer');
  });

  it('should render both engineering showcases and interact with inspection tabs', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Spring AI Hibernate N+1 Test Gate');
    expect(compiled.textContent).toContain('Simplifeyn: Physical Code Explainer');

    // Test N+1 Tab switching: click Problem tab
    const problemBtn = Array.from(compiled.querySelectorAll<HTMLButtonElement>('.tab-btn')).find(
      (b) => b.textContent?.includes('Problem'),
    );
    expect(problemBtn).toBeTruthy();
    problemBtn?.click();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('shouldFetchParticipantSettlements');

    // Test Simplifeyn Rung switching: click Vibe Coder tab
    const vibeBtn = Array.from(compiled.querySelectorAll<HTMLButtonElement>('.tab-btn')).find((b) =>
      b.textContent?.includes('Vibe Coder'),
    );
    expect(vibeBtn).toBeTruthy();
    vibeBtn?.click();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('In Plain English');

    // Test Simplifeyn Rung switching: click Senior Dev tab
    const seniorBtn = Array.from(compiled.querySelectorAll<HTMLButtonElement>('.tab-btn')).find(
      (b) => b.textContent?.includes('Senior Dev'),
    );
    expect(seniorBtn).toBeTruthy();
    seniorBtn?.click();
    fixture.detectChanges();
    expect(compiled.textContent).toContain('Concurrency & Invariants');
  });

  it('should offer the condensed one-page resume from every resume link', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>(
      'a[href="/resume/jlapugot_resume.pdf"]',
    );
    expect(links.length).toBe(3);
    links.forEach((link) => {
      expect(link.download).toBe('jlapugot_resume.pdf');
    });
  });

  it('should render the left-side section navigation rail with numbered links', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const sideNavLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      '.side-nav-rail .side-nav-link',
    );
    expect(sideNavLinks.length).toBe(7);

    const expectedSections = [
      { num: '01', href: '#showcase' },
      { num: '02', href: '#about' },
      { num: '03', href: '#expertise' },
      { num: '04', href: '#impact' },
      { num: '05', href: '#experience' },
      { num: '06', href: '#education' },
      { num: '07', href: '#contact' },
    ];

    sideNavLinks.forEach((link, idx) => {
      expect(link.getAttribute('href')).toBe(expectedSections[idx].href);
      expect(link.querySelector('.nav-num')?.textContent?.trim()).toBe(expectedSections[idx].num);
    });
  });

  it('should restore complete home social metadata after route navigation', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const meta = TestBed.inject(Meta);

    await router.navigateByUrl('/projects/arat');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(meta.getTag("property='og:image'")).toBeNull();

    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(meta.getTag("property='og:image'")?.content).toBe('https://builtbyjuls.com/og.png');
    expect(meta.getTag("property='og:image:width'")?.content).toBe('1672');
    expect(meta.getTag("property='og:image:height'")?.content).toBe('941');
    expect(meta.getTag("property='og:title'")?.content).toBe(
      'Julius Cessar Lapugot | Senior Java Software Engineer',
    );
  });

  it('should present the Arat concept, story, and honest scope', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const meta = TestBed.inject(Meta);

    await router.navigateByUrl('/projects/arat');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    let content = compiled.textContent ?? '';
    expect(content).toContain('Concept stage - Not implemented');
    expect(content).toContain('Ten friends, one plan, and two withdrawals');
    expect(content).toContain('Useful before any supplier joins');
    expect(content).toContain('No supplier can discover the plan');
    expect(content).toContain('Open to offers');
    expect(content).toContain('staycation or other short-term rental');
    expect(content).toContain('property, building, platform, or local rules');
    expect(content).toContain('international holiday');
    expect(content).toContain('Agreement is not a reservation');
    expect(content).toContain('No users, reservations, revenue, partnerships');
    expect(content).toContain('AI-assisted product workflow');
    expect(content).toContain('I remain accountable for the final product decisions');
    expect(content).not.toContain('Q-ify');

    const adapt = compiled.querySelector<HTMLButtonElement>('[data-step="adapt"]');
    expect(adapt?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Show what changed and what it breaks');

    const plan = compiled.querySelector<HTMLButtonElement>('[data-step="plan"]');
    plan?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(plan?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Start with what the group can accept');
    expect(content).toContain('Individual budget limits stay private by default');

    const compare = compiled.querySelector<HTMLButtonElement>('[data-step="compare"]');
    compare?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(compare?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Compare plans, with or without suppliers');
    expect(content).toContain('Unresolved costs are marked as needing clarification');

    const agree = compiled.querySelector<HTMLButtonElement>('[data-step="agree"]');
    agree?.click();
    fixture.detectChanges();
    content = compiled.textContent ?? '';
    expect(agree?.getAttribute('aria-pressed')).toBe('true');
    expect(content).toContain('Approve one version of the plan');
    expect(content).toContain('Group approval does not mean that suppliers confirmed');

    expect(meta.getTag("name='description'")?.content).toContain('private group planning');
    expect(meta.getTag("property='og:title'")?.content).toBe(
      'Arat? Product Case Study | Julius Lapugot',
    );
  });

  it('should redirect retired project routes to Arat', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    expect(routes.find((route) => route.path === 'projects/q-ify')?.redirectTo).toBe(
      '/projects/arat',
    );
    expect(routes.find((route) => route.path === 'projects/ano-tara')?.redirectTo).toBe(
      '/projects/arat',
    );

    await router.navigateByUrl('/projects/q-ify');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/projects/arat');
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain(
      'Arat?',
    );
  });
});
