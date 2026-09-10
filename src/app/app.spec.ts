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
    expect(compiled.textContent).toContain('Product concept - Group planning first');
    expect(compiled.textContent).toContain('Arat?');
    expect(compiled.textContent).toContain('supplier and rental offers are optional');
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
