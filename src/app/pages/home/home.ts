import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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

  protected readonly selectedNplusTab = signal<'problem' | 'explain' | 'fix'>('fix');
  protected readonly selectedFeynmanRung = signal<'vibe' | 'junior' | 'senior'>('senior');
  protected readonly copiedKey = signal<string | null>(null);

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

  private setCanonicalUrl(url: string): void {
    this.document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', url);
  }
}
