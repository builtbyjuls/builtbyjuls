import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
  protected readonly selectedNplusTab = signal<'problem' | 'explain' | 'fix'>('fix');
  protected readonly selectedFeynmanRung = signal<'vibe' | 'junior' | 'senior'>('senior');
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

  protected selectFeynmanRung(rung: 'vibe' | 'junior' | 'senior'): void {
    this.selectedFeynmanRung.set(rung);
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
      this.activeSection.set(id);
    }
  }

  private initScrollSpy(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const sectionElements = this.navSections
      .map((s) => this.document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0,
      },
    );

    for (const el of sectionElements) {
      observer.observe(el);
    }

    this.destroyRef.onDestroy(() => {
      observer.disconnect();
    });
  }

  private setCanonicalUrl(url: string): void {
    this.document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', url);
  }
}
