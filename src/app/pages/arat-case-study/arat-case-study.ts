import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

type AratStep = 'plan' | 'compare' | 'agree' | 'adapt';

@Component({
  selector: 'app-arat-case-study',
  imports: [RouterLink],
  templateUrl: './arat-case-study.html',
  styleUrl: './arat-case-study.scss',
})
export class AratCaseStudy implements OnInit {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  selectedStep: AratStep = 'adapt';

  selectStep(step: AratStep): void {
    this.selectedStep = step;
  }

  ngOnInit(): void {
    const description =
      'Arat? is a concept-stage workspace for private group planning, versioned agreement, and change detection, with optional supplier and rental offers.';

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Arat? Product Case Study | Julius Lapugot',
    });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://builtbyjuls.com/projects/arat',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Arat? Product Case Study | Julius Lapugot',
    });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("property='og:image:width'");
    this.meta.removeTag("property='og:image:height'");
    this.meta.removeTag("property='og:image:alt'");
    this.meta.removeTag("name='twitter:image'");
    this.meta.removeTag("name='twitter:image:alt'");
    this.setCanonicalUrl('https://builtbyjuls.com/projects/arat');
  }

  private setCanonicalUrl(url: string): void {
    this.document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', url);
  }
}
