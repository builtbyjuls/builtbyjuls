import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  protected readonly navSections = [
    { id: 'showcase', num: '01', label: 'Showcase' },
    { id: 'about', num: '02', label: 'About' },
    { id: 'expertise', num: '03', label: 'Expertise' },
    { id: 'impact', num: '04', label: 'Impact' },
    { id: 'experience', num: '05', label: 'Experience' },
    { id: 'education', num: '06', label: 'Education' },
    { id: 'contact', num: '07', label: 'Contact' },
  ];

  protected readonly activeSection = signal<string>('showcase');
  protected readonly currentShowcaseIndex = signal<number>(0);
  protected readonly totalShowcases = 3;
  protected readonly selectedNplusTab = signal<'problem' | 'explain' | 'fix'>('problem');
  protected readonly selectedStranglerTab = signal<'slicing' | 'shadow' | 'cutover'>('slicing');
  protected readonly selectedFeynmanRung = signal<'vibe' | 'junior' | 'senior'>('vibe');
  protected readonly copiedKey = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      this.initScrollSpy();
    });
  }

  ngOnInit(): void {
    const description =
      'Senior Java Software Engineer with 9+ years of experience delivering high-throughput enterprise systems, PostgreSQL query optimization, and distributed messaging.';

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Julius Cessar Lapugot | Senior Java Software Engineer',
    });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://builtbyjuls.com/' });
    this.meta.updateTag({ property: 'og:image', content: 'https://builtbyjuls.com/og.png' });
    this.meta.updateTag({ property: 'og:image:width', content: '1672' });
    this.meta.updateTag({ property: 'og:image:height', content: '941' });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: 'Julius Cessar Lapugot, Senior Java Software Engineer',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Julius Cessar Lapugot | Senior Java Software Engineer',
    });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://builtbyjuls.com/og.png' });
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: 'Julius Cessar Lapugot, Senior Java Software Engineer',
    });
    this.setCanonicalUrl('https://builtbyjuls.com/');
  }

  protected selectNplusTab(tab: 'problem' | 'explain' | 'fix'): void {
    this.selectedNplusTab.set(tab);
  }

  protected selectStranglerTab(tab: 'slicing' | 'shadow' | 'cutover'): void {
    this.selectedStranglerTab.set(tab);
  }

  protected selectFeynmanRung(rung: 'vibe' | 'junior' | 'senior'): void {
    this.selectedFeynmanRung.set(rung);
  }

  protected nextShowcase(): void {
    this.currentShowcaseIndex.update((i) => (i + 1) % this.totalShowcases);
  }

  protected prevShowcase(): void {
    this.currentShowcaseIndex.update((i) => (i - 1 + this.totalShowcases) % this.totalShowcases);
  }

  protected goToShowcase(index: number): void {
    this.currentShowcaseIndex.set(index);
  }

  protected copyCommand(text: string, key: string): void {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    }
    this.copiedKey.set(key);
    setTimeout(() => {
      if (this.copiedKey() === key) {
        this.copiedKey.set(null);
      }
    }, 2000);
  }

  protected scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (typeof window !== 'undefined' && window.history) {
        window.history.pushState(null, '', `#${id}`);
      }
      this.setActiveSection(id);
    }
  }

  private initScrollSpy(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const updateActive = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = this.document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= docHeight - 80) {
        this.setActiveSection('contact');
        return;
      }

      const focalPoint = windowHeight * 0.35;
      let currentSectionId = this.navSections[0].id;

      for (const section of this.navSections) {
        const el = this.document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalPoint) {
            currentSectionId = section.id;
          }
        }
      }

      this.setActiveSection(currentSectionId);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateActive();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });
  }

  private setActiveSection(id: string): void {
    if (this.activeSection() !== id) {
      this.activeSection.set(id);
      this.cdr.markForCheck();
    }
  }

  private setCanonicalUrl(url: string): void {
    this.document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', url);
  }
}
