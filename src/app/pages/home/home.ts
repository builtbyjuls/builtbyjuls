import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    const description =
      'Senior Java software engineer with nearly 10 years of experience building reliable systems for complex operations.';

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Julius Lapugot | Senior Java Software Engineer',
    });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://builtbyjuls.com/' });
    this.meta.updateTag({ property: 'og:image', content: 'https://builtbyjuls.com/og.png' });
    this.meta.updateTag({ property: 'og:image:width', content: '1672' });
    this.meta.updateTag({ property: 'og:image:height', content: '941' });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: 'Julius Lapugot, Senior Java Software Engineer',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Julius Lapugot | Senior Java Software Engineer',
    });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: 'https://builtbyjuls.com/og.png' });
    this.meta.updateTag({
      name: 'twitter:image:alt',
      content: 'Julius Lapugot, Senior Java Software Engineer',
    });
    this.setCanonicalUrl('https://builtbyjuls.com/');
  }

  private setCanonicalUrl(url: string): void {
    this.document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', url);
  }
}
